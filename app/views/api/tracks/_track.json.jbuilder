json.extract! track, :id, :user_id, :title, :description, :plays
json.image_url asset_path(track.image.url)
json.audio_url asset_path(track.audio.url)
