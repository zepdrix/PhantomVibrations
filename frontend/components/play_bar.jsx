const React = require('react');
const TrackStore = require('../stores/track_store.js');


var PlayBar = React.createClass({
  getInitialState () {
    return { currentTrack: TrackStore.currentTrack() };
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
  },

  handlePause (e) {
    e.preventDefault();
    this.state.currentTrack.pause();
  },

  render () {

    if (TrackStore.isCurrentTrack()) {
      debugger
      // this.state.currentTrack.play();
      return(
        <div className="playbar with song">
          { this.state.currentTrack.title }
          <div onClick={ this.handlePlay }>
            Play
          </div>

          <div onClick={ this.handlePause }>
            Pause
          </div>
        </div>
      );
    } else {
      return(
        <div className="playbar no song">
          No Track!safdsadasdfadgadgsdag
        </div>
      );
    }



  }

});

module.exports = PlayBar;
