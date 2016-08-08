const React = require('react');
const Link = require('react-router').Link;
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const TrackIndex = require('./track_index.jsx');
const CSSHelper = require('../helpers/css.js');

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
    let rbg1 = CSSHelper.styleHelper();
    let rbg2 = [rbg1[1], rbg1[2], rbg1[0]];

    if (this.state.user) {

      let username = this.state.user.username;
      let userTracks = this.state.user.tracks;
      let avatarUrl = this.state.user.avatar_image_url;
      let userUrl = `/users/${this.state.user.id}`;

      return(
        <div className="user-page">
          <div className="user-page banner-area" style={{background: '-webkit-linear-gradient(135deg, rgba('+(rbg1[0])+', '+(rbg1[1])+', '+(rbg1[2])+', 0.5) 1%, rgba('+rbg2[0]+', '+(0)+', '+rbg2[2]+', 0.7) 100%)'}}>
            <div>
              <img className="user-avatar-image" src={ this.state.user.avatar_image_url }/>
            </div>

            <div className="user-info">
              <div className="username">
                <Link to={ `/users/${this.state.user.id}` }>{ this.state.user.username }</Link>
              </div>
              <div className="user-location">


              </div>
            </div>
          </div>

          <div className="user-tracks">

            <h2>{ this.state.user.username }'s Vibrations</h2>
            <br/>
            <TrackIndex tracks={ userTracks }/>
          </div>
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
