const React = require('react');
const Link = require('react-router').Link;
const TrackStore = require('../stores/track_store');
const TrackActions = require('../actions/track_actions');
const SessionStore = require('../stores/session_store');

var UserTrackIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleDeleteSubmit (e) {
    e.preventDefault();
    TrackActions.deleteTrack(this.props.track.id);
  },

  render () {
    debugger
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
          <div className="usertracks-index-item group">
            <img className="usertracks-image" src={ this.props.track.image_url } />
            <Link to={ `tracks/${this.props.track.id}` } className="usertracks-title">
              { this.props.track.title }
            </Link>
            <br/>
            <div className="usertracks-comments">
              ({ this.props.track.comments.length } comments)
            </div>
            <br/>
            <div className="edit-options">
              <Link to={ editTrackUrl }>Edit  </Link>
              <button onClick={ this.handleDeleteSubmit }>   Delete </button>
            </div>

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
