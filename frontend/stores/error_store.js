const Store = require('flux/utils').Store;


const AppDispatcher = require('../dispatcher/dispatcher'),
      ErrorConstants = require('../constants/error_constants');

var ErrorStore = new Store(AppDispatcher);

var _errors = [];
var _form = '';

const _setErrors = function (form, jsonErrors, textErrors) {
  _form = form;
  _errors = [];

  if (jsonErrors) {
    _errors = jsonErrors;
  }

  if (textErrors) {
    _errors.push(textErrors);
  }
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
