const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const LikeActions = require('../actions/like_actions');
const TrackActions = require('../actions/track_actions');
const TrackStore = require('../stores/track_store');

var TrackLikeButton = React.createClass({
  getInitialState () {
    let numLikes;
    numLikes = 0;
    return { numLikes: this.props.track.likes.length, track: this.props.track };
  },

  componentDidMount () {
    this.trackListener = TrackStore.addListener(this.onLikeChange);
  },

  componentWillUnmount () {
    this.trackListener.remove();
  },

  onLikeChange () {
    this.setState({ numLikes: TrackStore.find(this.props.track.id).likes.length });
  },

  toggleLike () {
    let thisTrack = TrackStore.find(this.props.track.id);
    if (thisTrack.likes.indexOf(SessionStore.currentUser().id) >= 0) {
      LikeActions.deleteLike(parseInt(this.props.track.id));
    } else {
      LikeActions.createLike(parseInt(this.props.track.id));
    }
    TrackActions.fetchTrack(parseInt(this.props.track.id));
  },

  onClick (e) {
    e.preventDefault();
    if (SessionStore.isUserLoggedIn()) {
      this.toggleLike();
    }
  },


  render () {


    let likeClass;
    let likeIcon;

    if (SessionStore.isUserLoggedIn()) {

    }

    return(
      <button onClick={ this.onClick }>


        <div>
          { this.state.numLikes }
        </div>

      </button>

    );



  }


});




module.exports = TrackLikeButton;
