const React = require('react');
const ErrorStore = require('../stores/error_store.js');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');

var LoginForm = React.createClass({

  contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState () {
    return { username: '', password: '', errors: []};
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
    // this.formErrorHandler = ErrorStore.addListener(this.formErrors);
  },

  componentWillUnmount () {
    this.errorListener.remove();
    this.sessionListener.remove();
    // this.formErrorHandler.remove();
  },

  redirectIfLoggedIn () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

  formErrors () {
    let errors = ErrorStore.errors('login form') || [];
    if (errors.length > 0) {

      let errorMessages = errors.map( (error, key) => {
        return <li key={ key }>{ error }</li>;
        });

        return <ul>{ errorMessages }</ul>;
    }
    // this.setState({ errors: ErrorStore.errors('login form') });
  },

  formSubmit (e) {
    e.preventDefault();
    SessionActions.loginUser(this.state);
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
        { this.formErrors() }
        <form onSubmit={this.formSubmit}>
          <input value={this.state.username} onChange={this.handleUsername}/>
          <input type="password" value={this.state.password} onChange={this.handlePassword}/>
          <button>Submit</button>
        </form>
      </div>
    );
  }
});


module.exports = LoginForm;
