# PhantomVibrations

[Heroku link][heroku]: http:/phantomvibrations.herokuapp.com

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

## Minimum Viable Product

PhantomVibrations is a web application inspired by SoundCloud that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [ ] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](docs/production_readme.md) -- you'll write this later)
- [ ] Track CRUD
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Continuous play while navigating site
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Comments
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] User pages
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Infinite Scroll for Tracks
- [ ] Wave Forms
- [ ] Likes

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./wireframes/views.md
[components]: ./components.md
[flux-cycles]: ./flux-cycles.md
[api-endpoints]: ./api-endpoints.md
[schema]: ./schema.md

## Implementation Timeline

1 day (1/10)

Create User, Track, Like, and Comment models
Write authentication backend and make sure it works in the frontend
Set up basic frontend utilities and scaffolds (routes, flux framework)

1 day (2/10)

Figure out how to upload and play music from browser

1 day (3/10)

Create flux cycle for tracks

Create Track CRUD and create components that render any track components
  - Stream
  - HomeTracks
  - UserLikes
  - UserTracks
  - EditView
  - TrackView
  - CommentView

1 day (4/10)

Create flux cycle for comments

Create Comment CRUD and create components that render any comment
components
  - CommentItem

create flux cycle for likes

Create Like CRUD and create/edit components that render any Like
components
  - CommentLikes
  - Track

1 day (5/10)

Debug everything


3 days (8/10)

Style everything


Bonus Features (TBD)
  infinite scroll for all index items
  set up waveform image of audio file
  create css comments in <Track />
  set up multiple sessions
