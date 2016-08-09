const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');

module.exports = {

  playTrack (e) {

    let track = new Audio();
    let currentTrack = TrackStore.find(parseInt(e.currentTarget.id));
    track.id = currentTrack.id;
    track.title = currentTrack.title;
    // track.autoplay = true;
    track.src = currentTrack.audio_url;
    TrackActions.resetCurrentTrack(track);
    // TrackStore.playCurrentTrack();
  },

  pauseTrack (e) {
    TrackActions.pauseCurrentTrack();
  }
};
