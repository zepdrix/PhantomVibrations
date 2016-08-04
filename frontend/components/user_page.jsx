const React = require('react');
const TrackIndex = require('./track_index.jsx');
const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');

var UserPage = React.createClass({
  getInitialState () {
    return { tracks: TrackStore.all() };
  },

  componentDidMount () {
    this.storeListener = TrackStore.addListener(this.onChange);
    TrackActions.fetchAllTracks();
  },

  onChange () {
    this.setState({ tracks: TrackStore.all() });
  },

  componentWillUnmount () {
    this.storeListener.remove();
  },

  render () {
    console.log(TrackStore.all());

    return(
      <div className="user-page section">User Page
        <TrackIndex tracks={ this.state.tracks }/>
      </div>
    );
  }
});


module.exports = UserPage;
