json.extract! user, :id, :username
json.image_url asset_path(user.avatar_image.url)
