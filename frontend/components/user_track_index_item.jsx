const React = require('react');
const Link = require('react-router').Link;
const TrackActions = require('../actions/track_actions.js');

var UserTrackIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleDeleteSubmit (e) {
    e.preventDefault();
    TrackActions.deleteTrack(this.props.track.id);
  },

  render () {
    let editTrackUrl = `tracks/${this.props.track.id}/edit`;


    return(
      <div>
        <Link to={ editTrackUrl }>Edit</Link>
        <button onClick={ this.handleDeleteSubmit }>Delete</button>

        { this.props.track.title }
      </div>
    );

  }


});

module.exports = UserTrackIndexItem;
