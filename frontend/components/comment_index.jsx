const React = require('react');
const CommentIndexItem = require('./comment_index_item.jsx');

var CommentIndex = React.createClass({

  render () {
    debugger
    let allCommentIndexItems = this.props.comments.map( (comment, key) => {
      return <CommentIndexItem key={ key } comment={ comment }/>;
    });

    return(
      <div className="comment-index">
        <ul className="comment-index list">{ allCommentIndexItems }</ul>
      </div>

    );
  }

});


module.exports = CommentIndex;
