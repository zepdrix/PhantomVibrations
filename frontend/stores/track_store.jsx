const Store = require('flux/utils').Store;
const Wavesurfer = require('react-wavesurfer').default;
const AppDispatcher = require('../dispatcher/dispatcher'),
      TrackConstants = require('../constants/track_constants'),
      LikeConstants = require('../constants/like_constants');
const React = require('react');
const TrackStore = new Store(AppDispatcher);

var _tracks = {};

// var _playQueue = {};
// var _currentQueueIndex = -1;

var _currentTrack = new Audio();

_currentTrack.dataset.id = "no-track";

var _waveforms = {};
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
};


const _removeTrack = function (track) {
  delete _tracks[track.id];
};

const _addLike = function (trackId, userId) {
  _tracks[trackId].likes.push(userId);
};

const _removeLike = function (trackId, userId) {
  let likeUserId = _tracks[trackId].likes.indexOf(userId);
  _tracks[trackId].likes.splice(userId, 1);
};

TrackStore.getWaveforms = function () {
  return _waveforms;
};


TrackStore.setWaveform = function (id, waveform) {
  _waveforms[id] = waveform;
};

const _playCurrentTrack = function () {
  _currentTrack.addEventListener('timeupdate', _setCurrentPercentage);
  _currentTrack.play();
};

const _setCurrentPercentage = function () {
  _trackStates[_currentTrack.dataset.id] = { percentage: 0, duration: 0 };
  _trackStates[_currentTrack.dataset.id].percentage = _currentTrack.currentTime / _currentTrack.duration;
  _trackStates[_currentTrack.dataset.id].duration = _currentTrack.duration;
};

const _seekNewPercentage = function (clickPercentage) {
  _currentTrack.currentTime = clickPercentage * _currentTrack.duration;
};

TrackStore.getPlaybackPercentage = function (trackId) {
  if (_trackStates[trackId]) {
    return _trackStates[trackId].percentage;
  } else {
    return 0;
  }
};

TrackStore.getTrackDuration = function (trackId) {
  if (_trackStates[trackId]) {
    return _trackStates[trackId].duration;
  } else {
    return 0;
  }
};

TrackStore.getWaveform = function (id) {
  return _waveforms[id];
};


const _pauseCurrentTrack = function () {
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
    case TrackConstants.SET_WAVEFORM:
      _setWaveform(payload.id, payload.waveform);
      this.__emitChange();
      break;
    case LikeConstants.RECEIVE_LIKE:
      _addLike(payload.like.track_id, payload.like.user_id);
      this.__emitChange();
      break;
    case LikeConstants.REMOVE_LIKE:
      _removeLike(payload.like.track_id, payload.like.user_id);
      this.__emitChange();
      break;
  }
};

module.exports = TrackStore;
