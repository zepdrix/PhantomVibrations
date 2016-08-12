const FormConstants = require('../constants/form_constants');

module.exports = {

  fetchUser (id, successCb) {
    $.ajax({
      url: `api/users/${id}`,
      method: "GET",
      success: (resp) => {
        successCb(resp);
      },
      error: (resp) => {
        console.log("Error in UserApiUtil#fetchUser");
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

  fetchAllUsers (successCb) {
    $.ajax({
      url: "api/users",
      method: "GET",
      success: (resp) => {
        successCb(resp);
      },
      error: (resp) => {
        console.log("Error in UserApiUtil#fetchAllUsers");
      }
    });
  }

};
