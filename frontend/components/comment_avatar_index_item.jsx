const React = require('react');
const UserStore = require('../stores/user_store');
const UserActions = require('../actions/user_actions');
const Link = require('react-router').Link;

var CommentAvatarIndexItem = React.createClass({
  getInitialState () {
    return { comment: '' };
  },

  commentShow (e) {
    e.preventDefault();
    this.setState({ comment: this.props.comment.body });
  },

  commentHide (e) {
    e.preventDefault();
    this.setState({ comment: null });
  },

  shortenedComment (comment) {
    let shortenedComment = comment;
    if (comment.length > 30) {
      shortenedComment = comment.slice(0, 30) + "...";
    }
    return shortenedComment;
  },

  render () {
    let hiddenComment;
    let livePercentage = this.props.percentage;
    let percentage = this.props.comment.track_percentage * this.props.width;
    let userUrl = `/users/${this.props.comment.user_id}`;
    let space = ' ';
    if (this.state.comment) {
      hiddenComment = <div className="hidden-comment">

                        <Link className="username-link" to={ userUrl }>
                          { this.props.comment.username + space}
                        </Link>

                        { this.shortenedComment(this.state.comment) }

                      </div>;
    } else if ((livePercentage < this.props.comment.track_percentage && this.props.comment.track_percentage  < livePercentage + 0.01) &&
                this.props.autoShowState && (this.props.comment.id === this.props.currentCommentId)) {
      hiddenComment = <div className="hidden-comment">
                        <Link className="username-link" to={ userUrl }>
                          { this.props.comment.username + space}
                        </Link>

                        { this.shortenedComment(this.props.comment.body) }

                      </div>;
    }



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
