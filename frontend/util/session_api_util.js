const FormConstants = require('../constants/form_constants.js');

module.exports = {
  createUser (user, successCb, errorCb) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: { user: user },
      dataType: "json",
      success: (resp) => {

        successCb(resp);
      },
      error(xhr) {
        errorCb(FormConstants.SIGNUP_FORM, xhr.responseJSON);
      }
    });
  },

  fetchCurrentUser (successCb) {
    $.ajax({
      url: "api/session",
      method: "GET",
      success(user) {
        successCb(user);
      },
      error: (xhr) => {
        console.log("Error in SessionApiUtil#fetchCurrentUser");
      }
    });
  },

  loginUser (user, successCb, errorCb) {
    $.ajax({
      url: "api/session",
      method: "POST",
      data: { user: user },
      dataType: "json",
      success: (resp) => {
        successCb(resp);
      },
      error(xhr) {
        errorCb(FormConstants.LOGIN_FORM, xhr.responseJSON);
      }
    });
  },

  logoutUser (successCb) {
    $.ajax({
      url: "api/session",
      method: "DELETE",
      success: (resp) => {
        successCb(resp);
      },
      error: function () {
        console.log("Logout error in SessionApiUtil#logoutUser");
      }
    });
  }
};
