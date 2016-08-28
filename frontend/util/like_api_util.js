

module.exports = {
  createLike (track_id, successCb) {
    $.ajax({
      url: 'api/likes',
      method: 'POST',
      data: { like: { track_id: track_id }},
      dataType: 'json',
      success: (resp) => {
        successCb(resp);
      },
      error: (xhr) => {
        console.log("Error in LikeApiUtil#createLike");
      }

    });
  },

  deleteLike (track_id, successCb) {
    $.ajax({
      url: `api/likes`,
      method: 'DELETE',
      data: { like: { track_id: track_id }},
      dataType: 'json',
      success: (resp) => {
        successCb(resp);
      },
      error: (xhr) => {
        console.log("Error in LikeApiUtil#deleteLike");
      }
    });
  }



};
