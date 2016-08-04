const FormConstants = require('../constants/form_constants.js');

module.exports = {
  createUser (user, success, errorCb) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: { user: user },
      dataType: "json",
      success,
      error(xhr) {
        errorCb(FormConstants.SIGNUP_FORM, xhr.responseJSON);
      }
    });
  },

  fetchCurrentUser (cb) {
    $.ajax({
      url: "api/session",
      method: "GET",
      success(user) {
        cb(user);
      },
      error: (xhr) => {
        console.log("Error in SessionApiUtil#fetchCurrentUser");
      }
    });
  },

  loginUser (user, success, errorCb) {
    $.ajax({
      url: "api/session",
      method: "POST",
      data: { user: user },
      dataType: "json",
      success,
      error(xhr) {
        errorCb(FormConstants.LOGIN_FORM, xhr.responseJSON);
      }
    });
  },

  logoutUser (success) {
    $.ajax({
      url: "api/session",
      method: "DELETE",
      success,
      error: function () {
        console.log("Logout error in SessionApiUtil#logoutUser");
      }
    });
  }
};
