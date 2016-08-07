const React = require('react');

var CommentIndexItem = React.createClass({
  render () {
    
    return(
      <li>
        <div>
          {this.props.comment.body}
        </div>
      </li>
    );
  }

});


module.exports = CommentIndexItem;
