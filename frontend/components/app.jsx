const React = require('react');
const LoginForm = require('./login_form');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const Link = require('react-router').Link;

const NavBar = require('./nav_bar');
const PlayBar = require('./play_bar');
const HomePage = require('./home_page');
const UserPage = require('./user_page');

var App = React.createClass({
  getInitialState () {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.updateUser);
    SessionActions.fetchCurrentUser();
  },

  updateUser () {
    this.setState({ currentUser: SessionStore.currentUser() });
  },

  render () {

    return(
      <div className="app-div">
        <NavBar />
        { this.props.children }
        <PlayBar />
      </div>
    );
  }

});

module.exports = App;
