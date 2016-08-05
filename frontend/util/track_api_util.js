const FormConstants = require('../constants/form_constants.js');

module.exports = {

  createTrack (formData, success, errorCb) {
    $.ajax({
      url: "api/tracks",
      method: "POST",
      dataType: "json",
      contentType: false,
      processData: false,
      data: formData,
      success,
      error(xhr) {
        errorCb(FormConstants.CREATE_TRACK_FORM, xhr.responseJSON, xhr.responseText);
      }
    });
  },

  fetchAllTracks (successCb) {
    $.ajax({
      url: "api/tracks",
      method: "GET",
      success: (data) => {
        console.log(data);
        successCb(data);
      },
      error: (xhr) => {
        console.log("Error in TrackApiUtil#fetchAllTracks");
      }

    });
  }
};
