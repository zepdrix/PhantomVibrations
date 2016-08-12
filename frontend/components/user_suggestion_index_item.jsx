const React = require('react');
const Link = require('react-router').Link;


var UserSuggestionIndexItem = React.createClass({


  render () {

    return(
      <div className="user-suggestion-index-item">
        <Link to={ `/users/${this.props.user.id}` } >

          <img className="user-suggestion avatar-image" src={ this.props.user.avatar_image_url } />
        </Link>
        <Link to={ `/users/${this.props.user.id}` } >
          <div className="user-suggestion username">
            { this.props.user.username }
          </div>
        </Link>
      </div>

    );


  }


});



module.exports = UserSuggestionIndexItem;
