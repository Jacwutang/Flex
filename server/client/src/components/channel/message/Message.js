import React, { Component } from 'react';
import {connect} from 'react-redux';
import socketIOClient from "socket.io-client";

import './message.css';
import MessageListItem from './messageListItem';

class Message extends Component {

  constructor(props){
    super();
    this.state = {
      input: "",
      messages: ["hey man", "yo what up"],
      loaded: false
    }

    this.handleInput = this.handleInput.bind(this);
    this.send = this.send.bind(this);
    // this.renderConversations = this.renderConversations.bind(this);

  }

  componentDidMount(){

    //fetch all Messages in this chatroom.
    
    //this.props.fetchMessages(channel_id)
    // then setstate loaded: true
    //setState Messages
  }


  renderConversations(){
    console.log("HERE",this.state.messages);
    return(
      <ul>
      { this.state.messages.map( (message) => (
        <MessageListItem
        key={message.id}
        author={message.author}
        body={message.body}
        timestamp={message.timestamp}/>
      )) }
      </ul>
    );



 }




  handleInput(field){
    return(
      (e) => this.setState({[field]: e.target.value})
    );
  }

  send(e){
    e.preventDefault();
    const socket = socketIOClient("http://localhost:5000");
    window.alert("SUBMITEED");
    socket.emit('chat message', this.state.input);

    //create a new message

  }


  render(){
    //if loading, then spin
    // if(!this.state.loading){
    //  <Spinner />
    //}

    return(

      <div className="col s10">

        <div className="top-row">

        Top Row

        </div>


        {this.renderConversations()}


        <div className="bottom-row">
          <form onSubmit={this.send} className="msg-input-wrapper">
            <button type="button" className="msg-input-gif"> Click </button>
            <input
            id="msg-input"
            value={this.state.input}
            onChange={this.handleInput('input')} />

          </form>


        </div>
      </div>

    );
  }


}

export default connect(mapStateToProps,mapDispatchToProps)(Message);

function mapStateToProps(state){
  return (
    {
      // messages: state.messages
    }
  );

};


function mapDispatchToProps(dispatch){
  return(
    {

    }
  )

};
