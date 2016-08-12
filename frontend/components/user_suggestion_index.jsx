const React = require('react');
const UserStore = require('../stores/user_store');
const UserActions = require('../actions/user_actions');
const UserSuggestionIndexItem = require('./user_suggestion_index_item');


var UserSuggestionIndex = React.createClass({
  getInitialState () {
    return { users: UserStore.allRandomUsers() };
  },

  componentDidMount () {
    this.userListener = UserStore.addListener(this.onChange);
    UserActions.fetchRandomUsers();
  },

  onChange () {
    this.setState({ users: UserStore.allRandomUsers() });
  },

  render () {

    let allRandomUserItems = this.state.users.map( (user) => {
      return <UserSuggestionIndexItem key={ user.id } user={ user }/>;
    });
    return(
      <div>
        { allRandomUserItems }
      </div>
    );
  }
});



module.exports = UserSuggestionIndex;
