const React = require('react'),
      ReactDOM = require('react-dom'),
      ReactRouter = require('react-router'),
      Router = ReactRouter.Router,
      Route = ReactRouter.Route,
      IndexRoute = ReactRouter.IndexRoute,
      hashHistory = ReactRouter.hashHistory;

const TrackIndex = require('./components/track_index.jsx'),
      TrackForm = require('./components/track_form.jsx'),
      LoginForm = require('./components/login_form.jsx'),
      SignupForm = require('./components/signup_form.jsx'),
      App = require('./components/app.jsx');


const SessionApiUtil = require('./util/session_api_util.js'),
      SessionActions = require('./actions/session_actions.js'),
      TrackApiUtil = require('./util/track_api_util.js'),
      TrackActions = require('./actions/track_actions.js'),
      SessionStore = require('./stores/session_store.js'),
      SetupApp = require('./setup_app.js');


window.SessionApiUtil = SessionApiUtil;
window.SessionActions = SessionActions;
window.TrackApiUtil = TrackApiUtil;
window.TrackActions = TrackActions;

const _ensureLoggedIn = function (nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/login');
  }
};

const appRouter = (
  <Router history={ hashHistory }>
    <Route path='/' component={ App }>

      <Route path='/login' component={ LoginForm }/>
      <Route path='/signup' component={ LoginForm }/>
      <Route path='/upload' component={ TrackForm } onEnter={ _ensureLoggedIn }/>
    </Route>
  </Router>
);


document.addEventListener("DOMContentLoaded", () => {
  // SetupApp();
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  } else {
    SessionActions.receiveCurrentUser({});
  }

  const root = document.getElementById("content");
  ReactDOM.render(appRouter, root);
});
