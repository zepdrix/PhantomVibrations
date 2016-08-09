const Store = require('flux/utils').Store;

const AppDispatcher = require('../dispatcher/dispatcher.js'),
      TrackConstants = require('../constants/track_constants.js');

const TrackStore = new Store(AppDispatcher);

var _tracks = {};

var _playQueue = [];

var _currentTrackIndex = 0;

var _currentTrack = {};

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

TrackStore.currentTrack = function () {
  return _currentTrack;
};

TrackStore.currentTime = function () {
  return _currentTrack.currentTime;
};

TrackStore.isCurrentTrack = function () {
  return !!_currentTrack.src;
};

const _resetTrack = function (track) {
  _tracks[track.id] = track;
};

const _resetAllTracks = function (tracks) {
  _tracks = {};
  tracks.forEach( (track) => {
    _tracks[track.id] = track;
  });
};

const _resetCurrentTrack = function (track) {
  if (!!_currentTrack.src) {
    _currentTrack.pause();

  }
  _currentTrack = track;
};

const _removeTrack = function (track) {
  delete _tracks[track.id];
};

TrackStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TrackConstants.RECEIVE_TRACK:
      _resetTrack(payload.track);
      this.__emitChange();
      break;
    case TrackConstants.RECEIVE_TRACKS:
      _resetAllTracks(payload.tracks);
      this.__emitChange();
      break;
    case TrackConstants.RECEIVE_CURRENT_TRACK:
      _resetCurrentTrack(payload.track);
      this.__emitChange();
      break;
    case TrackConstants.REMOVE_TRACK:
      _removeTrack(payload.track);
      this.__emitChange();
      break;
  }
};

module.exports = TrackStore;
