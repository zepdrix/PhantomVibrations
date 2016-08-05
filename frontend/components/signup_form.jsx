const React = require('react');
const ErrorStore = require('../stores/error_store.js');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');

var SignupForm = React.createClass({

  contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState () {
    return { username: '', password: '' };
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount () {
    this.sessionListener.remove();
  },

  redirectIfLoggedIn () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

  formSubmit (e) {
    e.preventDefault();
    SessionActions.createUser(this.state);
  },


  handleUsername (e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  },

  handlePassword(e) {
    e.preventDefault();
    this.setState({ password: e.target.value });
  },

  render () {
    return(
      <div>
        <h3>Create a Username!</h3>
        <form onSubmit={this.formSubmit}>
          <label>Username
            <br/>
            <input value={this.state.username} onChange={this.handleUsername}/>
          </label>

          <br/>

          <label>Password
            <br/>
            <input type="password" value={this.state.password} onChange={this.handlePassword}/>
          </label>

          <br/>

          <button>Submit</button>
        </form>
      </div>
    );
  }
});


module.exports = SignupForm;
