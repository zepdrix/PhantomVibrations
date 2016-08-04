const React = require('react');
const Link = require('react-router').Link;

var TrackIndexItem = React.createClass({
  clickHandler (e) {
    this.context.router.push(`/tracks/${this.props.track.id}`);
  },

  render () {
    let trackUrl = `/tracks/${this.props.track.id}`;

    return(
      <li className="track-item">
        <div >
          <div className="track-avatar-img" >
            <Link to={ trackUrl }>
              <img src="https://thesocietypages.org/socimages/files/2009/05/nopic_192.gif" height="160" width="160"/>
              </Link>
          </div>
          <div className="track-user-info">
            <Link
              to={ trackUrl }
              className="track-item track-username">
              { this.props.track.user.username }
            </Link>
            <br/>
            <Link
              to={ trackUrl }
              className="track-item track-title">
              { this.props.track.title }
            </Link>
          </div>
        </div>
      </li>
    );

  }


});


module.exports = TrackIndexItem;
