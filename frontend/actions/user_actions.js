const UserApiUtil = require('../util/user_api_util.js'),
      UserConstants = require('../constants/user_constants.js'),
      AppDispatcher = require('../dispatcher/dispatcher.js');

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
