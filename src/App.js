import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA1G4kh7bVf6nqmDd0cK6Zjlk1oyBvYZa8",
    authDomain: "bloc-chat-44358.firebaseapp.com",
    databaseURL: "https://bloc-chat-44358.firebaseio.com",
    projectId: "bloc-chat-44358",
    storageBucket: "bloc-chat-44358.appspot.com",
    messagingSenderId: "483555937106"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super (props);
    this.state = {
        activeRoom: '',
        user: ''
    };
  }

  selectActiveRoom(room) {
    this.setState({activeRoom: room})
  }

  setUser(user) {
    this.setState({user: user})
  }

  render() {
    return (
      <div className="App">
        <h2>Bloc Chat</h2>
        <div className="userlist">
        <User firebase={firebase} user={this.state.user} setUser={ (user) => this.setUser(user)}/>
        </div>
        <div className="roomlist">
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} selectActiveRoom={ (room) => this.selectActiveRoom(room)} />
        </div>
        <div className="messagelist">
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </div>
      </div>
    );
  }
}

export default App;
