const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');

var NavBar = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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

  navLeft () {
    if (SessionStore.isUserLoggedIn()) {
      return(
        <div>
          <Link to='/' className="navbar-home">Home</Link>
          <a href="#"className="navbar-collection">Collection</a>
        </div>
      );
    } else {
      return(
        <div>
          <Link to='/' className="navbar-home">Home</Link>
          <a href="#"className="navbar-collection">Collection</a>
        </div>
      );
    }
  },

  logout (e) {
    e.preventDefault();
    SessionActions.logoutUser();
    this.context.router.push('/login');
  },

  navRight () {
    if (SessionStore.isUserLoggedIn()) {
      return(
        <div>
          <button className="navbar-logout" onClick={ this.logout }>Log Out</button>
          <Link to='/upload' className="navbar-upload">Upload</Link>
          <Link to='#' className="navbar-words">Sup, { this.state.currentUser.username }</Link>
        </div>
      );
    } else {
      return(
        <div>
          <nav>
            <Link to="/login" className="navbar-login">Log In</Link>
            <Link to="/signup" className="navbar-signup">Sign Up</Link>
          </nav>
      </div>
      );
    }
  },


  render () {
    return (
      <header className="navbar">
        <nav className="navbar-content">
          { this.navLeft() }
          { this.navRight() }
        </nav>
      </header>
    );
  }
});


module.exports = NavBar;
