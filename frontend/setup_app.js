const SessionActions = require('./actions/session_actions.js');

module.exports = function () {
  var user = window.phantomVibes.user;
  if (typeof user !== "undefined") {
    SessionActions.receiveCurrentUser(user);
  }

};
