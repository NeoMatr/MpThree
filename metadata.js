/**
 * Metadata Parser
 * Extracts ID3 tags and album art from MP3 files
 */

/**
 * Parse ID3 tags from an MP3 file
 * Supports ID3v1 and ID3v2.3/2.4
 */
async function parseMP3Metadata(file) {
  const buffer = await file.arrayBuffer();
  const dataView = new DataView(buffer);
  
  let metadata = {
    title: null,
    artist: null,
    album: null,
    year: null,
    track: null,
    genre: null,
    duration: 0,
    artwork: null, // { blob, mimeType }
  };
  
  // Try ID3v2 first (at beginning of file)
  if (hasID3v2(dataView)) {
    const id3v2Data = parseID3v2(dataView);
    metadata = { ...metadata, ...id3v2Data };
  }
  
  // Try ID3v1 as fallback (at end of file)
  if (!metadata.title && hasID3v1(dataView)) {
    const id3v1Data = parseID3v1(dataView);
    metadata = { ...metadata, ...id3v1Data };
  }
  
  // Get duration using audio element
  metadata.duration = await getAudioDuration(file);
  
  // Use filename as fallback title
  if (!metadata.title) {
    metadata.title = file.name.replace(/\.mp3$/i, '');
  }
  
  return metadata;
}

/**
 * Check if file has ID3v2 header
 */
function hasID3v2(dataView) {
  if (dataView.byteLength < 10) return false;
  
  // ID3v2 starts with "ID3"
  const id3 = String.fromCharCode(
    dataView.getUint8(0),
    dataView.getUint8(1),
    dataView.getUint8(2)
  );
  
  return id3 === 'ID3';
}

/**
 * Parse ID3v2 tags
 */
function parseID3v2(dataView) {
  const version = dataView.getUint8(3);
  const revision = dataView.getUint8(4);
  const flags = dataView.getUint8(5);
  
  // Size is stored as synchsafe integer (4 bytes, 7 bits each)
  const size = (
    (dataView.getUint8(6) & 0x7F) << 21 |
    (dataView.getUint8(7) & 0x7F) << 14 |
    (dataView.getUint8(8) & 0x7F) << 7 |
    (dataView.getUint8(9) & 0x7F)
  );
  
  const hasExtendedHeader = (flags & 0x40) !== 0;
  
  let offset = 10;
  
  // Skip extended header if present
  if (hasExtendedHeader && version >= 3) {
    const extSize = dataView.getUint32(offset);
    offset += 4 + extSize;
  }
  
  const result = {
    title: null,
    artist: null,
    album: null,
    year: null,
    track: null,
    genre: null,
    artwork: null,
  };
  
  // Parse frames
  while (offset < 10 + size && offset < dataView.byteLength - 10) {
    // Frame ID is 4 characters for v2.3/2.4, 3 for v2.2
    const frameIdLength = version >= 3 ? 4 : 3;
    
    // Check if we've hit padding
    if (dataView.getUint8(offset) === 0) break;
    
    let frameId = '';
    for (let i = 0; i < frameIdLength; i++) {
      frameId += String.fromCharCode(dataView.getUint8(offset + i));
    }
    
    let frameSize, frameFlags;
    
    if (version >= 3) {
      // v2.3 uses regular 32-bit size, v2.4 uses synchsafe
      if (version === 4) {
        frameSize = (
          (dataView.getUint8(offset + 4) & 0x7F) << 21 |
          (dataView.getUint8(offset + 5) & 0x7F) << 14 |
          (dataView.getUint8(offset + 6) & 0x7F) << 7 |
          (dataView.getUint8(offset + 7) & 0x7F)
        );
      } else {
        frameSize = dataView.getUint32(offset + 4);
      }
      frameFlags = dataView.getUint16(offset + 8);
      offset += 10;
    } else {
      // v2.2 uses 24-bit size
      frameSize = (
        dataView.getUint8(offset + 3) << 16 |
        dataView.getUint8(offset + 4) << 8 |
        dataView.getUint8(offset + 5)
      );
      offset += 6;
    }
    
    if (frameSize <= 0 || offset + frameSize > dataView.byteLength) break;
    
    // Extract frame content
    const frameData = new Uint8Array(dataView.buffer, offset, frameSize);
    
    // Map frame IDs (v2.3/2.4 vs v2.2)
    const frameIdMap = {
      'TIT2': 'title', 'TT2': 'title',
      'TPE1': 'artist', 'TP1': 'artist',
      'TALB': 'album', 'TAL': 'album',
      'TYER': 'year', 'TYE': 'year', 'TDRC': 'year',
      'TRCK': 'track', 'TRK': 'track',
      'TCON': 'genre', 'TCO': 'genre',
      'APIC': 'artwork', 'PIC': 'artwork',
    };
    
    const fieldName = frameIdMap[frameId];
    
    if (fieldName === 'artwork') {
      result.artwork = parseAPICFrame(frameData, version);
    } else if (fieldName) {
      result[fieldName] = parseTextFrame(frameData);
    }
    
    offset += frameSize;
  }
  
  return result;
}

/**
 * Parse text frame content
 */
function parseTextFrame(data) {
  if (data.length < 2) return null;
  
  const encoding = data[0];
  let text = '';
  
  // 0 = ISO-8859-1, 1 = UTF-16 with BOM, 2 = UTF-16BE, 3 = UTF-8
  if (encoding === 0) {
    // ISO-8859-1
    for (let i = 1; i < data.length && data[i] !== 0; i++) {
      text += String.fromCharCode(data[i]);
    }
  } else if (encoding === 1) {
    // UTF-16 with BOM
    const bom = (data[1] << 8) | data[2];
    const isLittleEndian = bom === 0xFFFE;
    let i = 3;
    
    while (i < data.length - 1) {
      const code = isLittleEndian
        ? (data[i + 1] << 8) | data[i]
        : (data[i] << 8) | data[i + 1];
      if (code === 0) break;
      text += String.fromCharCode(code);
      i += 2;
    }
  } else if (encoding === 2) {
    // UTF-16BE
    let i = 1;
    while (i < data.length - 1) {
      const code = (data[i] << 8) | data[i + 1];
      if (code === 0) break;
      text += String.fromCharCode(code);
      i += 2;
    }
  } else if (encoding === 3) {
    // UTF-8
    const decoder = new TextDecoder('utf-8');
    // Find null terminator
    let end = data.length;
    for (let i = 1; i < data.length; i++) {
      if (data[i] === 0) {
        end = i;
        break;
      }
    }
    text = decoder.decode(data.slice(1, end));
  }
  
  return text.trim() || null;
}

/**
 * Parse APIC (attached picture) frame
 */
function parseAPICFrame(data, version) {
  if (data.length < 10) return null;
  
  const encoding = data[0];
  let offset = 1;
  
  // Read MIME type
  let mimeType = '';
  if (version >= 3) {
    // Null-terminated string
    while (offset < data.length && data[offset] !== 0) {
      mimeType += String.fromCharCode(data[offset]);
      offset++;
    }
    offset++; // Skip null terminator
  } else {
    // v2.2: 3-character image format (JPG, PNG)
    const format = String.fromCharCode(data[1], data[2], data[3]);
    mimeType = format === 'PNG' ? 'image/png' : 'image/jpeg';
    offset = 4;
  }
  
  // Normalize MIME type
  if (mimeType === 'image/jpg') mimeType = 'image/jpeg';
  if (!mimeType.startsWith('image/')) mimeType = 'image/jpeg';
  
  // Skip picture type byte
  offset++;
  
  // Skip description (null-terminated, encoding-dependent)
  if (encoding === 0 || encoding === 3) {
    while (offset < data.length && data[offset] !== 0) offset++;
    offset++;
  } else {
    // UTF-16
    while (offset < data.length - 1) {
      if (data[offset] === 0 && data[offset + 1] === 0) {
        offset += 2;
        break;
      }
      offset += 2;
    }
  }
  
  // Remaining data is the image
  if (offset >= data.length) return null;
  
  const imageData = data.slice(offset);
  const blob = new Blob([imageData], { type: mimeType });
  
  return { blob, mimeType };
}

/**
 * Check if file has ID3v1 tag (at end of file)
 */
function hasID3v1(dataView) {
  if (dataView.byteLength < 128) return false;
  
  const offset = dataView.byteLength - 128;
  const tag = String.fromCharCode(
    dataView.getUint8(offset),
    dataView.getUint8(offset + 1),
    dataView.getUint8(offset + 2)
  );
  
  return tag === 'TAG';
}

/**
 * Parse ID3v1 tag
 */
function parseID3v1(dataView) {
  const offset = dataView.byteLength - 128;
  
  const readString = (start, length) => {
    let str = '';
    for (let i = 0; i < length; i++) {
      const char = dataView.getUint8(offset + start + i);
      if (char === 0) break;
      str += String.fromCharCode(char);
    }
    return str.trim() || null;
  };
  
  return {
    title: readString(3, 30),
    artist: readString(33, 30),
    album: readString(63, 30),
    year: readString(93, 4),
    track: null,
    genre: null,
    artwork: null,
  };
}

/**
 * Get audio duration using Audio element
 */
function getAudioDuration(file) {
  return new Promise((resolve) => {
    const audio = new Audio();
    const url = URL.createObjectURL(file);
    
    audio.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(url);
      resolve(audio.duration || 0);
    });
    
    audio.addEventListener('error', () => {
      URL.revokeObjectURL(url);
      resolve(0);
    });
    
    audio.src = url;
  });
}

/**
 * Import multiple MP3 files
 * Returns array of imported track objects
 */
async function importMP3Files(files, onProgress) {
  const results = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (!file.name.toLowerCase().endsWith('.mp3')) {
      continue;
    }
    
    try {
      // Parse metadata
      const metadata = await parseMP3Metadata(file);
      
      // Store artwork if present
      let artworkId = null;
      if (metadata.artwork) {
        const artwork = await DB.addArtwork({
          blob: metadata.artwork.blob,
          mimeType: metadata.artwork.mimeType,
        });
        artworkId = artwork.id;
      }
      
      // Store track with audio blob
      const track = await DB.addTrack({
        title: metadata.title,
        artist: metadata.artist,
        album: metadata.album,
        duration: metadata.duration,
        audioBlob: file,
        artworkId: artworkId,
        filename: file.name,
      });
      
      results.push(track);
      
      if (onProgress) {
        onProgress({
          current: i + 1,
          total: files.length,
          track: track,
        });
      }
    } catch (error) {
      console.error(`Failed to import ${file.name}:`, error);
    }
  }
  
  return results;
}

/**
 * Manually set artwork for a track
 */
async function setTrackArtwork(trackId, imageFile) {
  // Create artwork entry
  const artwork = await DB.addArtwork({
    blob: imageFile,
    mimeType: imageFile.type || 'image/jpeg',
  });
  
  // Update track
  return DB.updateTrack(trackId, { artworkId: artwork.id });
}

/**
 * Get track with artwork URL ready for display
 */
async function getTrackWithArtwork(trackId) {
  const track = await DB.getTrack(trackId);
  if (!track) return null;
  
  if (track.artworkId) {
    track.artworkUrl = await DB.getArtworkUrl(track.artworkId);
  }
  
  return track;
}

/**
 * Get all tracks with artwork URLs
 */
async function getAllTracksWithArtwork() {
  const tracks = await DB.getAllTracks();
  
  // Batch load artwork URLs
  for (const track of tracks) {
    if (track.artworkId) {
      track.artworkUrl = await DB.getArtworkUrl(track.artworkId);
    }
  }
  
  return tracks;
}

// Export as global
window.Metadata = {
  parseMP3Metadata,
  importMP3Files,
  setTrackArtwork,
  getTrackWithArtwork,
  getAllTracksWithArtwork,
};
