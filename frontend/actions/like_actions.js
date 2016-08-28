const LikeApiUtil = require('../util/like_api_util');
const LikeConstants = require('../constants/like_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {

  createLike (track_id) {
    LikeApiUtil.createLike(
      track_id,
      this.receiveLike
    );
  },

  deleteLike (track_id) {
    LikeApiUtil.deleteLike(
      track_id,
      this.removeLike
    );
  },

  receiveLike (like) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.RECEIVE_LIKE,
      like: like
    });
  },

  removeLike (like) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.REMOVE_LIKE,
      like: like
    });
  },
};
