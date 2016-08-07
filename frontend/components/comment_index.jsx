const React = require('react');
const CommentIndexItem = require('./comment_index_item.jsx');
const UserStore = require('../stores/user_store.js');

var CommentIndex = React.createClass({

  render () {

    let allCommentIndexItems = this.props.comments.map( (comment, key) => {
      return <CommentIndexItem key={ key } comment={ comment } user={ UserStore.find(comment.user_id) } />;
    });

    return(
      <div className="comment-index">
        <ul className="comment-index list">{ allCommentIndexItems }</ul>
      </div>

    );
  }

});


module.exports = CommentIndex;
