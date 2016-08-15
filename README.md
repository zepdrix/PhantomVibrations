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

PhantomVibrations uses the flux architecture to keep track of different tracks and where in the track the user last left off. It uses the HTML5 audio's 'ontimeupdate' event to update a playing track's progress bar.

React-waveform is used to generate the waveform of an audio file and flux updates the progress of the waveform.

Comments are generated using a standard html form. When a form is submitted, if the track is playing, a float indicating the percentage of the song that the comment was written at will be saved along with the comment. When the track waveform renders, the comments will be are rendered in a container that is positioned on top of the waveform, and an inline css transform is used to position the comment to its appropriate place.

# To-Do:

- [ ] Track Length and Current Time display
- [ ] Search
- [ ] Likes
- [ ] Follows
- [ ] Index views for likes and follows
- [ ] User Feed
