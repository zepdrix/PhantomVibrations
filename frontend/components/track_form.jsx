const React = require('react');
const TrackActions = require('../actions/track_actions.js');
const TrackStore = require('../stores/track_store.js');
const ErrorStore = require('../stores/error_store.js');
const FormConstants = require('../constants/form_constants.js');


var TrackForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return { title: '', description: '' };
  },

  componentDidMount () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.trackListener = TrackStore.addListener(this.redirectIfTrackSaved);
  },

  componentWillUnmount () {
    this.errorListener.remove();
    this.trackListener.remove();
  },

  redirectIfTrackSaved() {
    this.context.router.push("/");
  },

  handleTitle (e) {
    this.setState({ title: e.target.value });
  },

  handleDescription (e) {
    this.setState({ description: e.target.value });
  },

  handleSubmit (e) {
    e.preventDefault();
    TrackActions.createTrack(this.state);
  },

  formErrors () {
    let errors = ErrorStore.errors(FormConstants.CREATE_TRACK_FORM) || [];
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
        <form className="create-track-form" onSubmit={ this.handleSubmit }>
          <div className="login-form-title">Upload a Track</div>
          { this.formErrors() }
          <div className="login-input">
            <input className="input"
              placeholder="Track Title"
              value={this.state.title}
                onChange={this.handleTitle}/>
          </div>
          <br/>
          <div className="login-input">
            <textarea className="input"
              placeholder="Track Description"
              value={this.state.description}
              onChange={this.handleDescription}/>
          </div>
          <button className="create-track-button form-hover">Submit</button>
        </form>
      </div>
    );
  }
});


module.exports = TrackForm;
