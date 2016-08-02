const React = require('react');
const LoginForm = require('./login_form.jsx');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const Link = require('react-router').Link;

var App = React.createClass({

  componentDidMount () {
    SessionStore.addListener(this.forceUpdate.bind(this));
  },

  logout (e) {
    e.preventDefault();
    SessionActions.logoutUser();
  },

  greeting () {
    if (SessionStore.isUserLoggedIn()) {
      return(
        <div>
          <h3>What's up, { SessionStore.currentUser().username }? Let's groove!</h3>
          <button onClick={ this.logout }>Log Out</button>
        </div>
      );
    } else {
      return(
        <div>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      );
    }
  },



  render () {

    return(
      <div>
        <h1>Welcome to U Like Music? I Like Music Too! Let's Make Out!</h1>
        { this.greeting() }
        { this.props.children }
      </div>
    );
  }

});

module.exports = App;
