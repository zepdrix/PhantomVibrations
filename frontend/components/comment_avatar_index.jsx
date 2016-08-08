const React = require('react');
const CommentAvatarIndexItem = require('./comment_avatar_index_item.jsx');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');

var CommentAvatarIndex = React.createClass({

  render () {
    UserActions.fetchAllUsers();

    let allCommentAvatarIndexItems = this.props.comments.map( (comment, key) => {
      return <CommentAvatarIndexItem key={ key } comment={ comment } user={ UserStore.find(comment.user_id) } />;
    });
    return(
      <div className="comment-avatar-index">
        { allCommentAvatarIndexItems }
      </div>

    );

  }


});


module.exports = CommentAvatarIndex;
