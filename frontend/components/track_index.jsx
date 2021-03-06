const React = require('react');
const TrackIndexItem = require('./track_index_item');
const UserSuggestionIndex = require('./user_suggestion_index');

var TrackIndex = React.createClass({
  render () {
    let allTrackIndexItems = this.props.tracks.map( (track, key) => {
      return <TrackIndexItem key={ track.id } track={ track }/>;
    });

    return (
      <div className="track-index">
        <ul className="track-index list">{ allTrackIndexItems }</ul>

      </div>
    );
  }
});

module.exports = TrackIndex;
