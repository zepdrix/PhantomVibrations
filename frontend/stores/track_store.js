const Store = require('flux/utils').Store;

const AppDispatcher = require('../dispatcher/dispatcher.js'),
      TrackConstants = require('../constants/track_constants.js');

const TrackStore = new Store(AppDispatcher);

var _tracks = {};

// var _playQueue = {};
// var _currentQueueIndex = -1;

var _currentTrack = new Audio();
var _trackStates = {};

var refreshIntervalId;

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
  return !!_currentTrack.dataset.id;
};

const _resetTrack = function (track) {
  _tracks[track.id] = track;
};

const _resetAllTracks = function (tracks) {

  _tracks = {};

  tracks.forEach( (track) => {
      _tracks[track.id] = track;
    }
  );

  // Object.keys(_tracks).forEach( (trackId) => {
  //   if (!_trackStates.hasOwnProperty(trackId)) {
  //     delete _tracks[trackId];
  //   }
  // });
  //
  // tracks.forEach( (track) => {
  //   if (!_trackStates.hasOwnProperty(track.id.toString())) {
  //     _tracks[track.id] = track;
  //   }
  // });
};

// const _resetCurrentTrack = function (track) {
//   if (!!_currentTrack.id) {
//     _currentTrack.pause();
//   }
//   _trackStates[track.id] = 0;
//   _currentTrack = track;
// };

const _removeTrack = function (track) {
  delete _tracks[track.id];
};






// CURRENT_TRACK
//
// _currentTrack
//
// CURRENT_TRACK_STATE
//
// _trackStates[_playQueue[_currentQueueIndex]]
//
// CURRENT_TRACK_ID
//
// _playQueue[_currentQueueIndex]
//
// UPDATE_PERCENTAGE_WHILE_PLAYING
//
//
// STOP_UPDATING_PERCENTAGE_WHEN_PAUSED
//
// clearInterval(refreshIntervalId)
//
//
const _playCurrentTrack = function () {
  // refreshIntervalId = setInterval( () => {
  //   _trackStates[_currentTrack.id] = (_currentTrack.currentTime / _currentTrack.duration);
  //   }, 25);
  _currentTrack.addEventListener('timeupdate', _setCurrentPercentage);
  _currentTrack.play();
};

const _setCurrentPercentage = function () {
  _trackStates[_currentTrack.dataset.id] = _currentTrack.currentTime / _currentTrack.duration;
};


const _seekNewPercentage = function (clickPercentage) {
  _currentTrack.currentTime = clickPercentage * _currentTrack.duration;
};



TrackStore.getPlaybackPercentage = function (trackId) {
  if (_trackStates[trackId]) {
    return _trackStates[trackId];
  } else {
    return 0;
  }
};


const _pauseCurrentTrack = function () {
  // clearInterval(refreshIntervalId);
  _setCurrentPercentage();
  _currentTrack.removeEventListener('timeupdate', _setCurrentPercentage);
  _currentTrack.pause();
};

const _resetCurrentTrack = function (track) {
  if (!!_currentTrack.dataset.id) {
    _pauseCurrentTrack();
  }

  _currentTrack = track;
  _currentTrack.onloadedmetadata = () => {
    let trackId = _currentTrack.dataset.id;
    let prevPlaybackPercentage = TrackStore.getPlaybackPercentage(trackId);
    let startAt = prevPlaybackPercentage * _currentTrack.duration;
    _currentTrack.currentTime = startAt;
    _playCurrentTrack();
  };
};

TrackStore.getStates = function () {
  return _trackStates;
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
    case TrackConstants.PAUSE_CURRENT_TRACK:
      _pauseCurrentTrack(payload.track);
      this.__emitChange();
      break;
    case TrackConstants.PLAY_CURRENT_TRACK:
      _playCurrentTrack(payload.track);
      this.__emitChange();
      break;
    case TrackConstants.SEEK_NEW_PERCENTAGE:
      _seekNewPercentage(payload.percentage);
      this.__emitChange();
      break;
    case TrackConstants.REMOVE_TRACK:
      _removeTrack(payload.track);
      this.__emitChange();
      break;
  }
};

module.exports = TrackStore;
