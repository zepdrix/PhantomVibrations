const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');


var CurrentUserProfile = React.createClass({
  getInitialState () {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.onChange);
    SessionActions.fetchCurrentUser();
  },

  componentWillUnmount () {
    this.sessionListen.remove();
  },

  onChange () {
    this.setState({ currentUser: SessionStore.currentUser() });
  },

  render () {

    return(
      <div>
        <form>


        </form>
      </div>
    );

  }


});


module.exports = CurrentUserProfile;
