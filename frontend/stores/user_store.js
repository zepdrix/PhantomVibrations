const Store = require('flux/utils').Store;

const AppDispatcher = require('../dispatcher/dispatcher.js'),
      UserConstants = require('../constants/user_constants.js');

const TrackStore = new Store(AppDispatcher);

const
