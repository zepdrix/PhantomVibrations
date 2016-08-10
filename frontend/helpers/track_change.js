const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');

module.exports = {

  playTrack (id) {
    if (id == TrackStore.currentTrack().dataset.id) {
      if (TrackStore.currentTrack().paused) {
        TrackActions.playCurrentTrack();
      } else {
        TrackActions.pauseCurrentTrack();
      }
    } else {

      let track = new Audio();
      let currentTrack = TrackStore.find(id);
      track.dataset.id = currentTrack.id;
      track.title = currentTrack.title;
      track.src = currentTrack.audio_url;
      TrackActions.resetCurrentTrack(track);
    }
  },
  pauseTrack (e) {
    TrackActions.pauseCurrentTrack();
  }
};
