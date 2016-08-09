const React = require('react');
const Link = require('react-router').Link;

const TrackStore = require('../stores/track_store.js');
const TrackChange = require('../helpers/track_change.js');
const WindowSizeConstants = require('../constants/window_size_constants.js');
const CommentAvatarIndex = require('./comment_avatar_index.jsx');



var TrackIndexItem = React.createClass({
  getInitialState () {
    let percentage = TrackStore.getPercentage(this.props.track.id);
    return { percentage: percentage };
  },

  componentWillMount () {
  //   this.currentTrackListener = TrackStore.addListener(this.renderPlaybar);
    this.renderPlaybar();

  },

  componentDidMount () {
    this.currentTrackListener = TrackStore.addListener(this.renderPlaybar);
    this.renderPlaybar();
  },

  componentWillUnmount () {
    this.currentTrackListener.remove();
    if (this.setRefreshIntervalId) {
      clearInterval(this.setRefreshIntervalId);
    }
  },

  renderPlaybar () {
    if ((parseInt(TrackStore.currentTrack().id) === this.props.track.id)) {
      if (TrackStore.currentTrack.paused) {
        this.setState({ percentage: TrackStore.getPercentage(this.props.track.id) });
      } else {
        clearInterval(this.setRefreshIntervalId);

        this.setRefreshIntervalId = setInterval( ()=> {this.setState({ percentage: (TrackStore.currentTime() / TrackStore.currentTrack().duration) });},100);
      }

    } else if (!!TrackStore.getPercentage(this.props.track.id)) {

      clearInterval(this.setRefreshIntervalId);


      this.setState({ percentage: TrackStore.getPercentage(this.props.track.id) });
    } else {

      this.setState({ percentage: 0 });
    }
  },

  clickHandler (e) {
    this.context.router.push(`/tracks/${this.props.track.id}`);
  },

  onClick (e) {
    console.log(e.clientX, e.pageX, e.screenX);

    e.preventDefault();
    TrackChange.playTrack(e);

  },

  render () {

    let trackUrl = `/tracks/${this.props.track.id}`;
    let trackImageUrl = this.props.track.image_url;
    let userUrl = `/users/${this.props.track.user_id}`;
    let userImageUrl = this.props.track.user.image_url;
    //
    // var percentage = 0;
    // if (TrackStore.isCurrentTrack() && (TrackStore.currentTrack().id === this.props.track.id)) {
    //     percentage = (this.state.currentTrack.currentTime / this.state.currentTrack.duration) * 420;
    //   }

    return(
      <li className="track-item" >
        <div >
          <div className="track-avatar-img" >
            <Link to={ trackUrl } className="track-avatar-img">
              <img className="track-avatar-img" src={ trackImageUrl } height="160" width="160"/>
              </Link>
          </div>

          <div className="play-icon" id={ this.props.track.id } onClick={ this.onClick }/>

          <div className="track-user-info">
            <Link
              to={ userUrl }
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

          <div className="track-list playnode-container">
            <div className="track-list playnode-played" style={{width: (this.state.percentage * 420) + 'px'}}></div>
          </div>

          <div className="track-index-avatar-comments-container">
            <CommentAvatarIndex  width={ WindowSizeConstants.TRACK_INDEX_WIDTH } comments={ this.props.track.comments}/>
          </div>

          <div className="track-audio-el">
            <div id={ this.props.track.id } className="track-id">
              <div id={ this.props.track.audio_url } className="audio/ogg"/>
            </div>
          </div>

        </div>
      </li>
    );

  }


});


module.exports = TrackIndexItem;
