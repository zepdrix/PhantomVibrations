const React = require('react');
const TrackStore = require('../stores/track_store.js');
const TrackActions = require('../actions/track_actions.js');
const ErrorStore = require('../stores/error_store.js');
const FormConstants = require('../constants/form_constants.js');


var TrackEditForm = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

  getInitialState () {
    let track = TrackStore.find(parseInt(this.props.params.trackId));
    let trackDescription = '';
    let trackImageUrl = '';
    if (track.description) {
      trackDescription = track.description;
    }
    if (track.image_url) {
      trackImageUrl = track.image_url;
    }
    return {
      title: track.title,
      description: trackDescription,
      imageUrl: trackImageUrl,
      imageFile: null };
  },

  componentDidMount () {
    this.trackListener = TrackStore.addListener(this.redirectIfTrackSaved);
  },

  redirectIfTrackSaved () {
    this.context.router.push(`/tracks`);
  },

  handleTitle (e) {
    this.setState({ title: e.target.value });
  },

  handleDescription (e) {
    this.setState({ description: e.target.value });
  },

  handleImage (e) {
    let file = e.currentTarget.files[0];
    let fileReader = new FileReader();

    fileReader.onloadend = function () {
      this.setState({ imageFile: file, imageUrl: fileReader.result });
    }.bind(this);

    if (file) {
      fileReader.readAsDataURL(file);
    }
  },

  handleSubmit (e) {
    e.preventDefault();
    let formData = new FormData();

    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);
    formData.append("track[id]", this.props.params.trackId);

    if (this.state.imageFile) {
      formData.append("track[image]", this.state.imageFile);
    }

    TrackActions.updateTrack(formData);
  },

  formErrors () {
    let errors = ErrorStore.errors(FormConstants.EDIT_TRACK_FORM) || [];
    if (errors.length > 0) {
      let errorMessages = errors.map( (error, key) => {
        return <li className="form-error" key={ key }>{ error }</li>;
        });

        return <ul>{ errorMessages }</ul>;
    }
  },

  render () {
    return(
      <div>
        <form className="edit-track-form" encType="multipart/form-data" onSubmit={ this.handleSubmit }>
          <div className="edit-track-form-title">Edit Track</div>
          { this.formErrors() }
          <div className="login-input">
            <div className="form-label">Title
            </div>
            <input className="input"
              placeholder="Track Title"
              value={ this.state.title }
                onChange={ this.handleTitle }/>
          </div>
          <br/>
          <div className="login-input">
            <div className="form-label">Description
            </div>
            <textarea className="input"


              value={ this.state.description }
              onChange={ this.handleDescription }/>
          </div>

          <div className="login-input">
            <div className="form-label">Update your track image!
            </div>
            <input type="file" onChange={ this.handleImage }/>
            <br/>
            <img className="form-image" src={ this.state.imageUrl }/>
          </div>

          <button className="create-track-button form-hover">Update</button>
        </form>
      </div>
    );
  }
});







module.exports = TrackEditForm;
