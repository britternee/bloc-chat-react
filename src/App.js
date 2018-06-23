import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <h2>Chat Rooms</h2>
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
