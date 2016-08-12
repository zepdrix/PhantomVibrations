const React = require('react');
const CommentIndexItem = require('./comment_index_item');
const UserStore = require('../stores/user_store');

var CommentIndex = React.createClass({

  render () {

    let allCommentIndexItems = this.props.comments.map( (comment, key) => {
      return <CommentIndexItem trackDuration={ this.props.trackDuration } key={ key } comment={ comment } />;
    });

    return(
      <div className="comment-index">
        <ul className="comment-index list">{ allCommentIndexItems }</ul>
      </div>

    );
  }

});


module.exports = CommentIndex;
