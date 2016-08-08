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

    setInterval( () => { this.setState({ currentTime: this.state.currentTrack.currentTime }); } , 100);
    this.state.currentTrack.play();
  },

  handlePause (e) {
    e.preventDefault();
    // TrackChange.pauseTrack(e);
    this.state.currentTrack.pause();
  },

  render () {

    if (TrackStore.isCurrentTrack()) {
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
          <div className="playnode-container">
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


    // <div className="playnode-remaining" style={{width: 'translateX(' + percentage + 'px)'}}>0</div>

  }

});

module.exports = PlayBar;
