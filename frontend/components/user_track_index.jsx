const React = require('react');
const Link = require('react-router').Link;
const UserTrackIndexItem = require('./user_track_index_item');


var UserTrackIndex = React.createClass({

  render () {
    
    if (this.props.tracks.length > 0) {
      let allUserTrackIndexItems = this.props.tracks.map( (track, key) => {
        return <UserTrackIndexItem track={ track } key={ key }/>;
      });
      return(
        <div className="usertracks-index">
          <div className="usertracks-header">Your Vibrations</div>
          { allUserTrackIndexItems }
        </div>
      );
    } else {
      return(
        <div className="usertracks-index">
          <div className="usertracks-header">
            You have no tracks!
            <Link to="/upload"> Click here to upload one!</Link>

          </div>
        </div>
      );
    }


  }


});

module.exports = UserTrackIndex;
