const React = require('react'),
      ReactDOM = require('react-dom'),
      ReactRouter = require('react-router'),
      Router = ReactRouter.Router,
      Route = ReactRouter.Route,
      IndexRoute = ReactRouter.IndexRoute,
      hashHistory = ReactRouter.hashHistory;

const TrackIndex = require('./components/track_index.jsx'),
      LoginForm = require('./components/login_form.jsx'),
      SignupForm = require('./components/signup_form.jsx'),
      App = require('./components/app.jsx');


const SessionApiUtil = require('./util/session_api_util.js'),
      SessionActions = require('./actions/session_actions.js'),
      SetupApp = require('./setup_app.js');


      window.SessionApiUtil = SessionApiUtil;
      window.SessionActions = SessionActions;


const appRouter = (
  <Router history={ hashHistory }>
    <Route path='/' component={ App }>
      <IndexRoute component={ TrackIndex }/>
      <Route path='/login' component={ LoginForm }/>
      <Route path='/signup' component={ SignupForm }/>
    </Route>
  </Router>
);


document.addEventListener("DOMContentLoaded", () => {
  // if (window.currentUser) {
  //   SessionActions.receiveCurrentUser(window.currentUser);
  // }
  SetupApp();
  const root = document.getElementById("content");
  ReactDOM.render(appRouter, root);
});
