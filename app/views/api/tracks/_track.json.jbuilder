json.extract! track, :id, :user_id, :title, :description, :plays
json.comments do
  json.array!  track.comments.sort { |x, y| x.track_percentage - y.track_percentage } do |comment|
    json.partial! "api/comments/comment", comment: comment
  end
end
json.user do
  json.partial! "api/users/user", user: track.user
end
json.image_url asset_path(track.image.url)
json.audio_url asset_path(track.audio.url)
