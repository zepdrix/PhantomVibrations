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

  determineCommentId () {
    let commentIdx = 0;
    while (this.props.percentage > this.props.comments[commentIdx].track_percentage) {
      if (this.props.comments[commentIdx + 1]) {
        commentIdx += 1;
      } else {
        break;
      }
    }
    return this.props.comments[commentIdx].id;
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
                currentCommentId={ this.determineCommentId() }
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
