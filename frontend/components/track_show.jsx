const React = require('react');
const ReactDOM = require('react-dom');
const Link = require('react-router').Link;
const TrackStore = require('../stores/track_store');
const TrackActions = require('../actions/track_actions');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const UserActions = require('../actions/user_actions');
const CSSHelper = require('../helpers/css');
const TrackChange = require('../helpers/track_change');
const Wavesurfer = require('react-wavesurfer').default;

const CommentForm = require('./comment_form');
const CommentIndex = require('./comment_index');
const CommentAvatarIndex = require('./comment_avatar_index');
const WindowSizeConstants = require('../constants/window_size_constants');

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

  componentWillReceiveProps () {
    let trackId = parseInt(this.props.params.trackId);
    
    TrackActions.fetchTrack(trackId);
    this.setState({ track: TrackStore.find(trackId) });
  },

  setNewPercentage (clickPercentage) {
    if (clickPercentage) {
      TrackActions.seekNewPercentage(clickPercentage);
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
        this.setRefreshIntervalId = setInterval(this.setNewPercentage, 25);
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

  // <div className="track-show playnode-played" style={{width: (this.state.percentage * WindowSizeConstants.TRACK_SHOW_WIDTH ) + 'px'}}></div>
  render () {

    let rbg2 = [this.state.rbg1[1], this.state.rbg1[2], this.state.rbg1[0]];
    let iconClass;
    let currentTrack = TrackStore.currentTrack();
    let liveTrack = TrackStore.find(parseInt(this.props.params.trackId));



    const waveOptions = {
      progressColor: '#ED980E',
      waveColor: '#c4c8dc',
      normalize: true,
      barWidth: 4,
      cursorColor: 'lightgrey',
      height: 200
    };

    if (!currentTrack.paused && currentTrack.dataset.id == this.props.params.trackId) {
      iconClass = "pause-icon-big";
    } else {
      iconClass = "play-icon-big";
    }

    if (this.state.track) {

    //   let waveform;
    //   let potentialWaveform = TrackStore.getWaveform(this.props.params.trackId);
    //   if (potentialWaveform) {
    //     waveform = potentialWaveform;
    //   } else {
    //     let trackPercentage = TrackStore.getPlaybackPercentage(this.props.params.trackId);
    //
    //     waveform = <Wavesurfer
    //                  audioFile={this.state.track.audio_url}
    //                  pos={ this.state.percentage * trackDuration }
    //                  options={ waveOptions }
    //                />;
    //              TrackStore.setWaveform(this.props.params.trackId, waveform);
    //   }


      let trackDuration = TrackStore.getTrackDuration(this.props.params.trackId);
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
              <Wavesurfer
                audioFile={this.state.track.audio_url}
                pos={ this.state.percentage * trackDuration }
                options={ waveOptions }
              />


            </div>

            <div className="track-show-avatar-comments-container">
              <CommentAvatarIndex  width={ WindowSizeConstants.TRACK_SHOW_WIDTH } comments={ liveTrack.comments || currentTrack.comments } trackId={ this.state.track.id } percentage={ this.state.percentage } />
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
              <CommentIndex trackDuration={ trackDuration } comments={ liveTrack.comments}/>
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
