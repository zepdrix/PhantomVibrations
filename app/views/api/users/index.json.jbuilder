json.array! @users do |user|
  json.partial!  "api/users/user", user: user
  json.tracks do
    json.array! user.tracks do |track|
      json.partial! "api/tracks/track", track: track
      json.user do
        json.partial! "api/users/user", user: user
      end
    end
  end
  json.likes do
    json.array! user.likes do |like|
      json.partial! "api/likes/like", like: like
    end
  end
end
