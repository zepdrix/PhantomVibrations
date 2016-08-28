const Store = require('flux/utils').Store;

const AppDispatcher = require('../dispatcher/dispatcher'),
      SessionConstants = require('../constants/session_constants'),
      LikeConstants = require('../constants/like_constants');

const SessionStore = new Store(AppDispatcher);

var _currentUser = {};

const _login = function (currentUser) {
  _currentUser = currentUser;
};

const _logout = function () {
  _currentUser = {};
};

SessionStore.isUserLoggedIn = function () {
  return !!_currentUser.id;
};

SessionStore.currentUser = function () {
  return Object.assign({}, _currentUser);
};

const _addLike = function (like) {
  _currentUser.likes.push(like);
};

const _removeLike = function (like) {
  let likeTrackId = _currentUser.likes.indexOf(like);
  _currentUser.likes.splice(likeTrackId, 1);
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.user);
      this.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _logout(payload.user);
      this.__emitChange();
      break;
    case LikeConstants.RECEIVE_LIKE:
    debugger
      _addLike(payload.like);
      this.__emitChange();
      break;
    case LikeConstants.REMOVE_LIKE:
    debugger
    
      _removeLike(payload.like);
      this.__emitChange();
      break;
  }
};

module.exports = SessionStore;
