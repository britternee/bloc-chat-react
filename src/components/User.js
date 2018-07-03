import React, { Component } from 'react';

class User extends Component {

    userSignIn(){
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    userSignOut(){
        this.props.firebase.auth().signOut();
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    render() {
        return (
            <div className="user-auth">
                <h4>Hello, {this.props.user ? this.props.user.displayName : "Guest"}!</h4>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={() => this.userSignIn()}>Sign in with Google</button>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" onClick={() => this.userSignOut()}>Sign out</button>
            </div>
        )
    }
}

export default User;