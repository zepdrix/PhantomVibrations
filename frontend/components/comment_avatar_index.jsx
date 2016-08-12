const React = require('react');
const CommentAvatarIndexItem = require('./comment_avatar_index_item');
const TrackStore = require('../stores/track_store');
const UserStore = require('../stores/user_store');
const UserActions = require('../actions/user_actions');

var CommentAvatarIndex = React.createClass({


  componentDidMount () {
    if (this.props.playing) {
      this.autoShowState = true;
    } else {
      this.autoShowState = false;
    }
  },

  stopAutoShow (e) {
    e.preventDefault();
    this.autoShowState = false;
  },

  startAutoShow (e) {
    e.preventDefault();
    this.autoShowState = true;
  },

  render () {
    let allCommentAvatarIndexItems = this.props.comments.map( (comment, key) => {
      return <CommentAvatarIndexItem
                key={ key }
                comment={ comment }
                user={ UserStore.find(comment.user_id) }
                width={ this.props.width }
                trackId={ this.props.trackId }
                percentage={ this.props.percentage }
                autoShowState= {this.autoShowState }/>;
    });
    return(
      <div className="comment-avatar-index" onMouseEnter={ this.stopAutoShow } onMouseLeave={ this.startAutoShow }>
        { allCommentAvatarIndexItems }
      </div>
    );
  }
});


module.exports = CommentAvatarIndex;
