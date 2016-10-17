const TrackApiUtil = require('../util/track_api_util'),
      TrackConstants = require('../constants/track_constants'),
      AppDispatcher = require('../dispatcher/dispatcher'),
      ErrorActions = require('./error_actions');

module.exports = {
  createTrack (track, spinner) {
    TrackApiUtil.createTrack(
      track,
      this.receiveTrack,
      ErrorActions.setErrors,
      spinner);
  },

  updateTrack (formData, spinner) {
    TrackApiUtil.updateTrack(
      formData,
      this.receiveTrack,
      ErrorActions.setErrors,
      spinner);
  },

  deleteTrack (id) {
    TrackApiUtil.deleteTrack(
      id,
      this.removeTrack);

  },

  fetchTrack (id) {
    TrackApiUtil.fetchTrack(
      id,
      this.receiveTrack);
  },

  fetchUserTracks (user_id) {
    TrackApiUtil.fetchUserTracks(
      user_id,
      this.receiveTracks);
  },

  fetchAllTracks () {
    TrackApiUtil.fetchAllTracks(
      this.receiveTracks);
  },

  receiveTrack (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_TRACK,
      track: track
    });
  },

  receiveTracks (tracks) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_TRACKS,
      tracks: tracks
    });
  },

  removeTrack (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.REMOVE_TRACK,
      track: track
    });
  },

  resetCurrentTrack (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.RECEIVE_CURRENT_TRACK,
      track: track
    });
  },

  pauseCurrentTrack (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.PAUSE_CURRENT_TRACK,
      track: track
    });
  },

  playCurrentTrack (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.PLAY_CURRENT_TRACK,
      track: track
    });
  },

  seekNewPercentage (clickPercentage) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.SEEK_NEW_PERCENTAGE,
      percentage: clickPercentage
    });
  },

  setWaveform (id, waveform) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.SET_WAVEFORM,
      id: id,
      waveform: waveform
    });
  }

};
