json.array! @tracks do |track|
  json.partial!  "api/tracks/track", track: track
  json.user track.user
  json.comments track.comments
end
