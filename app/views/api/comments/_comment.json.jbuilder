json.extract! comment, :id, :user_id, :track_id, :body, :track_percentage
json.username comment.user.username
json.avatar_image_url asset_path(comment.user.avatar_image.url)
