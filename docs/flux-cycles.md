# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. sets `form` and `_errors` in the `ErrorStore`
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. removes `_errors` for a given `form` in the `ErrorStore`

## Track Cycles

### Tracks API Request Actions

* `fetchAllTracks`
  0. invoked from `TracksIndex` `didMount`/`willReceiveProps`
  0. `GET /api/:user/tracks` is called.
  0. `receiveAllTracks` is set as the success callback.

* `createTrack`
  0. invoked from new note button `onClick`
  0. `POST /api/:user/tracks` is called.
  0. `receiveSingleTrack` is set as the success callback.

* `fetchSingleTrack`
  0. invoked from `TrackDetail` `didMount`/`willReceiveProps`
  0. `GET /api/:user/tracks/:track` is called.
  0. `receiveSingleTrack` is set as the success callback.

* `updateTrack`
  0. invoked from `TrackForm` `onSubmit`
  0. `POST /api/:user/tracks/:track` is called.
  0. `receiveSingleTrack` is set as the success callback.

* `destroyTrack`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/:user/tracks/:track` is called.
  0. `removeTrack` is set as the success callback.

### Tracks API Response Actions

* `receiveAllTracks`
  0. invoked from an API callback.
  0. `Track` store updates `_tracks` and emits change.

* `receiveSingleTrack`
  0. invoked from an API callback.
  0. `Track` store updates `_tracks[id]` and emits change.

* `removeTrack`
  0. invoked from an API callback.
  0. `Track` store removes `_tracks[id]` and emits change.

### Store Listeners

* `TracksIndex` component listens to `Track` store.
* `Track` component listens to `Track` store.
* `TrackLike` component listens to `Track` store.
* `TrackEdit` component listens to `Track` store.
* `EditView` component listens to `Track` store.
* `Stream` component listens to `Track` store.

## Comment Cycles

### Comments API Request Actions

* `fetchAllComments`
  0. invoked from `CommentsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/:user/track/:track/comments` is called.
  0. `receiveAllComments` is set as the success callback.

* `createComment`
  0. invoked from new note button `onClick`
  0. `POST /api/:user/track/:track/comments` is called.
  0. `receiveSingleComment` is set as the success callback.

* `fetchSingleComment`
  0. invoked from `CommentDetail` `didMount`/`willReceiveProps`
  0. `GET /api/:user/track/:track/comments/:id` is called.
  0. `receiveSingleComment` is set as the success callback.

* `destroyComment`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/:user/track/:track/comments/:id` is called.
  0. `removeComment` is set as the success callback.

### Comments API Response Actions

* `receiveAllComments`
  0. invoked from an API callback.
  0. `Comment` store updates `_comments` and emits change.

* `receiveSingleComment`
  0. invoked from an API callback.
  0. `Comment` store updates `_comments[id]` and emits change.

* `removeComment`
  0. invoked from an API callback.
  0. `Comment` store removes `_comments[id]` and emits change.

### Store Listeners

* `CommentsView` component listens to `Comment` store.
* `CommentItem` component listens to `Comment` store.

## Like Cycles

### Likes API Request Actions

* `fetchAllLikes`
  0. invoked from `LikesIndex` `didMount`/`willReceiveProps`
  0. `GET /api/:user/track/:track/likes` is called.
  0. `receiveAllLikes` is set as the success callback.

* `createLike`
  0. invoked from new note button `onClick`
  0. `POST /api/:user/track/:track/likes` is called.
  0. `receiveSingleLike` is set as the success callback.

* `fetchSingleLike`
  0. invoked from `LikeDetail` `didMount`/`willReceiveProps`
  0. `GET /api/:user/track/:track/likes/:id` is called.
  0. `receiveSingleLike` is set as the success callback.

* `destroyLike`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/:user/track/:track/likes:id` is called.
  0. `removeLike` is set as the success callback.

### Likes API Response Actions

* `receiveAllLikes`
  0. invoked from an API callback.
  0. `Like` store updates `_likes` and emits change.

* `receiveSingleLike`
  0. invoked from an API callback.
  0. `Like` store updates `_likes[id]` and emits change.

* `removeLike`
  0. invoked from an API callback.
  0. `Like` store removes `_likes[id]` and emits change.

### Store Listeners

* `CommentLikes` component listens to `Like` store.
* `UserLikes` component listens to `Like` store.
