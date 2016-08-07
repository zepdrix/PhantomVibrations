const React = require('react');
const TrackStore = require('../stores/track_store.js');
const TrackChange = require('../helpers/track_change.js');

var PlayBar = React.createClass({
  getInitialState () {
    return {
      currentTrack: TrackStore.currentTrack(),
      currentTime: 0 };
  },

  componentDidMount () {
    this.trackListener = TrackStore.addListener(this.onChange);
  },

  onChange () {
    this.setState({ currentTrack: TrackStore.currentTrack() });
  },

  handlePlay (e) {
    e.preventDefault();
    this.state.currentTrack.play();
    setInterval( () => { this.setState({ currentTime: this.state.currentTrack.currentTime }); } , 30);
  },

  handlePause (e) {
    e.preventDefault();
    // TrackChange.pauseTrack(e);
    this.state.currentTrack.pause();
  },

  render () {

    if (TrackStore.isCurrentTrack()) {
      // this.state.currentTrack.play();
      return(
        <div className="playbar with-song">
          { this.state.currentTrack.title }
          <div className="play" onClick={ this.handlePlay }>
            Play
          </div>

          <div className="pause" onClick={ this.handlePause }>
            Pause
          </div>

          <div>
            { TrackStore.currentTime() }
          </div>
        </div>
      );
    } else {
      return(
        <div className="playbar no-song">
        </div>
      );
    }



  }

});

module.exports = PlayBar;
