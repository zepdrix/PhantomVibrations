const React = require('react');
const TrackIndex = require('./track_index');
const TrackStore = require('../stores/track_store');
const TrackActions = require('../actions/track_actions');

var HomePage = React.createClass({
  getInitialState () {
    return { tracks: TrackStore.all() };
  },

  componentDidMount () {
    this.trackListener = TrackStore.addListener(this.onChange);
    TrackActions.fetchAllTracks();
  },

  componentWillUnmount () {
    this.trackListener.remove();
  },

  onChange () {
    this.setState({ tracks: TrackStore.all() });
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
