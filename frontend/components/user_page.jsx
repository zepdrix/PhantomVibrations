const React = require('react');
const TrackIndex = require('./track_index.jsx');
const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');
const UserActions = require('../actions/user_actions.js');

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
          <h2>Discover New Vibrations</h2>
        </div>
        <br/>
        <TrackIndex tracks={ this.state.tracks }/>
      </div>
    );
  }
});

module.exports = UserPage;
