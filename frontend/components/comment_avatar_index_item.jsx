const React = require('react');
const Link = require('react-router').Link;

var CommentAvatarIndexItem = React.createClass({
  getInitialState (e) {
    return { comment: null };
  },

  commentShow (e) {
    e.preventDefault();
    this.setState({ comment: this.props.comment.body });
  },

  commentHide (e) {
    e.preventDefault();
    this.setState({ comment: null });

  },

  render () {
    debugger
    let percentage = this.props.comment.track_percentage * 480;
    let userUrl = `/users/${this.props.user.id}`;
    let commentDiv;
    if (this.state.comment) {
      commentDiv = <div><Link to={ userUrl }>{ this.props.user.username }</Link>: {this.state.comment}</div>;
    }
    return(
      <div onMouseLeave={ this.commentHide }>
        <img onMouseEnter={ this.commentShow }  style={{transform: 'translateX(' + percentage + 'px)'}} className="comment-avatar-image" src={ this.props.user.avatar_image_url }/>
        <div style={{transform: 'translateX(' + percentage + 'px)'}} className="comment-avatar-comment">
          { commentDiv }
        </div>
      </div>
    );
  }

});


module.exports = CommentAvatarIndexItem;
