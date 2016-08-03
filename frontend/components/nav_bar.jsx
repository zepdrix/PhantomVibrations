const React = require('react');
const Link = require('react-router').Link;
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
    this.setState({ currentUser: SessionStore.currentUser() });
  },

  greeting () {

    if (!this.state.currentUser.id) {
      return(
        <nav>
          <Link to="/login" className="navbar-login">Log In</Link>
          <Link to="/signup" className="navbar-signup">Sign Up</Link>
        </nav>
      );
    } else {
      return(
        <div>
          <button className="navbar-logout" onClick={ this.logout }>Log Out</button>
        </div>
      );
    }
  },

  logout (e) {
    e.preventDefault();
    SessionActions.logoutUser();
  },

  render () {
    let barWords;

    if (!!this.state.currentUser.id) {
      barWords = "Sup, " + this.state.currentUser.username;
    } else {
      barWords = '';
    }


    return (
      <header className="navbar">
        <nav className="navbar-content">

          <Link to='/' className="navbar-home">Home</Link>
          <a href="#"className="navbar-collection">Collection</a>
          { this.greeting() }
          <div className="navbar-words">{ barWords }</div>
        </nav>

      </header>
    );
  }


});


module.exports = NavBar;
