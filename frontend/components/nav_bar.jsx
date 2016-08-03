const React = require('react');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');

var NavBar = React.createClass({
  getInitialState () {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.updateUser);

      SessionActions.fetchCurrentUser();
    
  },

  updateUser () {
    if (this.isMounted()) {
      this.setState({ currentUser: SessionStore.currentUser() });
    }
  },

  render () {
    let barWords;
    if (this.state.currentUser !== {}) {
      barWords = this.state.currentUser.username;
    }
    return (
      <div>
        current user is: { barWords }
      </div>
    );
  }


});


module.exports = NavBar;
