module.exports = {

  fetchUser (id, successCb) {
    $.ajax({
      url: `api/users/${id}`,
      method: "GET",
      success: (resp) => {
        successCb(resp);
      },
      error: () => {
        console.log("Error in UserApiUtil#fetchUser");
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
      error: () => {
        console.log("Error in UserApiUtil#fetchAllUsers");
      }
    });
  }

};
