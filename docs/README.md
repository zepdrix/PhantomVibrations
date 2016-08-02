# PhantomVibrations

[Heroku link][heroku] **Note:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

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
