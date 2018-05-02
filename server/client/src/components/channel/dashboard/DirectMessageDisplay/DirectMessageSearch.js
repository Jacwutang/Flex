import React, { Component } from 'react';
import 'assets/css/DirectMessageDisplay/directMessageDisplay.css';
import 'assets/css/Message/message.css';


class DirectMessageSearch extends Component{
  constructor(props){
    super(props);
  }

  handleInput(field){

    return( (e) =>
       this.setState({[field]: e.target.value})
    );
  }

  render(){
    return(
      <div className="search-results-container">

      <div className="search-user-selected">

      </div>

      <ul className="search-ul">


      </ul>




      </div>
    );
  }


}

export default DirectMessageSearch;
