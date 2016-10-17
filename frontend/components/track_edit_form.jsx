const React = require('react');
const TrackStore = require('../stores/track_store');
const TrackActions = require('../actions/track_actions');
const ErrorStore = require('../stores/error_store');
const ErrorActions = require('../actions/error_actions');
const FormConstants = require('../constants/form_constants');


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
      imageFile: null,
      spinner: "edit-track-button form-hover"};
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.trackListener = TrackStore.addListener(this.redirectIfTrackSaved);
  },

  componentWillUnmount () {
    this.trackListener.remove();
    this.errorListener.remove();
    setTimeout(() => { ErrorActions.clearErrors(); }, 1000);
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

    this.addSpinner();

    TrackActions.updateTrack(formData, this.removeSpinner);

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

  addSpinner () {
    this.setState({ spinner: "loader edit" });
  },

  removeSpinner () {
    this.setState({ spinner: "edit-track-button form-hover" });
  },

  render () {
    return(
      <form className="edit-track-form" encType="multipart/form-data" onSubmit={ this.handleSubmit }>
        <h3 className="edit-track-form-title">Edit Track</h3>
        { this.formErrors() }
        <fieldset className="login-input">
          <label for="track-title" className="form-label">
            Title
          </label>
          <input id="track-title" className="input"
            placeholder="Track Title"
            value={ this.state.title }
            onChange={ this.handleTitle }
          />
        </fieldset>
        <br/>
        <div className="login-input">
          <label className="form-label">
            Description
          </label>
          <textarea className="input"
            value={ this.state.description }
            onChange={ this.handleDescription }
          />
        </div>

        <fieldset className="login-input">
          <div className="form-label">
            Update your track image!
          </div>
          <input type="file" onChange={ this.handleImage }/>
          <br/>
          <img className="form-image" src={ this.state.imageUrl }/>
        </fieldset>

        <button className={ this.state.spinner }>Update</button>
      </form>
    );
  }
});

module.exports = TrackEditForm;
