const React = require('react');
const Link = require('react-router').Link;
const TrackActions = require('../actions/track_actions.js');
const TrackStore = require('../stores/track_store.js');
const TrackChange = require('../helpers/track_change.js');
const SessionStore = require('../stores/session_store.js');
const WindowSizeConstants = require('../constants/window_size_constants.js');
const CommentAvatarIndex = require('./comment_avatar_index.jsx');
const CommentForm = require('./comment_form.jsx');



var TrackIndexItem = React.createClass({
  getInitialState () {
    let percentage = TrackStore.getPlaybackPercentage(this.props.track.id);
    let currentTrack = TrackStore.currentTrack();
    let playing = false;
    if (!currentTrack.paused && currentTrack.dataset.id == this.props.track.id) {
      playing = true;
    }

    return { percentage: percentage, playing: playing };
  },

  componentDidMount () {
    this.currentTrackListener = TrackStore.addListener(this.renderPlaybar);
    TrackActions.fetchTrack(this.props.track.id);
    this.renderPlaybar();
  },

  componentWillUnmount () {
    this.currentTrackListener.remove();
    if (this.setRefreshIntervalId) {
      clearInterval(this.setRefreshIntervalId);
    }
  },

  setNewPercentage (clickPercentage) {
    if (clickPercentage) {
      TrackActions.seekNewPercentage(clickPercentage);
      // this.setState({ percentage: clickPercentage });
    } else {
      let newPercentage = TrackStore.getPlaybackPercentage(this.props.track.id);
      this.setState({ percentage: newPercentage });
    }
  },

  renderPlaybar () {
    let currentTrack = TrackStore.currentTrack();
    debugger
    if (currentTrack.dataset.id == this.props.track.id && this.state.playing) {
      clearInterval(this.setRefreshIntervalId);
      this.setRefreshIntervalId = setInterval(this.setNewPercentage, 30);

    } else {
      if (this.setRefreshIntervalId) {
        clearInterval(this.setRefreshIntervalId);
      }
      this.setState({ playing: false });
      this.setNewPercentage();
    }
  },

  clickHandler (e) {
    this.context.router.push(`/tracks/${this.props.track.id}`);
  },

  onClick (e) {
    e.preventDefault();
    this.setState({ playing: !this.state.playing}, () => {
      TrackChange.playTrack(this.props.track.id);
    });
  },

  resetPercentage (e) {
    e.preventDefault();
    if (this.state.playing) {
      let clickPercentage = (e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;
      this.setNewPercentage(clickPercentage);
    } else {
      this.onClick(e);
    }
  },

  render () {
    let iconClass;

    if (this.state.playing) {
      iconClass = "pause-icon-small";
    } else {
      iconClass = "play-icon";
    }
    let trackUrl = `/tracks/${this.props.track.id}`;
    let trackImageUrl = this.props.track.image_url;
    let userUrl = `/users/${this.props.track.user_id}`;
    let userImageUrl = this.props.track.user.image_url;

    return(
      <li className="track-item" >
        <div >
          <div className="track-avatar-img" >
            <Link to={ trackUrl } className="track-avatar-img">
              <img className="track-avatar-img" src={ trackImageUrl } height="160" width="160"/>
              </Link>
          </div>

          <div className={ iconClass } id={ this.props.track.id } onClick={ this.onClick }/>

          <div className="track-user-info">
            <Link
              to={ userUrl }
              className="track-item track-username">
              { this.props.track.user.username }
            </Link>

            <br/>

            <Link
              to={ trackUrl }
              className="track-item track-title">
              { this.props.track.title }
            </Link>
          </div>

          <div className="track-list playnode-container" id={ this.props.track.id } onClick={ this.resetPercentage } >
            <div className="track-list playnode-played" style={{width: (this.state.percentage * 420) + 'px'}}></div>
          </div>

          <div className="track-index-avatar-comments-container">
            <CommentAvatarIndex  width={ WindowSizeConstants.TRACK_INDEX_WIDTH } comments={ this.props.track.comments}/>
          </div>


          <div className="comment-form">
            <CommentForm track={ this.props.track }/>
          </div>

          <div className="track-audio-el">
            <div id={ this.props.track.id } className="track-id">
              <div id={ this.props.track.audio_url } className="audio/ogg"/>
            </div>
          </div>

        </div>
      </li>
    );

  }


});


module.exports = TrackIndexItem;
