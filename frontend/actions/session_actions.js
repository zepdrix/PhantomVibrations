const SessionApiUtil = require('../util/session_api_util.js');
const SessionConstants = require('../constants/session_constants.js');
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ErrorActions = require('./error_actions.js');

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

  logoutUser (user) {
    SessionApiUtil.logoutUser(
      user,
      this.removeCurrentUser,
      ErrorActions.setErrors);
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
