const React = require('react');
const TrackStore = require('../stores/track_store.js');
const TrackChange = require('../helpers/track_change.js');
const TrackActions = require('../actions/track_actions.js');

var PlayBar = React.createClass({
  getInitialState () {
    return {
      currentTrack: TrackStore.currentTrack(),
      currentTime: 0 };
  },

  componentDidMount () {
    this.trackListener = TrackStore.addListener(this.onTrackChange);
  },

  onTrackChange () {
    this.setState({ currentTrack: TrackStore.currentTrack() });
    this.refreshIntervalId = setInterval( () => { this.setState({ currentTime: this.state.currentTrack.currentTime }); } , 100);

  },

  handlePlay (e) {
    e.preventDefault();
    clearInterval(this.refreshIntervalId);
    this.refreshIntervalId = setInterval( () => { this.setState({ currentTime: this.state.currentTrack.currentTime }); } , 100);
    TrackActions.playCurrentTrack();

    // this.state.currentTrack.play();
  },

  resetPercentage (e) {
    e.preventDefault();
    let clickPercentage = (e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;
    TrackActions.seekNewPercentage(clickPercentage);
  },

  handlePause (e) {
    e.preventDefault();
    // TrackChange.pauseTrack(e);
    TrackActions.pauseCurrentTrack();
  },

  render () {
    if (this.state.currentTrack.dataset.id !== "no-track") {
      var percentage = 0;
      // this.state.currentTrack.play();

      if (this.state.currentTrack) {
        let barWidth = window.innerWidth < 900 ? 900 : window.innerWidth;
        percentage = (this.state.currentTrack.currentTime / this.state.currentTrack.duration) * barWidth;
      } else {

        percentage = 0;
      }

      return(
        <div className="playbar with-song">
          <div className="words">
          { this.state.currentTrack.title }
          <div className="play" onClick={ this.handlePlay }>
            Play
          </div>

          <div className="pause" onClick={ this.handlePause }>
            Pause
          </div>
          </div>
          <div className="playnode-container" onClick={ this.resetPercentage }>
            <div className="playnode-played" style={{width: percentage + 'px'}}></div>
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
