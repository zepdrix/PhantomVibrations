Routes

- component: App path: /
  (if not logged in:)
    - component: HomePage
      - component: UserIndex path: /user
        - component: UserTrack path: /user/track_title
      - component: Likes path: /user/likes
  (if logged in:)
    - component: UserStream
      - component: UserIndex path: /user
        - component: Likes path: /user/likes
        - component: UserTrack path: /user/track_title
          - component: TrackEdit path: /user/tracks
            - component: EditForm path: /user/tracks/track_title
      - component: Upload path: /upload


Component Hierarchy

- App
  - Navbar
  - Playbar
  - UserIndex (/user)
    - UserHeader
    - UserTracks
      - Track
        - Likes
  - UserTrack (/user/track_name)
    - TrackView
    - CommentView
      - CommentForm
      - CommentProfile
      - CommentLikes
      - CommentItem
  - Stream (/)
    - Track
      - Likes
  - UploadForm (/upload)
  - Likes (/user/likes)
    - UserLikes
      - TrackLike
        - LikeIcon
  - EditView (/user/tracks)
    - TrackEdit
  - TrackEdit (/user/tracks/track_title)
    - EditForm















//
