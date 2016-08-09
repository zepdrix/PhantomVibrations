const React = require('react');
const Link = require('react-router').Link;
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const TimeChange = require('../helpers/time_conversion.js');

var CommentIndexItem = React.createClass({

  render () {
    let userUrl = `users/${this.props.comment.user_id}`;
    return(
      <li>
        <div>
          <Link to={ userUrl } >{ this.props.comment.username } says: </Link>
          { this.props.comment.body }
        </div>
      </li>
    );
  }

});


module.exports = CommentIndexItem;
