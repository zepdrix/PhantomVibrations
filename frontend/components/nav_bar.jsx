const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

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
          <Link to='/' className="navbar-home nav-bar-left">Home</Link>
          <Link to='/tracks' className="navbar-collection nav-bar-left">Collection</Link>
        </div>
      );
    } else {
      return(
        <div>
          <Link to='/' className="navbar-home nav-bar-left">Home</Link>
          <a href="/"className="navbar-collection nav-bar-left">Collection</a>
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
      let userEditUrl = `/users/${this.state.currentUser.id}/edit`;
      return(
        <div>
          <button className="navbar-logout nav-bar-right" onClick={ this.logout }>Log Out</button>
          <Link to='/upload' className="navbar-upload nav-bar-right">Upload</Link>
          <Link to={ userEditUrl } className="navbar-words nav-bar-right group">Sup, { this.state.currentUser.username }</Link>
          <ul className="navbar-words  group nav-bar-right notifications">
            <li><Link to={ userEditUrl }>Profile</Link></li>
            <li><Link to={ userEditUrl }>Tracks</Link></li>
          </ul>
        </div>
      );
    } else {
      return(
        <div>
          <nav>
            <Link to="/login" className="navbar-login nav-bar-right">Log In</Link>
            <Link to="/signup" className="navbar-signup nav-bar-right">Sign Up</Link>
          </nav>
      </div>
      );
    }
  },


  render () {
    return (
      <header className="navbar group">
        <nav className="navbar-content">
          { this.navLeft() }
          { this.navRight() }
        </nav>
      </header>
    );
  }
});


module.exports = NavBar;
