const SessionApiUtil = require('../util/session_api_util');
const ErrorConstants = require('../constants/error_constants');
const AppDispatcher = require('../dispatcher/dispatcher');
const ErrorStore = require('../stores/error_store');

module.exports = {
  setErrors (form, errors, spinner) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      form: form,
      errors: errors,
      spinner: spinner
    });
  },

  clearErrors () {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS
    });
  }
};
