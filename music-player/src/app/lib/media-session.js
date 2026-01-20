/**
 * MediaSession API Integration
 * Provides lock screen controls and metadata display on supported platforms
 */

class MediaSessionManager {
  constructor() {
    this.isSupported = 'mediaSession' in navigator;
    
    if (!this.isSupported) {
      console.log('MediaSession API not supported');
      return;
    }
    
    this._setupActionHandlers();
  }
  
  /**
   * Set up action handlers for media controls
   */
  _setupActionHandlers() {
    if (!this.isSupported) return;
    
    const actions = {
      play: () => {
        if (window.player) window.player.play();
      },
      pause: () => {
        if (window.player) window.player.pause();
      },
      previoustrack: () => {
        if (window.player) window.player.previous();
      },
      nexttrack: () => {
        if (window.player) window.player.next();
      },
      seekbackward: (details) => {
        const skipTime = details.seekOffset || 10;
        if (window.player) window.player.seekBy(-skipTime);
      },
      seekforward: (details) => {
        const skipTime = details.seekOffset || 10;
        if (window.player) window.player.seekBy(skipTime);
      },
      seekto: (details) => {
        if (window.player && details.seekTime !== undefined) {
          const duration = window.player.audio.duration;
          if (duration) {
            window.player.seekTo(details.seekTime / duration);
          }
        }
      },
      stop: () => {
        if (window.player) {
          window.player.pause();
          window.player.seekTo(0);
        }
      },
    };
    
    // Register handlers (some may not be supported on all platforms)
    for (const [action, handler] of Object.entries(actions)) {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch (error) {
        console.log(`MediaSession action "${action}" not supported`);
      }
    }
  }
  
  /**
   * Update metadata for the currently playing track
   */
  updateMetadata(track) {
    if (!this.isSupported || !track) return;
    
    const metadata = {
      title: track.title || 'Unknown Title',
      artist: track.artist || 'Unknown Artist',
      album: track.album || 'Unknown Album',
    };
    
    // Add artwork if available
    if (track.artworkUrl) {
      metadata.artwork = [
        { src: track.artworkUrl, sizes: '96x96', type: 'image/jpeg' },
        { src: track.artworkUrl, sizes: '128x128', type: 'image/jpeg' },
        { src: track.artworkUrl, sizes: '192x192', type: 'image/jpeg' },
        { src: track.artworkUrl, sizes: '256x256', type: 'image/jpeg' },
        { src: track.artworkUrl, sizes: '384x384', type: 'image/jpeg' },
        { src: track.artworkUrl, sizes: '512x512', type: 'image/jpeg' },
      ];
    }
    
    try {
      navigator.mediaSession.metadata = new MediaMetadata(metadata);
    } catch (error) {
      console.error('Failed to set MediaSession metadata:', error);
    }
    
    this._updatePositionState();
  }
  
  /**
   * Update position state (for seekable timeline on lock screen)
   */
  _updatePositionState() {
    if (!this.isSupported || !window.player) return;
    
    const audio = window.player.audio;
    if (!audio || !audio.duration || isNaN(audio.duration)) return;
    
    try {
      navigator.mediaSession.setPositionState({
        duration: audio.duration,
        playbackRate: audio.playbackRate || 1,
        position: audio.currentTime || 0,
      });
    } catch (error) {
      // Position state not supported on some browsers
    }
  }
  
  /**
   * Set playback state
   */
  setPlaybackState(state) {
    if (!this.isSupported) return;
    
    try {
      navigator.mediaSession.playbackState = state; // 'playing', 'paused', 'none'
      this._updatePositionState();
    } catch (error) {
      console.error('Failed to set playback state:', error);
    }
  }
  
  /**
   * Clear metadata
   */
  clearMetadata() {
    if (!this.isSupported) return;
    
    try {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = 'none';
    } catch (error) {
      console.error('Failed to clear MediaSession metadata:', error);
    }
  }
}

// Create global instance
window.MediaSessionManager = new MediaSessionManager();

// Update position state periodically when playing
setInterval(() => {
  if (window.player && window.player.isPlaying && window.MediaSessionManager) {
    window.MediaSessionManager._updatePositionState();
  }
}, 1000);

