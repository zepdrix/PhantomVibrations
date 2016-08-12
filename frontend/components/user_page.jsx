const React = require('react');
const SessionStore = require('../stores/session_store');
const TrackIndex = require('./track_index');
const TrackStore = require('../stores/track_store');
const TrackActions = require('../actions/track_actions');
const UserActions = require('../actions/user_actions');

var UserPage = React.createClass({
  getInitialState () {
    return { tracks: TrackStore.all() };
  },

  componentDidMount () {
    this.storeListener = TrackStore.addListener(this.onChange);
    TrackActions.fetchAllTracks();
  },

  componentWillUnmount () {
    this.storeListener.remove();
  },

  onChange () {
    this.setState({ tracks: TrackStore.all() });
  },

  render () {
    return(
      <div className="user-page section">
        <div className="user-page-header">
          <h2>Welcome, { SessionStore.currentUser().username }! Discover New Vibrations</h2>
        </div>
        <br/>
        <TrackIndex tracks={ this.state.tracks }/>
      </div>
    );
  }
});

module.exports = UserPage;
