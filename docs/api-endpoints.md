API Endpoints

HTML API

Root
  - GET / -loads React web app


Users
  - GET /api/:user
  - POST /api/users
  - PATCH /api/users

Session
  - POST /api/session
  - PATCH /api/session
  - GET /api/session

JSON API

Tracks
  - GET /api/:user/tracsk/:track
    - Tracks index/search
  - GET /api/:user/tracks
  - POST /api/:user/tracks
  - PATCH /api/:user/tracks/:track
  - DELETE /api/:user/tracks/:track

Likes
  - GET /api/:user/tracks/:track/likes
  - POST /api/:user/tracks/:track/likes
  - DELETE /api/:user/tracks/:track/like/:id

Comments
  - GET /api/:user/tracks/:track/comments
  - POST /api/:user/tracks/:track/comments
  - DELETE /api/:user/tracks/:track/comment/:id

Playlist
  - GET /api/:user/playlists/:playlist
    - Playlists index/search
  - GET /api/:user/playlists
  - POST /api/:user/playlists
  - PATCH /api/:user/playlists/:playlist
  - DELETE /api/:user/playlists/:playlist
  - GET /api/:user/playlists/:playlist/tracks
    - Index of all tracks in a playlist
