const CommentApiUtil = require('../util/comment_api_util.js');
const CommentConstants = require('../constants/comment_constants.js');
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ErrorStore = require('../stores/error_store.js');

module.exports = {
  createComment (comment) {
    CommentApiUtil.createComment(
      comment,
      this.receiveComment
    );
  },

  fetchAllComments () {
    CommentApiUtil.fetchAllComments(
      this.receiveComments
    );
  },

  receiveComment (comment) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_COMMENT,
      comment: comment
    });
  },

  receiveComments (comments) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_COMMENTS,
      comments: comments
    });
  },


};
