json.extract! track, :id, :user_id, :title, :description, :plays
json.comments do
  json.array!  track.comments do |comment|
    json.partial! "api/comments/comment", comment: comment
  end
end
json.image_url asset_path(track.image.url)
json.audio_url asset_path(track.audio.url)
