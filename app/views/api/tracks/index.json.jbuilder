json.array! @tracks do |track|
  json.partial!  "api/tracks/track", track: track

  json.user track.user
end
