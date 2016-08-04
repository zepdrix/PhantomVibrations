const React = require('react');
const TrackIndexItem = require('./track_index_item.jsx');

var TrackIndex = React.createClass({
  render () {

    let allTrackIndexItems = this.props.tracks.map( (track, key) => {
      return <TrackIndexItem key={ key } track={ track }/>;
    });

    return (
      <div>
        <h1>TRACK INDEX, BABY!!!!</h1>
        <ul>{ allTrackIndexItems }</ul>
      </div>
  );
  }
});

module.exports = TrackIndex;
