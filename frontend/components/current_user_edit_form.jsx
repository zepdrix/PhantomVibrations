const React = require('react');
const Link = require('react-router').Link;
const ErrorStore = require('../stores/error_store.js');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const FormConstants = require('../constants/form_constants.js');


var CurrentUserProfile = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    let potentialUser = SessionStore.currentUser();
    let user = SessionStore.isUserLoggedIn() ? potentialUser : {};
    return {
      username: user.username,
      avatarImageUrl: user.avatar_image_url,
      avatarImageFile: null,
      imageUrl: null };
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = UserStore.addListener(this.redirectIfUserSaved);
  },

  componentWillUnmount () {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  handleUsername (e) {
    e.preventDefault();
    this.setState({ username: e.target.value });
  },

  redirectIfUserSaved () {
    UserActions.fetchAllUsers();
    this.context.router.push(`/users/${SessionStore.currentUser().id}`);
  },

  handleImage (e) {
    let file = e.currentTarget.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = function () {
      this.setState({ avatarImageFile: file, avatarImageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  formErrors () {
    let errors = ErrorStore.errors(FormConstants.EDIT_USER_FORM) || [];
    if (errors.length > 0) {
      let errorMessages = errors.map( (error, key) => {
        return <li className="form-error" key={ key }>{ error }</li>;
        });

        return <ul>{ errorMessages }</ul>;
    }
  },

  handleSubmit (e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("user[username]", this.state.username);
    formData.append("user[id]", SessionStore.currentUser().id);

    if (this.state.avatarImageFile) {
      formData.append("user[avatar_image]", this.state.avatarImageFile);
    }
    UserActions.updateUser(formData);
  },

  render () {
    return(
      <div>
        <form className="edit-user-form" encType="multipart/form-data" onSubmit={ this.handleSubmit }>
          <div className="edit-user-form-title">Edit Your Profile</div>
          { this.formErrors() }
          <div>
            <div className="user-edit">Username
            </div>
            <input className="input"
              value={ this.state.username }
              onChange={ this.handleUsername }/>
          </div>

          <img className="avatar-preview"
            src={ this.state.avatarImageUrl }/>
          <div className="user-edit" >Avatar Image</div>
          <input type="file" className="input" onChange={ this.handleImage }/>

          <button className="update-user-button form-hover">Update</button>
        </form>
      </div>
    );
  }
});

module.exports = CurrentUserProfile;
