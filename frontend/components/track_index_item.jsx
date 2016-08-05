const React = require('react');
const Link = require('react-router').Link;

const TrackStore = require('../stores/track_store.js');
const CSSHelper = require('../helpers/css.js');

const styleHelper = () => {
  let arr = [195, 89];
  let randomArray = [];
  arr.push(Math.floor(Math.random()* 106) + 89);
  for (var i = 0; i < 2; i++) {
    let j = Math.floor(Math.random()* (2 - i));
    randomArray.push(arr.splice(j, 1)[0]);

  }

  randomArray.push(arr[0]);
  return randomArray;

};

var TrackIndexItem = React.createClass({
  clickHandler (e) {
    this.context.router.push(`/tracks/${this.props.track.id}`);
  },


  playTrack (e) {
    e.preventDefault();

  },

  render () {
    let rbg1 = CSSHelper.styleHelper(125, 15);
    let rbg2 = [rbg1[1], rbg1[0], rbg1[2]];

    let trackUrl = `/tracks/${this.props.track.id}`;
    let trackImageUrl = this.props.track.image_url;
    let userUrl = `/users/${this.props.track.user_id}`;
    let userImageUrl = this.props.track.user.image_url;
    return(
      <li className="track-item" style={{background: '-webkit-linear-gradient(top, rgba( 0, 0, 0, 0) 55%, rgba('+(rbg1[0])+', '+(0)+', '+(rbg1[2])+', 0.5) 80%, rgba('+rbg2[0]+', '+(0)+', '+rbg2[2]+', 0.7) 100%)'}}>
        <div >
          <div className="track-avatar-img" >
            <Link to={ trackUrl } className="track-avatar-img">
              <img className="track-avatar-img" src={ trackImageUrl } height="160" width="160"/>
              </Link>
          </div>

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

          <div className="track-audio-el">
            <audio id={ this.props.track.id }>
              <source src={ this.props.track.audio_url } type="audio/ogg"/>
            </audio>

          </div>

        </div>
      </li>
    );

  }


});


module.exports = TrackIndexItem;
