const SessionApiUtil = require('../util/session_api_util.js');
const ErrorConstants = require('../constants/error_constants.js');
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ErrorStore = require('../stores/error_store.js');

module.exports = {
  setErrors (form, errors) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      form: form,
      errors: errors
    });
  },

  clearErrors () {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS
    });
  }
};
