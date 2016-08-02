const React = require('react');
const LoginForm = require('./login_form.jsx');
const SessionStore = require('../stores/session_store.js');

var App = React.createClass({

  greeting () {
  if (SessionStore.isUserLoggedIn()) {
      return(
        <h3>What's up, { SessionStore.currentUser().username }? Let's groove!</h3>
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
