/**
 * IndexedDB Database Layer
 * Handles all local storage for tracks, artwork, playlists, and settings
 */

const DB_NAME = 'mpthree-music-player';
const DB_VERSION = 1;

// Store names
const STORES = {
  TRACKS: 'tracks',
  ARTWORK: 'artwork',
  PLAYLISTS: 'playlists',
  SETTINGS: 'settings',
};

let dbInstance = null;

/**
 * Initialize the database
 */
async function initDB() {
  if (dbInstance) return dbInstance;
  
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Tracks store - stores track metadata
      if (!db.objectStoreNames.contains(STORES.TRACKS)) {
        const tracksStore = db.createObjectStore(STORES.TRACKS, { keyPath: 'id' });
        tracksStore.createIndex('title', 'title', { unique: false });
        tracksStore.createIndex('artist', 'artist', { unique: false });
        tracksStore.createIndex('album', 'album', { unique: false });
        tracksStore.createIndex('addedAt', 'addedAt', { unique: false });
      }
      
      // Artwork store - stores album art blobs separately for efficiency
      if (!db.objectStoreNames.contains(STORES.ARTWORK)) {
        db.createObjectStore(STORES.ARTWORK, { keyPath: 'id' });
      }
      
      // Playlists store
      if (!db.objectStoreNames.contains(STORES.PLAYLISTS)) {
        const playlistsStore = db.createObjectStore(STORES.PLAYLISTS, { keyPath: 'id' });
        playlistsStore.createIndex('name', 'name', { unique: false });
        playlistsStore.createIndex('createdAt', 'createdAt', { unique: false });
      }
      
      // Settings store - stores key/value pairs
      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
      }
    };
  });
}

/**
 * Get a transaction for the specified stores
 */
async function getTransaction(storeNames, mode = 'readonly') {
  const db = await initDB();
  return db.transaction(storeNames, mode);
}

/**
 * Generic promisified store operation
 */
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ============================================
// TRACKS CRUD
// ============================================

/**
 * Track schema:
 * {
 *   id: string (UUID),
 *   title: string,
 *   artist: string,
 *   album: string,
 *   duration: number (seconds),
 *   audioBlob: Blob (MP3 data),
 *   artworkId: string | null (reference to artwork store),
 *   addedAt: number (timestamp),
 *   filename: string (original filename)
 * }
 */

async function addTrack(track) {
  const tx = await getTransaction([STORES.TRACKS], 'readwrite');
  const store = tx.objectStore(STORES.TRACKS);
  
  const trackData = {
    id: track.id || generateId(),
    title: track.title || 'Unknown Title',
    artist: track.artist || 'Unknown Artist',
    album: track.album || 'Unknown Album',
    duration: track.duration || 0,
    audioBlob: track.audioBlob,
    artworkId: track.artworkId || null,
    addedAt: track.addedAt || Date.now(),
    filename: track.filename || 'unknown.mp3',
  };
  
  await promisifyRequest(store.put(trackData));
  return trackData;
}

async function getTrack(id) {
  const tx = await getTransaction([STORES.TRACKS]);
  const store = tx.objectStore(STORES.TRACKS);
  return promisifyRequest(store.get(id));
}

async function getAllTracks() {
  const tx = await getTransaction([STORES.TRACKS]);
  const store = tx.objectStore(STORES.TRACKS);
  const tracks = await promisifyRequest(store.getAll());
  // Sort by addedAt descending (newest first)
  return tracks.sort((a, b) => b.addedAt - a.addedAt);
}

async function updateTrack(id, updates) {
  const tx = await getTransaction([STORES.TRACKS], 'readwrite');
  const store = tx.objectStore(STORES.TRACKS);
  
  const existing = await promisifyRequest(store.get(id));
  if (!existing) throw new Error(`Track ${id} not found`);
  
  const updated = { ...existing, ...updates };
  await promisifyRequest(store.put(updated));
  return updated;
}

async function deleteTrack(id) {
  // Get track first to find artwork reference
  const track = await getTrack(id);
  
  const tx = await getTransaction([STORES.TRACKS, STORES.ARTWORK, STORES.PLAYLISTS], 'readwrite');
  
  // Delete track
  const tracksStore = tx.objectStore(STORES.TRACKS);
  await promisifyRequest(tracksStore.delete(id));
  
  // Delete associated artwork if exists and not shared
  if (track && track.artworkId) {
    // Check if any other track uses this artwork
    const allTracks = await promisifyRequest(tracksStore.getAll());
    const artworkInUse = allTracks.some(t => t.id !== id && t.artworkId === track.artworkId);
    
    if (!artworkInUse) {
      const artworkStore = tx.objectStore(STORES.ARTWORK);
      await promisifyRequest(artworkStore.delete(track.artworkId));
    }
  }
  
  // Remove track from all playlists
  const playlistsStore = tx.objectStore(STORES.PLAYLISTS);
  const playlists = await promisifyRequest(playlistsStore.getAll());
  
  for (const playlist of playlists) {
    if (playlist.trackIds.includes(id)) {
      playlist.trackIds = playlist.trackIds.filter(tid => tid !== id);
      await promisifyRequest(playlistsStore.put(playlist));
    }
  }
  
  return true;
}

async function searchTracks(query) {
  const tracks = await getAllTracks();
  const lowerQuery = query.toLowerCase();
  
  return tracks.filter(track =>
    track.title.toLowerCase().includes(lowerQuery) ||
    track.artist.toLowerCase().includes(lowerQuery) ||
    track.album.toLowerCase().includes(lowerQuery)
  );
}

// ============================================
// ARTWORK CRUD
// ============================================

/**
 * Artwork schema:
 * {
 *   id: string (UUID),
 *   blob: Blob (image data),
 *   mimeType: string,
 *   width: number,
 *   height: number
 * }
 */

async function addArtwork(artwork) {
  const tx = await getTransaction([STORES.ARTWORK], 'readwrite');
  const store = tx.objectStore(STORES.ARTWORK);
  
  const artworkData = {
    id: artwork.id || generateId(),
    blob: artwork.blob,
    mimeType: artwork.mimeType || 'image/jpeg',
    width: artwork.width || 0,
    height: artwork.height || 0,
  };
  
  await promisifyRequest(store.put(artworkData));
  return artworkData;
}

async function getArtwork(id) {
  if (!id) return null;
  const tx = await getTransaction([STORES.ARTWORK]);
  const store = tx.objectStore(STORES.ARTWORK);
  return promisifyRequest(store.get(id));
}

async function deleteArtwork(id) {
  const tx = await getTransaction([STORES.ARTWORK], 'readwrite');
  const store = tx.objectStore(STORES.ARTWORK);
  return promisifyRequest(store.delete(id));
}

/**
 * Get artwork as object URL (for use in img src)
 */
async function getArtworkUrl(id) {
  const artwork = await getArtwork(id);
  if (!artwork || !artwork.blob) return null;
  return URL.createObjectURL(artwork.blob);
}

// ============================================
// PLAYLISTS CRUD
// ============================================

/**
 * Playlist schema:
 * {
 *   id: string (UUID),
 *   name: string,
 *   trackIds: string[] (ordered array of track IDs),
 *   createdAt: number (timestamp),
 *   updatedAt: number (timestamp)
 * }
 */

async function createPlaylist(name) {
  const tx = await getTransaction([STORES.PLAYLISTS], 'readwrite');
  const store = tx.objectStore(STORES.PLAYLISTS);
  
  const playlist = {
    id: generateId(),
    name: name || 'New Playlist',
    trackIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  await promisifyRequest(store.put(playlist));
  return playlist;
}

async function getPlaylist(id) {
  const tx = await getTransaction([STORES.PLAYLISTS]);
  const store = tx.objectStore(STORES.PLAYLISTS);
  return promisifyRequest(store.get(id));
}

async function getAllPlaylists() {
  const tx = await getTransaction([STORES.PLAYLISTS]);
  const store = tx.objectStore(STORES.PLAYLISTS);
  const playlists = await promisifyRequest(store.getAll());
  // Sort by createdAt descending
  return playlists.sort((a, b) => b.createdAt - a.createdAt);
}

async function updatePlaylist(id, updates) {
  const tx = await getTransaction([STORES.PLAYLISTS], 'readwrite');
  const store = tx.objectStore(STORES.PLAYLISTS);
  
  const existing = await promisifyRequest(store.get(id));
  if (!existing) throw new Error(`Playlist ${id} not found`);
  
  const updated = { ...existing, ...updates, updatedAt: Date.now() };
  await promisifyRequest(store.put(updated));
  return updated;
}

async function deletePlaylist(id) {
  const tx = await getTransaction([STORES.PLAYLISTS], 'readwrite');
  const store = tx.objectStore(STORES.PLAYLISTS);
  return promisifyRequest(store.delete(id));
}

async function addTrackToPlaylist(playlistId, trackId) {
  const playlist = await getPlaylist(playlistId);
  if (!playlist) throw new Error(`Playlist ${playlistId} not found`);
  
  // Don't add duplicates
  if (playlist.trackIds.includes(trackId)) return playlist;
  
  playlist.trackIds.push(trackId);
  return updatePlaylist(playlistId, { trackIds: playlist.trackIds });
}

async function removeTrackFromPlaylist(playlistId, trackId) {
  const playlist = await getPlaylist(playlistId);
  if (!playlist) throw new Error(`Playlist ${playlistId} not found`);
  
  playlist.trackIds = playlist.trackIds.filter(id => id !== trackId);
  return updatePlaylist(playlistId, { trackIds: playlist.trackIds });
}

async function reorderPlaylistTracks(playlistId, trackIds) {
  return updatePlaylist(playlistId, { trackIds });
}

/**
 * Get full track objects for a playlist
 */
async function getPlaylistTracks(playlistId) {
  const playlist = await getPlaylist(playlistId);
  if (!playlist) return [];
  
  const tracks = [];
  for (const trackId of playlist.trackIds) {
    const track = await getTrack(trackId);
    if (track) tracks.push(track);
  }
  return tracks;
}

// ============================================
// SETTINGS CRUD
// ============================================

/**
 * Settings schema:
 * {
 *   key: string,
 *   value: any
 * }
 */

async function getSetting(key, defaultValue = null) {
  const tx = await getTransaction([STORES.SETTINGS]);
  const store = tx.objectStore(STORES.SETTINGS);
  const result = await promisifyRequest(store.get(key));
  return result ? result.value : defaultValue;
}

async function setSetting(key, value) {
  const tx = await getTransaction([STORES.SETTINGS], 'readwrite');
  const store = tx.objectStore(STORES.SETTINGS);
  await promisifyRequest(store.put({ key, value }));
  return value;
}

async function deleteSetting(key) {
  const tx = await getTransaction([STORES.SETTINGS], 'readwrite');
  const store = tx.objectStore(STORES.SETTINGS);
  return promisifyRequest(store.delete(key));
}

// ============================================
// PLAYER STATE PERSISTENCE
// ============================================

/**
 * Player state for persistence across page loads:
 * {
 *   currentTrackId: string | null,
 *   queue: string[] (track IDs),
 *   queueIndex: number,
 *   currentTime: number,
 *   volume: number,
 *   shuffle: boolean,
 *   repeat: 'none' | 'all' | 'one'
 * }
 */

async function getPlayerState() {
  return getSetting('playerState', {
    currentTrackId: null,
    queue: [],
    queueIndex: 0,
    currentTime: 0,
    volume: 1,
    shuffle: false,
    repeat: 'none',
  });
}

async function savePlayerState(state) {
  return setSetting('playerState', state);
}

// ============================================
// UTILITIES
// ============================================

/**
 * Generate a UUID v4
 */
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get estimated storage usage
 */
async function getStorageEstimate() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return {
      usage: estimate.usage || 0,
      quota: estimate.quota || 0,
      usagePercent: estimate.quota ? ((estimate.usage / estimate.quota) * 100).toFixed(1) : 0,
    };
  }
  return { usage: 0, quota: 0, usagePercent: 0 };
}

/**
 * Clear all data
 */
async function clearAllData() {
  const db = await initDB();
  
  const tx = db.transaction([STORES.TRACKS, STORES.ARTWORK, STORES.PLAYLISTS, STORES.SETTINGS], 'readwrite');
  
  await Promise.all([
    promisifyRequest(tx.objectStore(STORES.TRACKS).clear()),
    promisifyRequest(tx.objectStore(STORES.ARTWORK).clear()),
    promisifyRequest(tx.objectStore(STORES.PLAYLISTS).clear()),
    promisifyRequest(tx.objectStore(STORES.SETTINGS).clear()),
  ]);
  
  return true;
}

// Export everything as a global DB object
window.DB = {
  init: initDB,
  
  // Tracks
  addTrack,
  getTrack,
  getAllTracks,
  updateTrack,
  deleteTrack,
  searchTracks,
  
  // Artwork
  addArtwork,
  getArtwork,
  deleteArtwork,
  getArtworkUrl,
  
  // Playlists
  createPlaylist,
  getPlaylist,
  getAllPlaylists,
  updatePlaylist,
  deletePlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  reorderPlaylistTracks,
  getPlaylistTracks,
  
  // Settings
  getSetting,
  setSetting,
  deleteSetting,
  
  // Player state
  getPlayerState,
  savePlayerState,
  
  // Utilities
  generateId,
  getStorageEstimate,
  clearAllData,
};

// Initialize DB on load
initDB().catch(err => console.error('Failed to initialize database:', err));
