# PhantomVibrations

[PhantomVibrations](http:/phantomvibrations.herokuapp.com)

# Summary

PhantomVibrations is a single page web application built with Ruby on Rails and using the React.js/flux architecture. PhantomVibrations is inspired by SoundCloud's unique features, users are allowed to:

  - Create an account
  - Log in / Log out
  - Upload / Edit / Delete audio files
  - View / listen to their own tracks
  - View / listen to other users' tracks
  - View waveform representations of all audio files
  - Experience uninterrupted audio playback while navigating the site
  - Comment on any track, if the track is playing, the comment will appear at the corresponding time on the song's waveform
  - See the comments appear in time on a track's waveform as the track is playing

# Technologies/Libraries used

   - React.js
   - Flux
   - BCrypt
   - Paperclip
   - figaro
   - react-waveform

# Technical Details
---
## Audio Playback

The track store keeps track of the all the tracks on a page as well as a 'current track', which is the track that is currently playing or, if no track is playing, the track that was last played. When a user clicks on a play icon, a helper method, TrackChange.playTrack(), gets called with the track's id. If there is no 'current track' in the track store or if the 'current track' doesn't match the track being played, this method finds the audio_url of the track by its id and creates a new Audio() element with that url as its source. Otherwise, the function will either play or pause the track depending on whether it is currently paused.

```JavaScript
playTrack (id) {
  if (id == TrackStore.currentTrack().dataset.id) {
    if (TrackStore.currentTrack().paused) {
      TrackActions.playCurrentTrack();
    } else {
      TrackActions.pauseCurrentTrack();
    }
  } else {

    let track = new Audio();
    let currentTrack = TrackStore.find(id);
    track.dataset.id = currentTrack.id;
    track.title = currentTrack.title;
    track.src = currentTrack.audio_url;
    TrackActions.resetCurrentTrack(track);
  }
},
```

## Track Progress Bars

PhantomVibrations uses Flux architecture to keep track of different tracks and where in the track the user last left off. The track store has a hash that stores the track_id of any track that has been played/is playing as keys pointing to the percentage of the track that has already been played. It uses the HTML5 audio tag's 'timeupdate' event to update the percentage of a track based on the currentTime and duration properties of the audio tag. When a track starts playing, the listener function updates the percentage that the track_id is poiting to and when the track is paused, the listener is removed.

```JavaScript
const _playCurrentTrack = function () {
  _currentTrack.addEventListener('timeupdate', _setCurrentPercentage);
  _currentTrack.play();
};

const _pauseCurrentTrack = function () {
  _setCurrentPercentage();
  _currentTrack.removeEventListener('timeupdate', _setCurrentPercentage);
  _currentTrack.pause();
};

const _setCurrentPercentage = function () {
  _trackStates[_currentTrack.dataset.id] = { percentage: 0, duration: 0 };
  _trackStates[_currentTrack.dataset.id].percentage = _currentTrack.currentTime / _currentTrack.duration;
  _trackStates[_currentTrack.dataset.id].duration = _currentTrack.duration;
};
```

### PlayBar
---
The track PlayBar that appears at the bottom of the screen when a track starts playing uses the track currentTime and duration properties (stored in the state) along with inline CSS to change the width of the orange 'song progress' HTML div as the song is playing.

```JavaScript
if (this.state.currentTrack) {
  let barWidth = window.innerWidth < 900 ? 900 : window.innerWidth;
  percentage = (this.state.currentTrack.currentTime / this.state.currentTrack.duration) * barWidth;
} else {
  percentage = 0;
}

<div className="playnode-container" onClick={ this.resetPercentage }>
  <div className="playnode-played" style={{width: percentage + 'px'}}></div>
</div>
```

### Track Waveforms
---
React-wavesurfer parses through the audio file via the audio_url and generates the waveform in HTML canvas. React-wavesurfer uses the Wavesurfer.js library, which creates an object that also supports playback, however the playback is handled by the process described in the Audio Playback portion of this README so this component is not actually playing any audio. Instead, we use React-wavesurfer's 'pos' attribute, which allows us to specify a position for the 'scrollbar' in the waveform. Much like the playbar, this 'pos' attribute is updated as a song is playing by referencing the duration and percentage of the track, which is stored in the TrackIndexItem and TrackShow components' states.

```JavaScript
<Wavesurfer
  audioFile={this.props.track.audio_url}
  pos={ this.state.percentage * trackDuration }
  options={ waveOptions }
/>
```

## Comments
---
Comments are generated using a standard html form. When a form is submitted, if the track is playing, a float indicating the percentage of the song that the comment was written at will be saved along with the comment. When the track waveform renders, the comments will be are rendered in a component, the CommentAvatarIndex, that is positioned on top of the waveform, and  inline CSS transform is used to position each CommentAvatarIndexItem to its appropriate place.

```JavaScript
let percentage = this.props.comment.track_percentage * this.props.width;

---

<img
  onMouseEnter={ this.commentShow }
  style={{transform: 'translateX(' + percentage + 'px)'}}
  className="comment-avatar-image"
  src={ this.props.comment.avatar_image_url }/>

<div
  style={{transform: 'translateX(' + percentage + 'px)'}}
  className="comment-avatar-comment">

  { hiddenComment }
</div>
```










---
