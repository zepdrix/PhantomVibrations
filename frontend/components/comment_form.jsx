const React = require('react');
const CommentActions = require('../actions/comment_actions.js');
const CommentStore = require('../stores/comment_store.js');
const ErrorStore = require('../stores/error_store.js');
const FormConstants = require('../constants/form_constants.js');
const TrackStore = require('../stores/track_store.js');

var CommentForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState () {
    return { body: '' };
  },

  componentDidMount () {
  
  },

  handleBody (e) {
    e.preventDefault();
    this.setState({ body: e.target.value });
  },

  handleSubmit (e) {
    let trackPercentage;
    if (TrackStore.currentTrack().id === this.props.track.id) {
      let currentTrack = TrackStore.currentTrack();
      trackPercentage = currentTrack.currentTime / currentTrack.duration;
    } else {
      trackPercentage = Math.random();
    }

    // console.log(trackPercentage);

    e.preventDefault();
    CommentActions.createComment({
      body: this.state.body,
      track_id: this.props.track.id,
      track_percentage: trackPercentage
    });
    this.setState({ body: '' });
    TrackActions.fetchAllTracks();
  },

  render () {
    console.log(TrackStore.currentTrack());

    return(
      <div>
        <form className="comment-form" onSubmit={ this.handleSubmit }>
          <div className="comment-input">
            <input
              placeholder="Write a comment"
              value={ this.state.body }
              onChange={ this.handleBody }/>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = CommentForm;
