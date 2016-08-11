const React = require('react');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const Link = require('react-router').Link;

var CommentAvatarIndexItem = React.createClass({
  getInitialState () {
  
    return { comment: '' };
  },

  liveCommentShow () {

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
    let hiddenComment;
    let livePercentage = this.props.percentage;
    let percentage = this.props.comment.track_percentage * this.props.width;
    let userUrl = `/users/${this.props.comment.user_id}`;
    // debugger
    // if (livePercentage < this.props.comment.track_percentage < livePercentage + 0.2) {
    //   this.liveCommentShow();
    // }

    if (this.state.comment) {
      hiddenComment= <div className="hidden-comment"><Link className="username-link" to={ userUrl }>{ this.props.comment.username }</Link>  { this.state.comment }</div>;
    } else if ((livePercentage - 0.01 < this.props.comment.track_percentage && this.props.comment.track_percentage  < livePercentage + 0.01) && this.props.autoShowState) {
      hiddenComment= <div className="hidden-comment"><Link className="username-link" to={ userUrl }>{ this.props.comment.username }</Link>  { this.props.comment.body }</div>;
    }
    //
    //  else if (livePercentage < this.props.comment.track_percentage < livePercentage + 0.2) {
    // } else if (this.props.comment.track_percentage  < livePercentage) {
    //
    //   this.setState({ comment: '' });
    // }

    return(
      <div onMouseLeave={ this.commentHide }>
        <img
          onMouseEnter={ this.commentShow }
          style={{transform: 'translateX(' + percentage + 'px)'}}
          className="comment-avatar-image"
          src={ this.props.comment.avatar_image_url }/>

        <div
          style={{transform: 'translateX(' + percentage + 'px)'}}
          className="comment-avatar-comment">

          { hiddenComment }
        </div>
      </div>
    );
  }

});


module.exports = CommentAvatarIndexItem;
