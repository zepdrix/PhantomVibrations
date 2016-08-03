const React = require('react');
const LoginForm = require('./login_form.jsx');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const Link = require('react-router').Link;

const NavBar = require('./nav_bar.jsx');

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
      <div>
        <NavBar />
        <h1>PhantomVibrations</h1>
        { this.props.children }
      </div>
    );
  }

});

module.exports = App;
