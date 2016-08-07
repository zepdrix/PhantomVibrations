const React = require('react');
const CommentActions = require('../actions/comment_actions.js');
const CommentStore = require('../stores/comment_store.js');
const ErrorStore = require('../stores/error_store.js');
const FormConstants = require('../constants/form_constants.js');

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
    e.preventDefault();
    CommentActions.createComment({
      body: this.state.body,
      track_id: this.props.track.id,
      track_percentage: 0.23
    });
    this.setState({ body: '' });
    TrackActions.fetchAllTracks();
  },

  render () {

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
