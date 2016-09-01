const React = require('react');
const Link = require('react-router').Link;
const ErrorStore = require('../stores/error_store');
const ErrorActions = require('../actions/error_actions');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const FormConstants = require('../constants/form_constants');

var LoginForm = React.createClass({

  contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState () {
    return { username: '', password: '' };
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount () {
    this.errorListener.remove();
    this.sessionListener.remove();
    ErrorActions.clearErrors();
  },

  redirectIfLoggedIn () {
    this.context.router.push("/");
  },

  formErrors () {
    let errorString;

    if (this.props.location.pathname === "/login") {
      errorString = FormConstants.LOGIN_FORM;
    } else {
      errorString = FormConstants.SIGNUP_FORM;
    }

    let errors = ErrorStore.errors(errorString) || [];
    if (errors.length > 0) {

      let errorMessages = errors.map( (error, key) => {
        return <li className="form-error" key={ key }>{ error }</li>;
        });

        return <ul>{ errorMessages }</ul>;
    }
  },

  handleSubmit (e) {
    e.preventDefault();
    if (this.props.location.pathname === "/login") {
      SessionActions.loginUser(this.state);
    } else {
      SessionActions.createUser(this.state);
    }
  },

  loginGuest (e) {
    e.preventDefault();
    SessionActions.loginUser({ username: 'guest', password: 'password123'});
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
    let navLink;
    let formName;
    if (this.props.location.pathname === '/login') {
      navLink = <Link className="other-form-link form-hover" to="/signup">Sign Up instead</Link>;
      formName = "Log In";
    } else {
      navLink = <Link className="other-form-link form-hover" to="login">Log In instead</Link>;
      formName = "Sign Up";
    }

    return(
      <div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="login-form-title">{formName}</div>
          { this.formErrors() }
          <div className="login-input">
            <input className="input"
              placeholder="Username"
              value={this.state.username}
                onChange={this.handleUsername}/>
          </div>
          <br/>
          <div className="login-input">
            <input className="input"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}/>
          </div>
          <button className="login-button form-hover">Submit</button>
          { navLink }
          <button className="login-button form-hover" onClick={this.loginGuest}>Log In As Guest</button>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
