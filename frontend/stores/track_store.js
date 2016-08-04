const Store = require('flux/utils').Store;

const AppDispatcher = require('../dispatcher/dispatcher.js'),
      TrackConstants = require('../constants/track_constants.js');

const TrackStore = new Store(AppDispatcher);

var _tracks = {};

TrackStore.all = function () {
  let tracks = [];

  Object.keys(_tracks).forEach( (trackId) => {
    tracks.push(_tracks[trackId]);
  });
  return tracks;
};

TrackStore.find = function (trackId) {
  return _tracks[trackId];
};

const resetTrack = function (track) {
  _tracks[track.id] = track;
};

const resetAllTracks = function (tracks) {
  _tracks = {};
  tracks.forEach( (track) => {
    _tracks[track.id] = track;
  });
};

TrackStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TrackConstants.RECEIVE_TRACK:
      resetTrack(payload.track);
      this.__emitChange();
      break;
    case TrackConstants.RECEIVE_TRACKS:
      resetAllTracks(payload.tracks);
      this.__emitChange();
      break;
  }
};

module.exports = TrackStore;
