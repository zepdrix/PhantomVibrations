const React = require('react');
const Link = require('react-router').Link;
const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const CSSHelper = require('../helpers/css.js');
const TrackChange = require('../helpers/track_change.js');

var TrackShow = React.createClass({
  getInitialState () {
    let track = TrackStore.find(this.props.params.trackId);
    let currentUser = SessionStore.currentUser();
    return { track, currentUser };
  },

  componentDidMount () {
    this.trackListener = TrackStore.addListener(this.onChange);
    this.sessionListener = SessionStore.addListener(this.onChange);
    TrackActions.fetchAllTracks();
    SessionActions.fetchCurrentUser();
  },

  componentWillUnmount () {
    this.trackListener.remove();
    this.sessionListener.remove();
  },

  onClick (e) {
    TrackChange.playTrack(e);
  },

  onChange () {
    let track = TrackStore.find(this.props.params.trackId);
    let currentUser = SessionStore.currentUser();
    this.setState({ track, currentUser });
  },

  render () {
    let rbg1 = CSSHelper.styleHelper();
    let rbg2 = [rbg1[1], rbg1[2], rbg1[0]];


    if (this.state.track) {
      let userUrl = `/users/${this.state.track.user_id}`;
      return(
        <div className="track-show">
          <div className="track-show banner-area" style={{background: '-webkit-linear-gradient(135deg, rgba('+(rbg1[0])+', '+(rbg1[1])+', '+(rbg1[2])+', 0.5) 1%, rgba('+rbg2[0]+', '+(0)+', '+rbg2[2]+', 0.7) 100%)'}}>
            <div className="track-show top-left">
              <div className="play-icon" id={ this.state.track.id } onClick={ this.onClick }>
              </div>
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
          </div>

          <div className="track-show comment-area">

            <div className="track-show currentuser">
              { this.state.currentUser.username }
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
