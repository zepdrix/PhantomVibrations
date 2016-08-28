json.partial! "api/users/user", user: @user
json.tracks do
  json.array! @user.tracks do |track|
    json.partial! "api/tracks/track", track: track
    json.user do
      json.partial! "api/users/user", user: @user
    end
  end
end

arr = []
@user.likes.each do |like|
  arr.push(like.track_id)
end


json.likes arr

 # do
 #  json.array! @user.likes do |like|
 #    like.track_id
 #    # json.partial! "api/likes/like", like: like
 #  end
# end
