module.exports = {
  createUser (user, success, errorCb) {
    $.ajax({
      url: "api/users",
      method: "POST",
      data: { user: user },
      dataType: "json",
      success,
      error(xhr) {
        const errors = xhr.responseJSON;
        errorCb("createUser", errors);
      }
    });
  },

  fetchCurrentUser (success, error) {
    $.ajax({
      url: "api/session",
      method: "GET",
      success,
      error
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
        const errors = xhr.responseJSON;
        errorCb("login form", errors);
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
