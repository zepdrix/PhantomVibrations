const Store = require('flux/utils').Store;

const AppDispatcher = require('../dispatcher/dispatcher'),
      CommentConstants = require('../constants/comment_constants');

const CommentStore = new Store(AppDispatcher);

var _comments = {};

CommentStore.all = function () {
  let comments = [];

  Object.keys(_comments).forEach( (commentId) => {
    comments.push(_comments[commentId]);
  });
};

CommentStore.find = function (commentId) {
  return _comments[commentId];
};

const _resetComment = function (comment) {
  _comments[comment.id] = comment;
};

const _resetAllComments = function (comments) {
  _comments = {};
  comments.forEach( (comment) => {
    _comments[comment.id] = comment;
  });
};

CommentStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case CommentConstants.RECEIVE_COMMENT:
      _resetComment(payload.comment);
      this.__emitChange();
      break;
    case CommentConstants.RECEIVE_COMMENTS:
      _resetAllComments(payload.comments);
      this.__emitChange();
      break;
  }
};

module.exports = CommentStore;
