const React = require('react');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const TrackIndex = require('./track_index.jsx');

var UserProfile = React.createClass({

  getInitialState () {
    return { user: UserStore.find(this.props.params.userId) };
  },

  componentDidMount () {
    this.userListener = UserStore.addListener(this.onChange);
    UserActions.fetchUser(this.props.params.userId);
  },

  componentWillUnmount () {
    this.userListener.remove();
  },

  userTracks () {
    return <TrackIndex tracks={this.state.user.tracks}/>;
  },

  onChange () {
    this.setState({ user: UserStore.find(this.props.params.userId) });
  },

  render () {
    if (this.state.user) {
      let username = this.state.user.username;
      let userTracks = this.state.user.tracks;
      return(

        <div className="user-page section">
          <div className="user-page-header">
            <h2>{ username }'s Vibrations</h2>
          </div>
          <br/>
          <TrackIndex tracks={ userTracks }/>
        </div>

      );

    } else {
      return(
        <div>
        </div>
      );
    }


  }

});

module.exports = UserProfile;
