json.extract! user, :id, :username

json.avatar_image_url asset_path(user.avatar_image.url)
