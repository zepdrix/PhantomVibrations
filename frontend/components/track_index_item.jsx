const React = require('react');
const Link = require('react-router').Link;

var TrackIndexItem = React.createClass({



  render () {

    return(
      <li className="track-item">
        <div >
          <div className="track-avatar-img" >
            <img src="https://thesocietypages.org/socimages/files/2009/05/nopic_192.gif" height="160" width="160"/>

          </div>
          <div className="track-user-info">
            <Link
              to="/users/{this.props.track.user_id}"
              className="track-item track-username">
              { this.props.track.user.username }
            </Link>
            <br/>
            <Link
              to="/tracks/{this.props.track.id}"
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
