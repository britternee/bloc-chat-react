import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super (props);
        this.state = {
            messages: []
        }
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
    }

    render(){
        return(
            <div>
                <ul>
                {this.state.messages.map((message, index)  => {
                   return (
                   <li key={index}> {message.username} {message.sentAt}: {message.content}</li>)
               })
            }
               </ul>
            </div>
        );
}
}

export default MessageList;