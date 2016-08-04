const React = require('react');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_action.js');

var UserProfile = React.createClass({

  getInitialState () {
    return { user: SessionStore.find(this.props.params.userId) };
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.onChange);
    SessionActions.fetchA();
  },

  componentWillUnmount () {
    this.sessionListener.remove();
  },

  onChange () {
    this.setState({ user: SessionStore.find(this.props.params.userId) });
  },

  render () {
    return(
      <div>

      </div>
    );
  }

});
