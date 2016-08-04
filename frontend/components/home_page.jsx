const React = require('react');
const TrackIndex = require('./track_index.jsx');
const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');

var HomePage = React.createClass({
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
    return(
      <div className="user-page section">
        <div className="user-page-header">
          <h2>Discover New Vibes</h2>
        </div>
        <br/>
        <TrackIndex tracks={ this.state.tracks }/>
      </div>
    );
  }

});


module.exports = HomePage;
