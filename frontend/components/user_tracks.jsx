const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const TrackStore = require('../stores/track_store');
const TrackActions = require('../actions/track_actions');
const UserTrackIndex = require('./user_track_index');

var UserTracks = React.createClass({

  getInitialState () {
    return {
      currentUser: SessionStore.currentUser(),
      userTracks: TrackStore.all()};
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.onSessionChange);
    this.trackListener = TrackStore.addListener(this.onTrackChange);
    TrackActions.fetchUserTracks(this.state.currentUser.id);
    // TrackActions.fetchAllTracks();
    SessionActions.fetchCurrentUser();
  },

  componentWillUnmount () {
    this.sessionListener.remove();
    this.trackListener.remove();
  },

  onTrackChange () {
    this.setState({ userTracks: TrackStore.all() });
  },

  onSessionChange () {
    this.setState({ currentUser: SessionStore.currentUser() });
  },

  render () {
    return(
      <div className="usertracks group">
        <UserTrackIndex tracks={ this.state.userTracks }/>
      </div>
    );
  }
});


module.exports = UserTracks;
