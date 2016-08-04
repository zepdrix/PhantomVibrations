const Store = require('flux/utils').Store;


const AppDispatcher = require('../dispatcher/dispatcher.js'),
      ErrorConstants = require('../constants/error_constants.js');

var ErrorStore = new Store(AppDispatcher);

var _errors = [];
var _form = '';

const _setErrors = function (form, errors) {
  _form = form;
  _errors = errors;
};

const _clearErrors = function () {
  _form = '';
  _errors = [];
};

ErrorStore.errors = function (form) {
  if (form === _form) {
    return _errors.slice();
  }
};

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      _setErrors(payload.form, payload.errors);
      this.__emitChange();
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _clearErrors();
      this.__emitChange();
      break;

  }
};

module.exports = ErrorStore;
