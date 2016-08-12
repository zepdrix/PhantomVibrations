const FormConstants = require('../constants/form_constants');

module.exports = {
  createComment (comment, successCb) {
    $.ajax({
      url: "api/comments",
      method: "POST",
      data: { comment: comment },
      dataType: "json",
      success: (resp) => {
        successCb(resp);
      },
      error: (resp) => {
        console.log("Error in CommentApiUtil#createComment");
      }
    });
  },

  fetchComment (id, successCb) {
    $.ajax({
      url: `api/comments/${id}`,
      method: "GET",
      succes: (resp) => {
        successCb(resp);
      },
      error: (resp) => {
        console.log("Error in CommentApiUtil#fetchComment");
      }
    });

  },

  fetchAllComments (successCb) {
    $.ajax({
      url: "api/comments",
      method: "GET",
      success: (resp) => {
        successCb(resp);
      },
      error: (resp) => {
        console.log("Error in CommentApiUtil#fetchAllComments");
      }
    });
  }


};
