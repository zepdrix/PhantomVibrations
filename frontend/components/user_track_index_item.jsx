const React = require('react');
const Link = require('react-router').Link;
const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');
const SessionStore = require('../stores/session_store.js');

var UserTrackIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleDeleteSubmit (e) {
    e.preventDefault();
    TrackActions.deleteTrack(this.props.track.id);
  },

  render () {

    if ((parseInt(TrackStore.currentTrack().id) === this.props.track.id) && (this.props.track.user_id === SessionStore.currentUser().id)) {
      return(
        <div className="usertracks-index-item">
          <div>{ this.props.track.title }: You can't edit a song while it's currently playing!</div>
        </div>
      );
    }
    else {
      if ((this.props.track.user_id === SessionStore.currentUser().id)) {

        let editTrackUrl = `tracks/${this.props.track.id}/edit`;


        return(
          <div className="usertracks-index-item">
            <Link to={ editTrackUrl }>Edit</Link>
            <button onClick={ this.handleDeleteSubmit }>Delete</button>

            { this.props.track.title }
          </div>
        );
      }
     else {
      return(
        <div></div>
      );
    }
}

  }


});

module.exports = UserTrackIndexItem;
