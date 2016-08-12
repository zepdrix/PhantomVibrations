const UserApiUtil = require('../util/user_api_util'),
      UserConstants = require('../constants/user_constants'),
      AppDispatcher = require('../dispatcher/dispatcher'),
      ErrorActions = require('./error_actions');

module.exports = {
  fetchUser (id) {
    UserApiUtil.fetchUser(
      id,
      this.receiveUser);
  },

  fetchAllUsers () {
    UserApiUtil.fetchAllUsers(
      this.receiveAllUsers);
  },

  updateUser (formData) {
    UserApiUtil.updateUser(
      formData,
      this.receiveUser,
      ErrorActions.setErrors);
  },

  receiveUser (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USER,
      user: user
    });
  },

  receiveAllUsers (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_USERS,
      users: users
    });
  }

};
