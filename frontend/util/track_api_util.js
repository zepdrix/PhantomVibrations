const FormConstants = require('../constants/form_constants');

module.exports = {

  createTrack (formData, successCb, errorCb, spinner) {
    $.ajax({
      url: "api/tracks",
      method: "POST",
      dataType: "json",
      contentType: false,
      processData: false,
      data: formData,
      success: (resp) => {
        successCb(resp);
      },
      error(xhr) {
        errorCb(FormConstants.CREATE_TRACK_FORM, xhr.responseJSON, xhr.responseText);
        spinner();
      }
    });
  },

  updateTrack (formData, successCb, errorCb, spinner) {
    $.ajax({
      url: `api/tracks/${formData.get('track[id]')}`,
      method: "PATCH",
      DataType: "json",
      contentType: false,
      processData: false,
      data: formData,
      success: (resp) => {
        successCb(resp);
      },
      error(xhr) {
        errorCb(FormConstants.EDIT_TRACK_FORM, xhr.responseJSON, xhr.responseText);
        spinner();
      }
    });
  },

  deleteTrack (id, successCb) {
    $.ajax({
      url: `api/tracks/${id}`,
      method: "DELETE",
      success: (resp) => {
        successCb(resp);
      },
      error(xhr) {
        console.log("Error in TrackApiUtil#deleteTrack");
      }
    });
  },

  fetchUserTracks (user_id, successCb) {
    $.ajax({
      url: "api/tracks",
      method: "GET",
      data: {user_id: user_id},
      success: (resp) => {
        successCb(resp);
      },
      error(xhr) {
        console.log("Error in TrackApiUtil@fetchUserTracks");
      }
    });
  },

  fetchTrack (id, successCb) {
    $.ajax({
      url: `api/tracks/${id}`,
      method: "GET",
      success: (resp) => {
        successCb(resp);
      },
      error: (xhr) => {
        console.log("Error in TrackApiUtil@fetchTrack");
      }
    });


  },

  fetchAllTracks (successCb) {
    $.ajax({
      url: "api/tracks",
      method: "GET",
      success: (resp) => {
        successCb(resp);
      },
      error: (xhr) => {
        console.log("Error in TrackApiUtil#fetchAllTracks");
      }
    });
  }
};
