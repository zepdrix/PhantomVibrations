const React = require('react');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const Link = require('react-router').Link;

var CommentAvatarIndexItem = React.createClass({
  getInitialState (e) {
    return { comment: '' };
  },

  componentWillMount () {
    UserActions.fetchAllUsers();
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
    let percentage = this.props.comment.track_percentage * 480;
    console.log(UserStore.all());
    let userUrl = `/users/${this.props.comment.user_id}`;
    if (this.state.comment) {
      hiddenComment= <div className="hidden-comment"><Link className="username-link" to={ userUrl }>{ this.props.user.username }</Link>  { this.state.comment }</div>;
    }
    return(
      <div onMouseLeave={ this.commentHide }>
        <img
          onMouseEnter={ this.commentShow }
          style={{transform: 'translateX(' + percentage + 'px)'}}
          className="comment-avatar-image"
          src={ this.props.user ? this.props.user.avatar_image_url : ""}/>

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
