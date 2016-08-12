const Store = require('flux/utils').Store;

const AppDispatcher = require('../dispatcher/dispatcher'),
      UserConstants = require('../constants/user_constants');

const UserStore = new Store(AppDispatcher);

var _users = {};

UserStore.all = function () {
  let users = [];

  Object.keys(_users).forEach( (userId) => {
    users.push(_users[userId]);
  });
  return users;
};

UserStore.find = function (id) {
  return _users[id];
};

const _resetUser = function (user) {
  _users[user.id] = user;
};

const _resetAllUsers = function (users) {
  _users = {};

  users.forEach( (user) => {
    _users[user.id] = user;
  });
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.RECEIVE_USER:
      _resetUser(payload.user);
      this.__emitChange();
      break;
    case UserConstants.RECEIVE_USERS:
      _resetAllUsers(payload.users);
      this.__emitChange();
      break;
  }
};

module.exports = UserStore;
