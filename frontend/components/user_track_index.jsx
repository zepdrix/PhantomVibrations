const React = require('react');
const UserTrackIndexItem = require('./user_track_index_item');


var UserTrackIndex = React.createClass({

  render () {

    if (!!this.props.tracks) {
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
        <div>
          You have no tracks!
        </div>
      );
    }


  }


});

module.exports = UserTrackIndex;
