const React = require('react');
const Link = require('react-router').Link;
const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const UserActions = require('../actions/user_actions.js');
const CSSHelper = require('../helpers/css.js');
const TrackChange = require('../helpers/track_change.js');
const CommentForm = require('./comment_form.jsx');
const CommentIndex = require('./comment_index.jsx');
const CommentAvatarIndex = require('./comment_avatar_index.jsx');
const WindowSizeConstants = require('../constants/window_size_constants.js');

var TrackShow = React.createClass({
  getInitialState () {
    let track = TrackStore.find(parseInt(this.props.params.trackId));
    let currentUser = SessionStore.currentUser();
    let rbg1 = CSSHelper.styleHelper();
    let percentage = TrackStore.getPlaybackPercentage(parseInt(this.props.params.trackId));

    let currentTrack = TrackStore.currentTrack();

    let playing = false;
    if (!currentTrack.paused && currentTrack.dataset.id == this.props.params.trackId) {
      playing = true;
    }
    return { track: track, currentUser: currentUser, rbg1: rbg1, playing: playing, percentage: percentage };
  },

  componentDidMount () {
    this.trackListener = TrackStore.addListener(this.renderPlaybar);
    this.sessionListener = SessionStore.addListener(this.onChangeSession);
    TrackActions.fetchTrack(parseInt(this.props.params.trackId));
    SessionActions.fetchCurrentUser();
    this.renderPlaybar();

  },

  componentWillUnmount () {
    this.trackListener.remove();
    this.sessionListener.remove();
    clearInterval(this.setRefreshIntervalId);
  },

  onChangeSession () {
    let currentUser = SessionStore.currentUser();
    this.setState({ currentUser });
  },

  setNewPercentage (clickPercentage) {
    if (clickPercentage) {
      TrackActions.seekNewPercentage(clickPercentage);
      // this.setState({ percentage: clickPercentage });
    } else {
      let newPercentage = TrackStore.getPlaybackPercentage(this.props.params.trackId);
      this.setState({ percentage: newPercentage });
    }
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
  renderPlaybar () {
    let currentTrack = TrackStore.currentTrack();

    if (!this.state.track) {
      let playing = false;
      if (!currentTrack.paused && currentTrack.dataset.id == this.props.params.trackId) {
        playing = true;
      }
      this.setState({track: TrackStore.find(parseInt(this.props.params.trackId)), playing: playing});
    } else {

      if (currentTrack.dataset.id == this.props.params.trackId && this.state.playing) {
        clearInterval(this.setRefreshIntervalId);
        this.setRefreshIntervalId = setInterval(this.setNewPercentage, 50);
        this.setState({ playing: true });
      } else {
        if (this.setRefreshIntervalId) {
          clearInterval(this.setRefreshIntervalId);
        }
        this.setNewPercentage();
      }
    }

  },

  onClick (e) {
    e.preventDefault();

    this.setState({ playing: !this.state.playing}, () => {
      TrackChange.playTrack(parseInt(this.props.params.trackId));
    });
  },

  render () {
    console.log('track-show rerender');
    let rbg2 = [this.state.rbg1[1], this.state.rbg1[2], this.state.rbg1[0]];
    let iconClass;
    let currentTrack = TrackStore.currentTrack();
    let liveTrack = TrackStore.find(parseInt(this.props.params.trackId));


    if (!currentTrack.paused && currentTrack.dataset.id == this.props.params.trackId) {
      iconClass = "pause-icon-big";
    } else {
      iconClass = "play-icon-big";
    }

    if (this.state.track) {
      let userUrl = `/users/${this.state.track.user_id}`;
      return(
        <div className="track-show-main">
          <div className="track-show banner-area" style={{background: '-webkit-linear-gradient(135deg, rgba('+(this.state.rbg1[0])+', '+(this.state.rbg1[1])+', '+(this.state.rbg1[2])+', 0.5) 1%, rgba('+rbg2[0]+', '+(0)+', '+rbg2[2]+', 0.7) 100%)'}}>
            <div className="track-show top-left">
              <div className={ iconClass } id={ this.state.track.id } onClick={ this.onClick }/>


              <div className="user-area">
                <div className="username">
                  <Link to={ userUrl }>{ this.state.track.user.username }</Link>
                </div>

                <br/>

                <div className="track-title">
                  { this.state.track.title}
                </div>

              </div>

              <div>
                <audio id={ this.state.track.id }>
                  <source src={ this.state.track.audio_url } type="audio/ogg"/>
                </audio>
              </div>

            </div>

            <div>
              <img className="track-image" src={ this.state.track.image_url }/>
            </div>
            <div className="track-show playnode-container" id={ this.props.params.trackId } onClick={ this.resetPercentage } >
              <div className="track-show playnode-played" style={{width: (this.state.percentage * WindowSizeConstants.TRACK_SHOW_WIDTH ) + 'px'}}></div>
            </div>

            <div className="track-show-avatar-comments-container">
              <CommentAvatarIndex  width={ WindowSizeConstants.TRACK_SHOW_WIDTH } comments={ liveTrack.comments } trackId={ this.state.track.id } percentage={ this.state.percentage } />
            </div>
          </div>


          <div className="track-show comment-area">
            <div className="comment-container">
              <img className="comment-form-image" src={ this.state.currentUser.avatar_image_url }/>
              <div className="comment-form">
                <CommentForm track={ this.state.track }/>
              </div>

              <div className="comment-user-area">
                <img src={ this.state.track.user.avatar_image_url }/>
                <br/>
                <div className="comment-username">{ this.state.track.user.username }</div>
              </div>
            </div>


            <div className="description">
              { this.state.track.description }
            </div>

            <div className="comment-index">
              <CommentIndex  comments={ this.state.track.comments}/>
            </div>
          </div>
        </div>
      );
    } else {
      return(
        <div>

        </div>
      );
    }
  }
});



module.exports = TrackShow;
