Users
  string    "username"
  string    "name"
  string    "password_digest"
  string    "session_token"
  string    "image_url"


Tracks
  integer   "user_id"
  string    "title"
  integer   "track_length"
  string    "image_url"
  string    "track_url"

Likes
  integer   "user_id"
  integer   "track_id"

Comments
  integer   "user_id"
  integer   "track_id"
  text      "body"
  integer   "song_time"

Playlists
  integer   "user_id"
  string    "title"
  text      "description"
  string    "image_url"

PlaylistTracks
  integer   "track_id"
  integer   "playlist_id"
  integer   "track_order_id"
