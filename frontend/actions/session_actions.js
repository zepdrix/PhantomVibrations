const SessionApiUtil = require('../util/session_api_util'),
      SessionConstants = require('../constants/session_constants'),
      AppDispatcher = require('../dispatcher/dispatcher'),
      ErrorActions = require('./error_actions');

module.exports = {
  createUser (user) {
    SessionApiUtil.createUser(
      user,
      this.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  loginUser (user) {
    SessionApiUtil.loginUser(
      user,
      this.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  logoutUser () {
    SessionApiUtil.logoutUser(
      this.removeCurrentUser);
  },

  fetchCurrentUser () {
    SessionApiUtil.fetchCurrentUser(
      SessionActions.receiveCurrentUser);
  },

  receiveCurrentUser (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      user: user
    });
  },

  removeCurrentUser (user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT,
      user: user
    });
  }
};
