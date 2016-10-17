const React = require('react');
const Link = require('react-router').Link;
const UserStore = require('../stores/user_store');
const UserActions = require('../actions/user_actions');
const TrackStore = require('../stores/track_store');
const TrackIndex = require('./track_index');
const CSSHelper = require('../helpers/css');
const UserSuggestionIndex = require('./user_suggestion_index');

var UserProfile = React.createClass({

  getInitialState () {
    let user = UserStore.find(parseInt(this.props.params.userId));
    let rbg1 = CSSHelper.styleHelper();

    return { user: user, userTracks: [], rbg1: rbg1};
  },

  componentDidMount () {
    this.userListener = UserStore.addListener(this.onUserChange);
    this.trackListener = TrackStore.addListener(this.onTrackUpdate);
    // TrackActions.fetchUserTracks(parseInt(this.props.params.userId));
    // UserActions.fetchUser(parseInt(this.props.params.userId));
  },

  onTrackUpdate () {
    this.setState({ userTracks: TrackStore.all() });
  },

  componentWillMount () {
    let userId = parseInt(this.props.params.userId);
    UserActions.fetchUser(userId);
    TrackActions.fetchUserTracks(userId);
  },

  componentWillUnmount () {
    this.userListener.remove();
    this.trackListener.remove();
  },

  componentWillReceiveProps (nextProps) {
    let userId = parseInt(nextProps.params.userId);
    UserActions.fetchUser(userId);
    TrackActions.fetchUserTracks(userId);
  },

  onUserChange () {
    let user = UserStore.find(parseInt(this.props.params.userId));
    this.setState({ user: user, userTracks: user.tracks });
  },

  render () {

    let rbg2 = [this.state.rbg1[1], this.state.rbg1[2], this.state.rbg1[0]];

    if (this.state.user) {

      let username = this.state.user.username;
      let userTracks = this.state.userTracks;
      let avatarUrl = this.state.user.avatar_image_url;
      let userUrl = `/users/${this.state.user.id}`;
      let trackDisplay = userTracks.length === 0 ? <h3>{ username } doesn't have any tracks yet!</h3> : <TrackIndex tracks={ userTracks }/>;

      let bannerStyle;
      let bannerImage;

      if ( this.state.user.banner_image_url ) {
        bannerStyle = { background: 'transparent' };
        bannerImage = <img className="user-banner-image" src={ this.state.user.avatar_image_url }/>;
      } else {
        bannerStyle = {background: '-webkit-linear-gradient(135deg, rgba('+(this.state.rbg1[0])+', '+(this.state.rbg1[1])+', '+(this.state.rbg1[2])+', 0.5) 1%, rgba('+rbg2[0]+', '+(0)+', '+rbg2[2]+', 0.7) 100%)'};

      }
      return(
        <div className="user-page">
          { bannerImage }
          <div className="user-page banner-area" style={bannerStyle}>
              <img className="user-avatar-image" src={ this.state.user.avatar_image_url }/>

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
            { trackDisplay }
          </div>

          <div className="user-page-suggestions">
            <h3>Check out:</h3>
            <UserSuggestionIndex />
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
