const React = require('react');
const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');

var TrackShow = React.createClass({
  getInitialState () {
    let track = TrackStore.find(this.props.params.trackId);
    return { track };
  },

  componentDidMount () {
    this.trackListener = TrackStore.addListener(this.onChange);
    TrackActions.fetchAllTracks();
  },

  onChange () {
    let track = TrackStore.find(this.props.params.trackId);
    this.setState({ track });
  },

  render () {
    let currentTrackTitle;
    let currentTrackDescription;
    let currentTrackUsername;

    if (typeof this.state.track !== 'undefined') {
      currentTrackTitle = this.state.track.title;
      currentTrackDescription = this.state.track.description;
      currentTrackUsername = this.state.track.user.username;
    } else {
      currentTrackTitle = '';
      currentTrackUsername = '';
      currentTrackDescription = '';

    }

    return(
      <div>
        { currentTrackTitle }
        { currentTrackDescription }
        { currentTrackUsername }
      </div>
    );

  }



});



module.exports = TrackShow;
