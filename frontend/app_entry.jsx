const React = require('react'),
      ReactDOM = require('react-dom'),
      ReactRouter = require('react-router'),
      Router = ReactRouter.Router,
      Route = ReactRouter.Route,
      IndexRoute = ReactRouter.IndexRoute,
      hashHistory = ReactRouter.hashHistory;

const TrackIndex = require('./components/track_index'),
      TrackEditForm = require('./components/track_edit_form'),
      TrackForm = require('./components/track_form'),
      TrackShow = require('./components/track_show'),
      LoginForm = require('./components/login_form'),
      SignupForm = require('./components/signup_form'),
      HomePage = require('./components/home_page'),
      UserPage = require('./components/user_page'),
      UserProfile = require('./components/user_profile'),
      UserTracks = require('./components/user_tracks'),
      CurrentUserProfile = require('./components/current_user_edit_form'),
      App = require('./components/app');

const SessionApiUtil = require('./util/session_api_util'),
      SessionActions = require('./actions/session_actions'),
      TrackApiUtil = require('./util/track_api_util'),
      TrackActions = require('./actions/track_actions'),
      TrackStore = require('./stores/track_store'),
      SessionStore = require('./stores/session_store'),
      SetupApp = require('./setup_app'),
      TimeChange = require('./helpers/time_conversion');


window.SessionApiUtil = SessionApiUtil;
window.SessionActions = SessionActions;
window.TimeChange = TimeChange;
window.TrackApiUtil = TrackApiUtil;
window.TrackActions = TrackActions;
window.TrackStore = TrackStore;

const _ensureLoggedIn = function (nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/login');
  }
};

const _loadLanding = function () {
  if (SessionStore.isUserLoggedIn()) {

    return(
      <UserPage/>
    );
  } else {

    return(
      <HomePage/>
    );
  }
};

const appRouter = (
  <Router history={ hashHistory }>
    <Route path='/' component={ App }>
      <IndexRoute component={ _loadLanding }/>
      <Route path='/login' component={ LoginForm }/>
      <Route path='/signup' component={ LoginForm }/>
      <Route path='/tracks/:trackId' component={ TrackShow }/>
      <Route path='/tracks/:trackId/edit' component={ TrackEditForm }/>
      <Route path='/users/:userId' component={ UserProfile }/>
      <Route path='/users/:userId/edit' component={ CurrentUserProfile } onEnter={ _ensureLoggedIn }/>
      <Route path='/upload' component={ TrackForm } onEnter={ _ensureLoggedIn }/>
      <Route path='/tracks' component={ UserTracks } onEnter={ _ensureLoggedIn }/>
    </Route>
  </Router>
);


document.addEventListener("DOMContentLoaded", () => {

  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  } else {
    SessionActions.receiveCurrentUser({});
  }

  const root = document.getElementById("content");
  ReactDOM.render(appRouter, root);
});
