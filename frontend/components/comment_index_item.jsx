const React = require('react');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');

var CommentIndexItem = React.createClass({

  render () {

    return(
      <li>
        <div>          
          { this.props.user.username } says:
          { this.props.comment.body }
        </div>
      </li>
    );
  }

});


module.exports = CommentIndexItem;
