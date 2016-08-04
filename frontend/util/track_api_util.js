const FormConstants = require('../constants/form_constants.js');

module.exports = {

  createTrack (track, success, errorCb) {
    $.ajax({
      url: "api/tracks",
      method: "POST",
      data: { track: track },
      dataType: "json",
      success,
      error(xhr) {
        errorCb(FormConstants.CREATE_TRACK_FORM, xhr.responseJSON);
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
