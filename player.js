/**
 * Audio Player Engine
 * Single HTMLAudioElement-based player with queue management
 */

class AudioPlayer {
  constructor() {
    // Create audio element
    this.audio = new Audio();
    this.audio.preload = 'metadata';
    
    // Enable background playback on mobile
    this.audio.setAttribute('playsinline', '');
    this.audio.setAttribute('webkit-playsinline', '');
    
    // State
    this.currentTrack = null;
    this.queue = [];
    this.queueIndex = -1;
    this.originalQueue = []; // For shuffle restore
    this.isPlaying = false;
    this.volume = 1;
    this.isMuted = false;
    this.shuffle = false;
    this.repeat = 'none'; // 'none', 'all', 'one'
    
    // Object URLs that need cleanup
    this.currentAudioUrl = null;
    this.currentArtworkUrl = null;
    
    // Wake lock for keeping screen on during playback
    this.wakeLock = null;
    
    // Bind event handlers
    this._onTimeUpdate = this._onTimeUpdate.bind(this);
    this._onEnded = this._onEnded.bind(this);
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
    this._onError = this._onError.bind(this);
    this._onLoadedMetadata = this._onLoadedMetadata.bind(this);
    
    // Attach event listeners
    this.audio.addEventListener('timeupdate', this._onTimeUpdate);
    this.audio.addEventListener('ended', this._onEnded);
    this.audio.addEventListener('play', this._onPlay);
    this.audio.addEventListener('pause', this._onPause);
    this.audio.addEventListener('error', this._onError);
    this.audio.addEventListener('loadedmetadata', this._onLoadedMetadata);
    
    // Throttle for time update events
    this._lastTimeUpdate = 0;
    
    // Auto-save state periodically
    this._saveStateDebounced = this._debounce(() => this._saveState(), 1000);
    
    // Restore state on init
    this._restoreState();
  }
  
  /**
   * Restore player state from IndexedDB
   */
  async _restoreState() {
    try {
      const state = await DB.getPlayerState();
      
      this.volume = state.volume ?? 1;
      this.shuffle = state.shuffle ?? false;
      this.repeat = state.repeat ?? 'none';
      this.audio.volume = this.volume;
      
      if (state.queue && state.queue.length > 0) {
        // Load queue tracks
        this.queue = [];
        for (const trackId of state.queue) {
          const track = await Metadata.getTrackWithArtwork(trackId);
          if (track) this.queue.push(track);
        }
        
        this.originalQueue = [...this.queue];
        this.queueIndex = state.queueIndex ?? 0;
        
        // Load current track (but don't play)
        if (this.queueIndex >= 0 && this.queueIndex < this.queue.length) {
          const track = this.queue[this.queueIndex];
          await this._loadTrack(track, false);
        }
      }
      
      this._emitStateChange();
    } catch (error) {
      console.error('Failed to restore player state:', error);
    }
  }
  
  /**
   * Save player state to IndexedDB
   */
  async _saveState() {
    try {
      const state = {
        currentTrackId: this.currentTrack?.id || null,
        queue: this.queue.map(t => t.id),
        queueIndex: this.queueIndex,
        currentTime: this.audio.currentTime || 0,
        volume: this.volume,
        shuffle: this.shuffle,
        repeat: this.repeat,
      };
      
      await DB.savePlayerState(state);
    } catch (error) {
      console.error('Failed to save player state:', error);
    }
  }
  
  /**
   * Load a track into the audio element
   */
  async _loadTrack(track, autoPlay = true) {
    // Cleanup previous URLs
    if (this.currentAudioUrl) {
      URL.revokeObjectURL(this.currentAudioUrl);
      this.currentAudioUrl = null;
    }
    if (this.currentArtworkUrl) {
      URL.revokeObjectURL(this.currentArtworkUrl);
      this.currentArtworkUrl = null;
    }
    
    this.currentTrack = track;
    
    // Create audio URL from blob
    if (track.audioBlob) {
      this.currentAudioUrl = URL.createObjectURL(track.audioBlob);
      this.audio.src = this.currentAudioUrl;
    }
    
    // Get artwork URL
    if (track.artworkId) {
      this.currentArtworkUrl = await DB.getArtworkUrl(track.artworkId);
      this.currentTrack.artworkUrl = this.currentArtworkUrl;
    }
    
    // Update media session
    if (window.MediaSessionManager) {
      window.MediaSessionManager.updateMetadata(this.currentTrack);
    }
    
    if (autoPlay) {
      await this.play();
    }
    
    this._emitStateChange();
  }
  
  /**
   * Play current track
   */
  async play() {
    if (!this.currentTrack) {
      // If no track, try to play first in queue
      if (this.queue.length > 0) {
        this.queueIndex = 0;
        await this._loadTrack(this.queue[0]);
      }
      return;
    }
    
    try {
      await this.audio.play();
      this.isPlaying = true;
      this._emitStateChange();
    } catch (error) {
      console.error('Failed to play:', error);
    }
  }
  
  /**
   * Pause playback
   */
  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this._emitStateChange();
  }
  
  /**
   * Toggle play/pause
   */
  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  /**
   * Play next track
   */
  async next() {
    if (this.queue.length === 0) return;
    
    let nextIndex = this.queueIndex + 1;
    
    if (nextIndex >= this.queue.length) {
      if (this.repeat === 'all') {
        nextIndex = 0;
      } else {
        // End of queue
        this.pause();
        return;
      }
    }
    
    this.queueIndex = nextIndex;
    await this._loadTrack(this.queue[this.queueIndex]);
  }
  
  /**
   * Play previous track
   */
  async previous() {
    if (this.queue.length === 0) return;
    
    // If more than 3 seconds in, restart current track
    if (this.audio.currentTime > 3) {
      this.audio.currentTime = 0;
      return;
    }
    
    let prevIndex = this.queueIndex - 1;
    
    if (prevIndex < 0) {
      if (this.repeat === 'all') {
        prevIndex = this.queue.length - 1;
      } else {
        prevIndex = 0;
      }
    }
    
    this.queueIndex = prevIndex;
    await this._loadTrack(this.queue[this.queueIndex]);
  }
  
  /**
   * Seek to position (0-1)
   */
  seekTo(percent) {
    if (!this.audio.duration) return;
    this.audio.currentTime = this.audio.duration * Math.max(0, Math.min(1, percent));
    this._emitStateChange();
  }
  
  /**
   * Seek by offset in seconds
   */
  seekBy(seconds) {
    if (!this.audio.duration) return;
    this.audio.currentTime = Math.max(0, Math.min(this.audio.duration, this.audio.currentTime + seconds));
    this._emitStateChange();
  }
  
  /**
   * Set volume (0-1)
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.audio.volume = this.isMuted ? 0 : this.volume;
    this._saveStateDebounced();
    this._emitStateChange();
  }
  
  /**
   * Toggle mute
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.volume = this.isMuted ? 0 : this.volume;
    this._emitStateChange();
  }
  
  /**
   * Toggle shuffle
   */
  toggleShuffle() {
    this.shuffle = !this.shuffle;
    
    if (this.shuffle) {
      // Save original order and shuffle
      this.originalQueue = [...this.queue];
      this._shuffleQueue();
    } else {
      // Restore original order
      const currentTrack = this.currentTrack;
      this.queue = [...this.originalQueue];
      
      // Find current track in restored queue
      if (currentTrack) {
        this.queueIndex = this.queue.findIndex(t => t.id === currentTrack.id);
        if (this.queueIndex < 0) this.queueIndex = 0;
      }
    }
    
    this._saveStateDebounced();
    this._emitStateChange();
  }
  
  /**
   * Shuffle the queue, keeping current track first
   */
  _shuffleQueue() {
    const currentTrack = this.currentTrack;
    const remaining = this.queue.filter(t => t.id !== currentTrack?.id);
    
    // Fisher-Yates shuffle
    for (let i = remaining.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }
    
    if (currentTrack) {
      this.queue = [currentTrack, ...remaining];
      this.queueIndex = 0;
    } else {
      this.queue = remaining;
      this.queueIndex = 0;
    }
  }
  
  /**
   * Cycle repeat mode: none -> all -> one -> none
   */
  cycleRepeat() {
    const modes = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(this.repeat);
    this.repeat = modes[(currentIndex + 1) % modes.length];
    this._saveStateDebounced();
    this._emitStateChange();
  }
  
  /**
   * Set the queue and start playing
   */
  async setQueue(tracks, startIndex = 0) {
    this.queue = [...tracks];
    this.originalQueue = [...tracks];
    this.queueIndex = startIndex;
    
    if (this.shuffle) {
      this._shuffleQueue();
    }
    
    if (this.queue.length > 0 && this.queueIndex < this.queue.length) {
      await this._loadTrack(this.queue[this.queueIndex]);
    }
    
    this._saveStateDebounced();
  }
  
  /**
   * Add track to end of queue
   */
  addToQueue(track) {
    this.queue.push(track);
    this.originalQueue.push(track);
    this._saveStateDebounced();
    this._emitStateChange();
  }
  
  /**
   * Add track to play next
   */
  addToQueueNext(track) {
    const insertIndex = this.queueIndex + 1;
    this.queue.splice(insertIndex, 0, track);
    this.originalQueue.splice(insertIndex, 0, track);
    this._saveStateDebounced();
    this._emitStateChange();
  }
  
  /**
   * Remove track from queue by index
   */
  removeFromQueue(index) {
    if (index < 0 || index >= this.queue.length) return;
    
    const removedTrack = this.queue[index];
    this.queue.splice(index, 1);
    
    // Also remove from original queue
    const origIndex = this.originalQueue.findIndex(t => t.id === removedTrack.id);
    if (origIndex >= 0) {
      this.originalQueue.splice(origIndex, 1);
    }
    
    // Adjust queue index if needed
    if (index < this.queueIndex) {
      this.queueIndex--;
    } else if (index === this.queueIndex) {
      // Currently playing track removed
      if (this.queue.length === 0) {
        this.currentTrack = null;
        this.queueIndex = -1;
        this.audio.src = '';
      } else if (this.queueIndex >= this.queue.length) {
        this.queueIndex = this.queue.length - 1;
        this._loadTrack(this.queue[this.queueIndex]);
      } else {
        this._loadTrack(this.queue[this.queueIndex]);
      }
    }
    
    this._saveStateDebounced();
    this._emitStateChange();
  }
  
  /**
   * Play a specific track in the queue
   */
  async playQueueIndex(index) {
    if (index < 0 || index >= this.queue.length) return;
    
    this.queueIndex = index;
    await this._loadTrack(this.queue[index]);
  }
  
  /**
   * Clear the queue
   */
  clearQueue() {
    this.queue = [];
    this.originalQueue = [];
    this.queueIndex = -1;
    this.currentTrack = null;
    this.audio.src = '';
    this.isPlaying = false;
    
    this._saveStateDebounced();
    this._emitStateChange();
  }
  
  /**
   * Get current state
   */
  getState() {
    return {
      track: this.currentTrack,
      isPlaying: this.isPlaying,
      currentTime: this.audio.currentTime || 0,
      duration: this.audio.duration || 0,
      volume: this.volume,
      isMuted: this.isMuted,
      shuffle: this.shuffle,
      repeat: this.repeat,
      queue: this.queue,
      queueIndex: this.queueIndex,
    };
  }
  
  // Event handlers
  _onTimeUpdate() {
    // Throttle to ~4 updates per second
    const now = Date.now();
    if (now - this._lastTimeUpdate < 250) return;
    this._lastTimeUpdate = now;
    
    this._emitStateChange();
  }
  
  async _onEnded() {
    if (this.repeat === 'one') {
      // Repeat current track
      this.audio.currentTime = 0;
      await this.play();
    } else {
      await this.next();
    }
  }
  
  _onPlay() {
    this.isPlaying = true;
    if (window.MediaSessionManager) {
      window.MediaSessionManager.setPlaybackState('playing');
    }
    this._requestWakeLock();
    this._emitStateChange();
  }
  
  _onPause() {
    this.isPlaying = false;
    if (window.MediaSessionManager) {
      window.MediaSessionManager.setPlaybackState('paused');
    }
    this._releaseWakeLock();
    this._saveStateDebounced();
    this._emitStateChange();
  }
  
  /**
   * Request wake lock to keep screen on during playback (optional)
   */
  async _requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.wakeLock.addEventListener('release', () => {
          this.wakeLock = null;
        });
      } catch (err) {
        // Wake lock not supported or failed - continue without it
        console.log('Wake lock not available:', err.message);
      }
    }
  }
  
  /**
   * Release wake lock when paused
   */
  _releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release();
      this.wakeLock = null;
    }
  }
  
  _onError(e) {
    console.error('Audio error:', e);
    this.isPlaying = false;
    this._emitStateChange();
  }
  
  _onLoadedMetadata() {
    // Update duration in current track
    if (this.currentTrack) {
      this.currentTrack.duration = this.audio.duration;
    }
    this._emitStateChange();
  }
  
  /**
   * Emit state change event
   */
  _emitStateChange() {
    const event = new CustomEvent('playerStateChange', {
      detail: this.getState(),
    });
    window.dispatchEvent(event);
  }
  
  /**
   * Debounce helper
   */
  _debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  }
}

// Create global player instance
window.player = new AudioPlayer();
