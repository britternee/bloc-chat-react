import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super (props);
        this.state = {
            messages: [],
            message: {
                content: '',
                roomId: '',
                username: '',
                sentAt: ''
            }
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

    createMessages(e) {
        e.preventDefault();
        this.messagesRef.push({
            content: this.state.message.content,
            roomId: this.props.activeRoom.key,
            username: this.props.user ? this.props.user.displayName : "Guest",
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
        this.setState({
            message:{
                content: '',
                roomId: '',
                username: '',
                sentAt: ''
            }
        })
    }

    handleEvent(e) {
        this.setState({
            message:{
                content: e.target.value
            }
        })}

    render(){
        return(
            <div className="message-area">
                <ul>
                {this.state.messages.map((message, index)  => {
                    if (this.props.activeRoom && (message.roomId === this.props.activeRoom.key)) {
                        return (
                        <li key={index}> {message.username} {message.sentAt}: {message.content}</li>)
                } else {
                    return null
            }})
            }
                </ul>
                <form onSubmit={(e) => this.createMessages(e)}>
                    <input type="text" placeholder="Type New Message" value={this.state.message.content} onChange={(e) => this.handleEvent(e)} />
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Send</button>
                </form>
            </div>
        );
}
}

export default MessageList;