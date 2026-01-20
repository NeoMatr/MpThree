/**
 * MpThree Music Player - Single Page App
 */

// ============================================
// ICONS
// ============================================
const Icons = {
  logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10 8 16 12 10 16 10 8"/>
  </svg>`,
  library: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>`,
  nowPlaying: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>`,
  playlists: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="8" x2="21" y1="6" y2="6"/>
    <line x1="8" x2="21" y1="12" y2="12"/>
    <line x1="8" x2="21" y1="18" y2="18"/>
    <line x1="3" x2="3.01" y1="6" y2="6"/>
    <line x1="3" x2="3.01" y1="12" y2="12"/>
    <line x1="3" x2="3.01" y1="18" y2="18"/>
  </svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="4" x2="20" y1="12" y2="12"/>
    <line x1="4" x2="20" y1="6" y2="6"/>
    <line x1="4" x2="20" y1="18" y2="18"/>
  </svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>`,
  pause: `<svg viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/>
    <rect x="14" y="4" width="4" height="16"/>
  </svg>`,
  skipBack: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="19 20 9 12 19 4 19 20"/>
    <line x1="5" x2="5" y1="19" y2="5"/>
  </svg>`,
  skipForward: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="5 4 15 12 5 20 5 4"/>
    <line x1="19" x2="19" y1="5" y2="19"/>
  </svg>`,
  shuffle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/>
    <path d="m18 2 4 4-4 4"/>
    <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/>
    <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/>
    <path d="m18 14 4 4-4 4"/>
  </svg>`,
  repeat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m17 2 4 4-4 4"/>
    <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
    <path d="m7 22-4-4 4-4"/>
    <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
  </svg>`,
  repeatOne: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m17 2 4 4-4 4"/>
    <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
    <path d="m7 22-4-4 4-4"/>
    <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
    <text x="12" y="14" font-size="8" fill="currentColor" text-anchor="middle">1</text>
  </svg>`,
  volume: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  </svg>`,
  volumeMute: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="22" x2="16" y1="9" y2="15"/>
    <line x1="16" x2="22" y1="9" y2="15"/>
  </svg>`,
  music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" x2="12" y1="3" y2="15"/>
  </svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" x2="12" y1="5" y2="19"/>
    <line x1="5" x2="19" y1="12" y2="12"/>
  </svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" x2="6" y1="6" y2="18"/>
    <line x1="6" x2="18" y1="6" y2="18"/>
  </svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
  </svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
    <circle cx="9" cy="9" r="2"/>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
  </svg>`,
  queue: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="3" x2="15" y1="6" y2="6"/>
    <line x1="3" x2="21" y1="12" y2="12"/>
    <line x1="3" x2="21" y1="18" y2="18"/>
    <polygon points="18 3 22 6 18 9"/>
  </svg>`,
};

// ============================================
// UTILITIES
// ============================================
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function createModal(title, content, footer = '') {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close" aria-label="Close">${Icons.x}</button>
      </div>
      <div class="modal-body">${content}</div>
      ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('active'));
  
  const closeModal = () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 250);
  };
  
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  
  return { overlay, closeModal };
}

// ============================================
// APP STATE
// ============================================
let currentView = 'library';
let currentPlaylistId = null;
let artworkTargetTrackId = null;

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  // Set up nav icons
  document.getElementById('logoIcon').innerHTML = Icons.logo;
  document.getElementById('navLibraryIcon').innerHTML = Icons.library;
  document.getElementById('navNowPlayingIcon').innerHTML = Icons.nowPlaying;
  document.getElementById('navPlaylistsIcon').innerHTML = Icons.playlists;
  document.getElementById('menuIcon').innerHTML = Icons.menu;
  
  // Nav link clicks
  document.querySelectorAll('.nav-link[data-view]').forEach(link => {
    link.addEventListener('click', () => {
      switchView(link.dataset.view);
      document.getElementById('navLinks').classList.remove('open');
    });
  });
  
  // Logo click
  document.getElementById('logoLink').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('library');
  });
  
  // Mobile menu toggle
  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });
}

function switchView(view) {
  currentView = view;
  
  // Update nav links
  document.querySelectorAll('.nav-link[data-view]').forEach(link => {
    link.classList.toggle('active', link.dataset.view === view);
  });
  
  // Show/hide views
  document.querySelectorAll('.view').forEach(v => {
    v.style.display = 'none';
  });
  
  if (view === 'library') {
    document.getElementById('libraryView').style.display = 'block';
    renderLibrary();
  } else if (view === 'now-playing') {
    document.getElementById('nowPlayingView').style.display = 'block';
    updateNowPlayingUI(window.player.getState());
  } else if (view === 'playlists') {
    document.getElementById('playlistsView').style.display = 'block';
    showPlaylistsGrid();
  }
}

// ============================================
// LIBRARY
// ============================================
function initLibrary() {
  // Set up icons
  document.getElementById('libraryIcon').innerHTML = Icons.library;
  document.getElementById('uploadIcon').innerHTML = Icons.upload;
  document.getElementById('emptyMusicIcon').innerHTML = Icons.music;
  
  const fileInput = document.getElementById('fileInput');
  const artworkInput = document.getElementById('artworkInput');
  
  // Import button
  document.getElementById('importBtn').addEventListener('click', () => fileInput.click());
  
  // File input
  fileInput.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      showToast(`Importing ${files.length} file(s)...`, 'info');
      const tracks = await Metadata.importMP3Files(files);
      if (tracks.length > 0) {
        showToast(`Imported ${tracks.length} track(s)`, 'success');
        // Immediately re-render to show new tracks
        await renderLibrary(document.getElementById('searchInput').value);
      } else {
        showToast('No valid MP3 files found', 'warning');
      }
    }
    fileInput.value = '';
  });
  
  // Artwork input
  artworkInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file && artworkTargetTrackId) {
      const trackId = artworkTargetTrackId;
      artworkTargetTrackId = null;
      artworkInput.value = '';
      
      await Metadata.setTrackArtwork(trackId, file);
      showToast('Album art updated', 'success');
      
      // Update the track in the current queue if present
      const updatedTrack = await Metadata.getTrackWithArtwork(trackId);
      if (updatedTrack) {
        // Update in queue
        window.player.queue.forEach((t, i) => {
          if (t.id === trackId) {
            window.player.queue[i] = updatedTrack;
          }
        });
        window.player.originalQueue.forEach((t, i) => {
          if (t.id === trackId) {
            window.player.originalQueue[i] = updatedTrack;
          }
        });
        // Update current track if it's the one being played
        if (window.player.currentTrack && window.player.currentTrack.id === trackId) {
          window.player.currentTrack = updatedTrack;
        }
        window.player._emitStateChange();
      }
      
      // Re-render library immediately
      await renderLibrary(document.getElementById('searchInput').value);
    } else {
      artworkInput.value = '';
      artworkTargetTrackId = null;
    }
  });
  
  // Search
  let searchTimeout;
  document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => renderLibrary(e.target.value), 300);
  });
}

async function renderLibrary(searchQuery = '') {
  const trackList = document.getElementById('trackList');
  const emptyState = document.getElementById('libraryEmptyState');
  
  let tracks;
  if (searchQuery) {
    tracks = await DB.searchTracks(searchQuery);
  } else {
    tracks = await Metadata.getAllTracksWithArtwork();
  }
  
  if (tracks.length === 0 && !searchQuery) {
    emptyState.style.display = 'block';
    trackList.innerHTML = '';
    trackList.appendChild(emptyState);
    return;
  }
  
  emptyState.style.display = 'none';
  trackList.innerHTML = '';
  
  if (tracks.length === 0 && searchQuery) {
    trackList.innerHTML = `
      <div class="empty-state" style="padding: 48px 24px;">
        <p class="text-secondary">No tracks found for "${escapeHtml(searchQuery)}"</p>
      </div>
    `;
    return;
  }
  
  const container = document.createElement('div');
  container.className = 'track-list';
  
  tracks.forEach((track, index) => {
    container.appendChild(createTrackElement(track, index + 1, 'library'));
  });
  
  trackList.appendChild(container);
  updateLibraryPlayingState();
}

function createTrackElement(track, number, context = 'library') {
  const div = document.createElement('div');
  div.className = 'track-item';
  div.dataset.trackId = track.id;
  
  const isPlaylistContext = context === 'playlist';
  
  div.innerHTML = `
    <div class="track-number">${number}</div>
    <div class="track-art">
      ${track.artworkUrl 
        ? `<img src="${track.artworkUrl}" alt="Album art" loading="lazy">`
        : `<div class="track-art-placeholder">${Icons.music}</div>`
      }
    </div>
    <div class="track-info">
      <div class="track-title">${escapeHtml(track.title)}</div>
      <div class="track-artist">${escapeHtml(track.artist)}</div>
    </div>
    <div class="track-duration">${formatTime(track.duration)}</div>
    <div class="track-actions">
      ${isPlaylistContext ? `
        <button class="btn btn-ghost btn-icon sm" data-action="remove" title="Remove from playlist">${Icons.x}</button>
      ` : `
        <button class="btn btn-ghost btn-icon sm" data-action="edit" title="Edit info">${Icons.edit}</button>
        <button class="btn btn-ghost btn-icon sm" data-action="add-to-playlist" title="Add to playlist">${Icons.plus}</button>
        <button class="btn btn-ghost btn-icon sm" data-action="set-artwork" title="Set album art">${Icons.image}</button>
        <button class="btn btn-ghost btn-icon sm" data-action="play-next" title="Play next">${Icons.queue}</button>
        <button class="btn btn-ghost btn-icon sm" data-action="delete" title="Delete">${Icons.trash}</button>
      `}
    </div>
  `;
  
  // Click to play
  div.addEventListener('click', async (e) => {
    if (e.target.closest('.track-actions')) return;
    
    let tracks, trackIndex;
    if (isPlaylistContext && currentPlaylistId) {
      tracks = await DB.getPlaylistTracks(currentPlaylistId);
      for (const t of tracks) {
        if (t.artworkId) t.artworkUrl = await DB.getArtworkUrl(t.artworkId);
      }
      trackIndex = tracks.findIndex(t => t.id === track.id);
    } else {
      tracks = await Metadata.getAllTracksWithArtwork();
      trackIndex = tracks.findIndex(t => t.id === track.id);
    }
    
    if (trackIndex >= 0) {
      window.player.setQueue(tracks, trackIndex);
    }
  });
  
  // Action buttons
  if (isPlaylistContext) {
    div.querySelector('[data-action="remove"]')?.addEventListener('click', async (e) => {
      e.stopPropagation();
      
      // Instant visual feedback - fade out
      div.style.transition = 'opacity 0.2s, transform 0.2s';
      div.style.opacity = '0';
      div.style.transform = 'translateX(-20px)';
      
      await DB.removeTrackFromPlaylist(currentPlaylistId, track.id);
      showToast('Removed from playlist', 'success');
      
      // Update after animation
      setTimeout(async () => {
        await showPlaylistDetail(currentPlaylistId, true);
      }, 200);
    });
  } else {
    div.querySelector('[data-action="edit"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      showEditTrackModal(track);
    });
    
    div.querySelector('[data-action="add-to-playlist"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      showAddToPlaylistModal(track);
    });
    
    div.querySelector('[data-action="set-artwork"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      artworkTargetTrackId = track.id;
      document.getElementById('artworkInput').click();
    });
    
    div.querySelector('[data-action="play-next"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      window.player.addToQueueNext(track);
      showToast('Added to play next', 'success');
    });
    
    div.querySelector('[data-action="delete"]')?.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm(`Delete "${track.title}"?`)) {
        // Remove from UI immediately for instant feedback
        div.style.transition = 'opacity 0.2s, transform 0.2s';
        div.style.opacity = '0';
        div.style.transform = 'translateX(-20px)';
        
        // Remove from player queue if present
        const queueIndex = window.player.queue.findIndex(t => t.id === track.id);
        if (queueIndex !== -1) {
          window.player.removeFromQueue(queueIndex);
        }
        
        // Delete from database
        await DB.deleteTrack(track.id);
        showToast('Track deleted', 'success');
        
        // Re-render after animation
        setTimeout(async () => {
          await renderLibrary(document.getElementById('searchInput').value);
        }, 200);
      }
    });
  }
  
  return div;
}

function updateLibraryPlayingState() {
  const state = window.player.getState();
  document.querySelectorAll('#trackList .track-item').forEach(el => {
    el.classList.toggle('playing', state.track && el.dataset.trackId === state.track.id);
  });
}

async function showEditTrackModal(track) {
  const content = `
    <form id="editTrackForm">
      <div class="mb-4">
        <label for="trackTitle" class="text-secondary" style="display: block; margin-bottom: 8px;">Title</label>
        <input type="text" id="trackTitle" class="input" value="${escapeHtml(track.title)}" required>
      </div>
      <div class="mb-4">
        <label for="trackArtist" class="text-secondary" style="display: block; margin-bottom: 8px;">Artist</label>
        <input type="text" id="trackArtist" class="input" value="${escapeHtml(track.artist)}" placeholder="Unknown Artist">
      </div>
      <div class="mb-4">
        <label for="trackAlbum" class="text-secondary" style="display: block; margin-bottom: 8px;">Album</label>
        <input type="text" id="trackAlbum" class="input" value="${escapeHtml(track.album)}" placeholder="Unknown Album">
      </div>
    </form>
  `;
  const footer = `
    <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
    <button type="submit" form="editTrackForm" class="btn btn-accent">Save</button>
  `;
  
  const { overlay, closeModal } = createModal('Edit Track Info', content, footer);
  setTimeout(() => overlay.querySelector('#trackArtist').focus(), 100);
  
  overlay.querySelector('#cancelBtn').addEventListener('click', closeModal);
  overlay.querySelector('#editTrackForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = overlay.querySelector('#trackTitle').value.trim() || 'Unknown Title';
    const artist = overlay.querySelector('#trackArtist').value.trim() || 'Unknown Artist';
    const album = overlay.querySelector('#trackAlbum').value.trim() || 'Unknown Album';
    
    // Update in database
    await DB.updateTrack(track.id, { title, artist, album });
    showToast('Track info updated', 'success');
    closeModal();
    
    // Update in player queue if present
    const updatedTrack = await Metadata.getTrackWithArtwork(track.id);
    if (updatedTrack) {
      window.player.queue.forEach((t, i) => {
        if (t.id === track.id) {
          window.player.queue[i] = { ...window.player.queue[i], title, artist, album };
        }
      });
      window.player.originalQueue.forEach((t, i) => {
        if (t.id === track.id) {
          window.player.originalQueue[i] = { ...window.player.originalQueue[i], title, artist, album };
        }
      });
      if (window.player.currentTrack && window.player.currentTrack.id === track.id) {
        window.player.currentTrack = { ...window.player.currentTrack, title, artist, album };
      }
      window.player._emitStateChange();
    }
    
    // Re-render library
    await renderLibrary(document.getElementById('searchInput').value);
  });
}

async function showAddToPlaylistModal(track) {
  const playlists = await DB.getAllPlaylists();
  
  let content = '';
  if (playlists.length === 0) {
    content = `
      <div class="empty-state" style="padding: 24px;">
        <p class="text-secondary mb-4">No playlists yet</p>
        <button class="btn btn-secondary" id="createPlaylistFromModal">Create Playlist</button>
      </div>
    `;
  } else {
    content = `
      <div class="track-list">
        ${playlists.map(p => `
          <div class="track-item" data-playlist-id="${p.id}">
            <div class="track-art">
              <div class="track-art-placeholder">${Icons.playlists}</div>
            </div>
            <div class="track-info">
              <div class="track-title">${escapeHtml(p.name)}</div>
              <div class="track-artist">${p.trackIds.length} tracks</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top: 16px; text-align: center;">
        <button class="btn btn-primary" id="createPlaylistFromModal">${Icons.plus} New Playlist</button>
      </div>
    `;
  }
  
  const { overlay, closeModal } = createModal('Add to Playlist', content);
  
  overlay.querySelectorAll('[data-playlist-id]').forEach(el => {
    el.addEventListener('click', async () => {
      await DB.addTrackToPlaylist(el.dataset.playlistId, track.id);
      showToast('Added to playlist', 'success');
      closeModal();
    });
  });
  
  overlay.querySelector('#createPlaylistFromModal')?.addEventListener('click', async () => {
    closeModal();
    const name = prompt('Playlist name:');
    if (name) {
      const playlist = await DB.createPlaylist(name);
      await DB.addTrackToPlaylist(playlist.id, track.id);
      showToast(`Created "${name}" and added track`, 'success');
    }
  });
}

// ============================================
// NOW PLAYING
// ============================================
function initNowPlaying() {
  // Set up icons
  document.getElementById('emptyPlayIcon').innerHTML = Icons.nowPlaying;
  document.getElementById('artPlaceholder').innerHTML = Icons.music;
  document.getElementById('shuffleIcon').innerHTML = Icons.shuffle;
  document.getElementById('skipBackIcon').innerHTML = Icons.skipBack;
  document.getElementById('playPauseIcon').innerHTML = Icons.play;
  document.getElementById('skipForwardIcon').innerHTML = Icons.skipForward;
  document.getElementById('repeatIcon').innerHTML = Icons.repeat;
  document.getElementById('volumeIcon').innerHTML = Icons.volume;
  document.getElementById('queueIcon').innerHTML = Icons.queue;
  document.getElementById('closeQueueIcon').innerHTML = Icons.x;
  
  // Go to library button
  document.getElementById('goToLibraryBtn').addEventListener('click', () => switchView('library'));
  
  // Controls
  document.getElementById('playPauseBtn').addEventListener('click', () => window.player.togglePlay());
  document.getElementById('prevBtn').addEventListener('click', () => window.player.previous());
  document.getElementById('nextBtn').addEventListener('click', () => window.player.next());
  document.getElementById('shuffleBtn').addEventListener('click', () => window.player.toggleShuffle());
  document.getElementById('repeatBtn').addEventListener('click', () => window.player.cycleRepeat());
  
  // Progress bar
  const progressBar = document.getElementById('progressBar');
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    window.player.seekTo((e.clientX - rect.left) / rect.width);
  });
  
  // Volume
  document.getElementById('volumeBtn').addEventListener('click', () => window.player.toggleMute());
  const volumeSlider = document.getElementById('volumeSlider');
  volumeSlider.addEventListener('click', (e) => {
    const rect = volumeSlider.getBoundingClientRect();
    window.player.setVolume((e.clientX - rect.left) / rect.width);
  });
  
  // Queue toggle
  document.getElementById('queueBtn').addEventListener('click', () => {
    const panel = document.getElementById('queuePanel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    if (panel.style.display === 'block') renderQueue();
  });
  document.getElementById('closeQueueBtn').addEventListener('click', () => {
    document.getElementById('queuePanel').style.display = 'none';
  });
}

function updateNowPlayingUI(state) {
  const { track, isPlaying, currentTime, duration, volume, isMuted, shuffle, repeat, queue, queueIndex } = state;
  
  const emptyState = document.getElementById('npEmptyState');
  const content = document.getElementById('nowPlayingContent');
  
  if (!track) {
    emptyState.style.display = 'block';
    content.style.display = 'none';
    return;
  }
  
  emptyState.style.display = 'none';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.alignItems = 'center';
  
  // Track info
  document.getElementById('nowPlayingTitle').textContent = track.title || 'Unknown Title';
  document.getElementById('nowPlayingArtist').textContent = track.artist || 'Unknown Artist';
  
  // Artwork
  const artContainer = document.getElementById('nowPlayingArt');
  if (track.artworkUrl) {
    artContainer.innerHTML = `<img src="${track.artworkUrl}" alt="Album art">`;
  } else {
    artContainer.innerHTML = `<div class="now-playing-art-placeholder">${Icons.music}</div>`;
  }
  
  // Play/Pause
  document.getElementById('playPauseIcon').innerHTML = isPlaying ? Icons.pause : Icons.play;
  
  // Progress
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  document.getElementById('progressFill').style.width = `${progress}%`;
  document.getElementById('currentTime').textContent = formatTime(currentTime);
  document.getElementById('duration').textContent = formatTime(duration);
  
  // Shuffle
  document.getElementById('shuffleBtn').style.color = shuffle ? 'var(--accent)' : 'var(--text-secondary)';
  
  // Repeat
  if (repeat === 'one') {
    document.getElementById('repeatIcon').innerHTML = Icons.repeatOne;
    document.getElementById('repeatBtn').style.color = 'var(--accent)';
  } else {
    document.getElementById('repeatIcon').innerHTML = Icons.repeat;
    document.getElementById('repeatBtn').style.color = repeat === 'all' ? 'var(--accent)' : 'var(--text-secondary)';
  }
  
  // Volume
  const volumePercent = isMuted ? 0 : volume * 100;
  document.getElementById('volumeFill').style.width = `${volumePercent}%`;
  document.getElementById('volumeIcon').innerHTML = isMuted || volume === 0 ? Icons.volumeMute : Icons.volume;
  
  // Update queue if visible
  if (document.getElementById('queuePanel').style.display === 'block') {
    renderQueue();
  }
}

function renderQueue() {
  const state = window.player.getState();
  const { queue, queueIndex } = state;
  const queueList = document.getElementById('queueList');
  
  if (queue.length === 0) {
    queueList.innerHTML = `<div class="empty-state" style="padding: 24px;"><p class="text-secondary">Queue is empty</p></div>`;
    return;
  }
  
  queueList.innerHTML = queue.map((track, index) => `
    <div class="track-item ${index === queueIndex ? 'playing' : ''}" data-queue-index="${index}">
      <div class="track-number">
        ${index === queueIndex 
          ? `<div class="playing-indicator"><span></span><span></span><span></span><span></span></div>` 
          : index + 1
        }
      </div>
      <div class="track-art">
        ${track.artworkUrl 
          ? `<img src="${track.artworkUrl}" alt="" loading="lazy">`
          : `<div class="track-art-placeholder">${Icons.music}</div>`
        }
      </div>
      <div class="track-info">
        <div class="track-title">${escapeHtml(track.title)}</div>
        <div class="track-artist">${escapeHtml(track.artist)}</div>
      </div>
      <div class="track-duration">${formatTime(track.duration)}</div>
      <div class="track-actions">
        <button class="btn btn-ghost btn-icon sm" data-action="remove" title="Remove">${Icons.x}</button>
      </div>
    </div>
  `).join('');
  
  queueList.querySelectorAll('.track-item').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="remove"]')) {
        e.stopPropagation();
        window.player.removeFromQueue(parseInt(el.dataset.queueIndex));
        return;
      }
      window.player.playQueueIndex(parseInt(el.dataset.queueIndex));
    });
  });
}

// ============================================
// PLAYLISTS
// ============================================
function initPlaylists() {
  // Set up icons
  document.getElementById('playlistsIcon').innerHTML = Icons.playlists;
  document.getElementById('plusIcon').innerHTML = Icons.plus;
  document.getElementById('emptyPlaylistIcon').innerHTML = Icons.playlists;
  document.getElementById('playPlaylistIcon').innerHTML = Icons.play;
  document.getElementById('editPlaylistIcon').innerHTML = Icons.edit;
  document.getElementById('deletePlaylistIcon').innerHTML = Icons.trash;
  document.getElementById('playlistArtIcon').innerHTML = Icons.image;
  
  // Create playlist button
  document.getElementById('createPlaylistBtn').addEventListener('click', showCreatePlaylistModal);
  
  // Back button
  document.getElementById('backBtn').addEventListener('click', showPlaylistsGrid);
  
  // Playlist artwork upload
  const playlistArtInput = document.getElementById('playlistArtInput');
  document.getElementById('playlistDetailArt').addEventListener('click', () => {
    if (currentPlaylistId) playlistArtInput.click();
  });
  
  playlistArtInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file && currentPlaylistId) {
      // Show image immediately using local URL
      const localUrl = URL.createObjectURL(file);
      const artContainer = document.getElementById('playlistDetailArt');
      artContainer.innerHTML = `<img src="${localUrl}" alt="Playlist art">`;
      artContainer.classList.add('has-image');
      
      // Store artwork in background
      const artwork = await DB.addArtwork({
        blob: file,
        mimeType: file.type || 'image/jpeg',
      });
      // Update playlist
      await DB.updatePlaylist(currentPlaylistId, { artworkId: artwork.id });
      showToast('Playlist artwork updated', 'success');
      
      // Update with permanent URL and add hover effect
      const permanentUrl = await DB.getArtworkUrl(artwork.id);
      artContainer.innerHTML = `<img src="${permanentUrl}" alt="Playlist art"><div class="playlist-art-overlay"><span>${Icons.image}</span></div>`;
      artContainer.classList.add('has-image');
      
      // Revoke the temporary URL
      URL.revokeObjectURL(localUrl);
    }
    playlistArtInput.value = '';
  });
  
  // Add tracks search
  let addTracksSearchTimeout;
  document.getElementById('addTracksSearch').addEventListener('input', (e) => {
    clearTimeout(addTracksSearchTimeout);
    addTracksSearchTimeout = setTimeout(() => renderAddTracksList(e.target.value), 300);
  });
  
  // Play playlist
  document.getElementById('playPlaylistBtn').addEventListener('click', async () => {
    if (!currentPlaylistId) return;
    const tracks = await DB.getPlaylistTracks(currentPlaylistId);
    if (tracks.length === 0) {
      showToast('Playlist is empty', 'warning');
      return;
    }
    for (const t of tracks) {
      if (t.artworkId) t.artworkUrl = await DB.getArtworkUrl(t.artworkId);
    }
    window.player.setQueue(tracks, 0);
  });
  
  // Edit playlist
  document.getElementById('editPlaylistBtn').addEventListener('click', async () => {
    if (!currentPlaylistId) return;
    const playlist = await DB.getPlaylist(currentPlaylistId);
    if (playlist) showEditPlaylistModal(playlist);
  });
  
  // Delete playlist
  document.getElementById('deletePlaylistBtn').addEventListener('click', async () => {
    if (!currentPlaylistId) return;
    const playlist = await DB.getPlaylist(currentPlaylistId);
    if (playlist && confirm(`Delete "${playlist.name}"?`)) {
      await DB.deletePlaylist(currentPlaylistId);
      showToast('Playlist deleted', 'success');
      showPlaylistsGrid();
    }
  });
}

async function showPlaylistsGrid() {
  currentPlaylistId = null;
  
  document.getElementById('playlistsHeader').style.display = 'flex';
  document.getElementById('playlistsGrid').style.display = 'grid';
  document.getElementById('playlistDetail').style.display = 'none';
  document.getElementById('addTracksPanel').style.display = 'none';
  
  const playlists = await DB.getAllPlaylists();
  const grid = document.getElementById('playlistsGrid');
  const emptyState = document.getElementById('playlistsEmptyState');
  
  if (playlists.length === 0) {
    grid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  
  emptyState.style.display = 'none';
  grid.style.display = 'grid';
  grid.innerHTML = '';
  
  for (const playlist of playlists) {
    const card = await createPlaylistCard(playlist);
    grid.appendChild(card);
  }
}

async function createPlaylistCard(playlist) {
  const div = document.createElement('div');
  div.className = 'playlist-card';
  
  let artworkHtml;
  
  // Check for custom playlist artwork first
  if (playlist.artworkId) {
    const customArtUrl = await DB.getArtworkUrl(playlist.artworkId);
    if (customArtUrl) {
      artworkHtml = `<img src="${customArtUrl}" alt="" style="grid-column: 1 / -1; grid-row: 1 / -1;">`;
    }
  }
  
  // Fall back to track artwork mosaic
  if (!artworkHtml) {
    const tracks = await DB.getPlaylistTracks(playlist.id);
    const artworkUrls = [];
    
    for (let i = 0; i < Math.min(4, tracks.length); i++) {
      if (tracks[i].artworkId) {
        const url = await DB.getArtworkUrl(tracks[i].artworkId);
        if (url) artworkUrls.push(url);
      }
    }
    
    if (artworkUrls.length >= 4) {
      artworkHtml = artworkUrls.slice(0, 4).map(url => `<img src="${url}" alt="">`).join('');
    } else if (artworkUrls.length > 0) {
      artworkHtml = `<img src="${artworkUrls[0]}" alt="" style="grid-column: 1 / -1; grid-row: 1 / -1;">`;
    } else {
      artworkHtml = `<div class="playlist-card-art-placeholder">${Icons.playlists}</div>`;
    }
  }
  
  div.innerHTML = `
    <div class="playlist-card-art">${artworkHtml}</div>
    <div class="playlist-card-info">
      <div class="playlist-card-title">${escapeHtml(playlist.name)}</div>
      <div class="playlist-card-count">${playlist.trackIds.length} tracks</div>
    </div>
  `;
  
  div.addEventListener('click', () => showPlaylistDetail(playlist.id));
  return div;
}

async function showPlaylistDetail(playlistId, keepAddPanel = false) {
  currentPlaylistId = playlistId;
  
  document.getElementById('playlistsHeader').style.display = 'none';
  document.getElementById('playlistsGrid').style.display = 'none';
  document.getElementById('playlistsEmptyState').style.display = 'none';
  document.getElementById('playlistDetail').style.display = 'block';
  
  const playlist = await DB.getPlaylist(playlistId);
  if (!playlist) {
    showPlaylistsGrid();
    return;
  }
  
  document.getElementById('playlistDetailTitle').textContent = playlist.name;
  document.getElementById('playlistDetailCount').textContent = `${playlist.trackIds.length} tracks`;
  
  // Playlist artwork
  const artContainer = document.getElementById('playlistDetailArt');
  if (playlist.artworkId) {
    const artworkUrl = await DB.getArtworkUrl(playlist.artworkId);
    if (artworkUrl) {
      artContainer.innerHTML = `<img src="${artworkUrl}" alt="Playlist art"><div class="playlist-art-overlay"><span>${Icons.image}</span></div>`;
      artContainer.classList.add('has-image');
    }
  } else {
    artContainer.innerHTML = `<div class="playlist-art-placeholder">
      <span>${Icons.image}</span>
      <span class="playlist-art-hint">Add art</span>
    </div>`;
    artContainer.classList.remove('has-image');
  }
  
  const tracks = await DB.getPlaylistTracks(playlistId);
  for (const t of tracks) {
    if (t.artworkId) t.artworkUrl = await DB.getArtworkUrl(t.artworkId);
  }
  
  const trackList = document.getElementById('playlistTracks');
  const emptyState = document.getElementById('playlistTracksEmptyState');
  
  if (tracks.length === 0) {
    trackList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    trackList.innerHTML = '';
    
    tracks.forEach((track, index) => {
      trackList.appendChild(createTrackElement(track, index + 1, 'playlist'));
    });
  }
  
  updatePlaylistPlayingState();
  
  // Always render and show add tracks panel
  document.getElementById('addTracksPanel').style.display = 'block';
  if (!keepAddPanel) {
    document.getElementById('addTracksSearch').value = '';
  }
  await renderAddTracksList(document.getElementById('addTracksSearch').value);
}

function updatePlaylistPlayingState() {
  const state = window.player.getState();
  document.querySelectorAll('#playlistTracks .track-item').forEach(el => {
    el.classList.toggle('playing', state.track && el.dataset.trackId === state.track.id);
  });
}

function showCreatePlaylistModal() {
  const content = `
    <form id="playlistForm">
      <div class="mb-4">
        <label for="playlistName" class="text-secondary" style="display: block; margin-bottom: 8px;">Name</label>
        <input type="text" id="playlistName" class="input" placeholder="My Playlist" required>
      </div>
    </form>
  `;
  const footer = `
    <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
    <button type="submit" form="playlistForm" class="btn btn-accent">Create</button>
  `;
  
  const { overlay, closeModal } = createModal('New Playlist', content, footer);
  setTimeout(() => overlay.querySelector('#playlistName').focus(), 100);
  
  overlay.querySelector('#cancelBtn').addEventListener('click', closeModal);
  overlay.querySelector('#playlistForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = overlay.querySelector('#playlistName').value.trim();
    if (name) {
      const playlist = await DB.createPlaylist(name);
      showToast(`Created "${name}"`, 'success');
      closeModal();
      // Go directly to playlist detail (add tracks panel is always visible now)
      await showPlaylistDetail(playlist.id);
    }
  });
}

function showEditPlaylistModal(playlist) {
  const content = `
    <form id="playlistForm">
      <div class="mb-4">
        <label for="playlistName" class="text-secondary" style="display: block; margin-bottom: 8px;">Name</label>
        <input type="text" id="playlistName" class="input" value="${escapeHtml(playlist.name)}" required>
      </div>
    </form>
  `;
  const footer = `
    <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
    <button type="submit" form="playlistForm" class="btn btn-accent">Save</button>
  `;
  
  const { overlay, closeModal } = createModal('Edit Playlist', content, footer);
  setTimeout(() => {
    const input = overlay.querySelector('#playlistName');
    input.focus();
    input.select();
  }, 100);
  
  overlay.querySelector('#cancelBtn').addEventListener('click', closeModal);
  overlay.querySelector('#playlistForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = overlay.querySelector('#playlistName').value.trim();
    if (name) {
      await DB.updatePlaylist(playlist.id, { name });
      showToast('Playlist updated', 'success');
      closeModal();
      document.getElementById('playlistDetailTitle').textContent = name;
    }
  });
}

async function renderAddTracksList(searchQuery = '') {
  const addTracksList = document.getElementById('addTracksList');
  
  let tracks;
  if (searchQuery) {
    tracks = await DB.searchTracks(searchQuery);
  } else {
    tracks = await Metadata.getAllTracksWithArtwork();
  }
  
  // Get current playlist tracks to show which are already added
  const playlist = await DB.getPlaylist(currentPlaylistId);
  const playlistTrackIds = new Set(playlist?.trackIds || []);
  
  if (tracks.length === 0) {
    addTracksList.innerHTML = `
      <div class="empty-state" style="padding: 24px;">
        <p class="text-secondary">${searchQuery ? `No tracks found for "${escapeHtml(searchQuery)}"` : 'No tracks in library. Import some music first!'}</p>
      </div>
    `;
    return;
  }
  
  addTracksList.innerHTML = tracks.map(track => {
    const isAdded = playlistTrackIds.has(track.id);
    return `
      <div class="track-item ${isAdded ? 'added' : ''}" data-track-id="${track.id}">
        <div class="track-art">
          ${track.artworkUrl 
            ? `<img src="${track.artworkUrl}" alt="" loading="lazy">`
            : `<div class="track-art-placeholder">${Icons.music}</div>`
          }
        </div>
        <div class="track-info">
          <div class="track-title">${escapeHtml(track.title)}</div>
          <div class="track-artist">${escapeHtml(track.artist)}</div>
        </div>
        <div class="track-duration">${formatTime(track.duration)}</div>
        <button class="btn ${isAdded ? 'btn-secondary' : 'btn-accent'} btn-icon sm" data-action="${isAdded ? 'remove' : 'add'}" title="${isAdded ? 'Remove' : 'Add'}">
          ${isAdded ? Icons.x : Icons.plus}
        </button>
      </div>
    `;
  }).join('');
  
  // Add click handlers
  addTracksList.querySelectorAll('.track-item').forEach(el => {
    const btn = el.querySelector('button');
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const trackId = el.dataset.trackId;
      const action = btn.dataset.action;
      
      // Instant visual feedback
      btn.disabled = true;
      
      if (action === 'add') {
        // Instantly update button appearance
        el.classList.add('added');
        btn.className = 'btn btn-secondary btn-icon sm';
        btn.innerHTML = Icons.x;
        btn.dataset.action = 'remove';
        btn.title = 'Remove';
        
        await DB.addTrackToPlaylist(currentPlaylistId, trackId);
        showToast('Track added', 'success');
      } else {
        // Instantly update button appearance
        el.classList.remove('added');
        btn.className = 'btn btn-accent btn-icon sm';
        btn.innerHTML = Icons.plus;
        btn.dataset.action = 'add';
        btn.title = 'Add';
        
        await DB.removeTrackFromPlaylist(currentPlaylistId, trackId);
        showToast('Track removed', 'success');
      }
      
      btn.disabled = false;
      
      // Update playlist track count and list
      const playlist = await DB.getPlaylist(currentPlaylistId);
      document.getElementById('playlistDetailCount').textContent = `${playlist.trackIds.length} tracks`;
      
      // Refresh playlist tracks list
      const tracks = await DB.getPlaylistTracks(currentPlaylistId);
      for (const t of tracks) {
        if (t.artworkId) t.artworkUrl = await DB.getArtworkUrl(t.artworkId);
      }
      
      const trackList = document.getElementById('playlistTracks');
      const emptyState = document.getElementById('playlistTracksEmptyState');
      
      if (tracks.length === 0) {
        trackList.innerHTML = '';
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
        trackList.innerHTML = '';
        tracks.forEach((track, index) => {
          trackList.appendChild(createTrackElement(track, index + 1, 'playlist'));
        });
      }
      
      updatePlaylistPlayingState();
    });
  });
}

// ============================================
// PLAYER BAR
// ============================================
function initPlayerBar() {
  // Set up icons
  document.getElementById('playerBarArtPlaceholder').innerHTML = Icons.music;
  document.getElementById('playerBarPrevIcon').innerHTML = Icons.skipBack;
  document.getElementById('playerBarPlayPauseIcon').innerHTML = Icons.play;
  document.getElementById('playerBarNextIcon').innerHTML = Icons.skipForward;
  document.getElementById('playerBarVolumeIcon').innerHTML = Icons.volume;
  
  // Controls
  document.getElementById('playerBarPrev').addEventListener('click', () => window.player.previous());
  document.getElementById('playerBarPlayPause').addEventListener('click', () => window.player.togglePlay());
  document.getElementById('playerBarNext').addEventListener('click', () => window.player.next());
  
  // Progress bar
  const progressBar = document.getElementById('playerBarProgress');
  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    window.player.seekTo((e.clientX - rect.left) / rect.width);
  });
  
  // Volume
  document.getElementById('playerBarVolumeBtn').addEventListener('click', () => window.player.toggleMute());
  const volumeSlider = document.getElementById('playerBarVolumeSlider');
  volumeSlider.addEventListener('click', (e) => {
    const rect = volumeSlider.getBoundingClientRect();
    window.player.setVolume((e.clientX - rect.left) / rect.width);
  });
  
  // Click player bar to go to now playing
  document.getElementById('playerBarArt').addEventListener('click', () => switchView('now-playing'));
  document.querySelector('.player-bar-info').addEventListener('click', () => switchView('now-playing'));
}

function updatePlayerBar(state) {
  const playerBar = document.getElementById('playerBar');
  const { track, isPlaying, currentTime, duration, volume, isMuted } = state;
  
  if (!track) {
    playerBar.classList.add('hidden');
    return;
  }
  
  playerBar.classList.remove('hidden');
  
  document.getElementById('playerBarTitle').textContent = track.title || 'Unknown Title';
  document.getElementById('playerBarArtist').textContent = track.artist || 'Unknown Artist';
  
  const artContainer = document.getElementById('playerBarArt');
  if (track.artworkUrl) {
    artContainer.innerHTML = `<img src="${track.artworkUrl}" alt="Album art">`;
  } else {
    artContainer.innerHTML = `<div class="now-playing-art-placeholder">${Icons.music}</div>`;
  }
  
  document.getElementById('playerBarPlayPauseIcon').innerHTML = isPlaying ? Icons.pause : Icons.play;
  document.getElementById('playerBarCurrentTime').textContent = formatTime(currentTime);
  document.getElementById('playerBarDuration').textContent = formatTime(duration);
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  document.getElementById('playerBarProgressFill').style.width = `${progress}%`;
  
  const volumePercent = isMuted ? 0 : volume * 100;
  document.getElementById('playerBarVolumeFill').style.width = `${volumePercent}%`;
  document.getElementById('playerBarVolumeIcon').innerHTML = isMuted || volume === 0 ? Icons.volumeMute : Icons.volume;
}

// ============================================
// PLAYER STATE LISTENER
// ============================================
function onPlayerStateChange(state) {
  updatePlayerBar(state);
  
  if (currentView === 'now-playing') {
    updateNowPlayingUI(state);
  } else if (currentView === 'library') {
    updateLibraryPlayingState();
  } else if (currentView === 'playlists' && currentPlaylistId) {
    updatePlaylistPlayingState();
  }
}

// ============================================
// SERVICE WORKER
// ============================================
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: './' })
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('Service Worker registration failed:', err));
  }
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  initLibrary();
  initNowPlaying();
  initPlaylists();
  initPlayerBar();
  
  // Listen for player state changes
  window.addEventListener('playerStateChange', (e) => onPlayerStateChange(e.detail));
  
  // Initial render
  await renderLibrary();
  
  // Update UI with current player state
  setTimeout(() => {
    const state = window.player.getState();
    onPlayerStateChange(state);
  }, 100);
  
  registerServiceWorker();
});

