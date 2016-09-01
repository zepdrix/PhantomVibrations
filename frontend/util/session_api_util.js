const FormConstants = require('../constants/form_constants');

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

  updateUser (formData, successCb, errorCb) {
    $.ajax({
      url: `api/users/${formData.get('user[id]')}`,
      method: "PATCH",
      contentType: false,
      processData: false,
      data: formData,
      success: (resp) => {
        successCb(resp);
      },
      error(xhr) {
        errorCb(FormConstants.EDIT_USER_FORM, xhr.responseJSON, xhr.responseText);
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
