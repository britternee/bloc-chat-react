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

    convertTimestamp(timestamp) {
        var d = new Date(timestamp),	// Convert the passed timestamp to milliseconds
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
            dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
            ampm = 'AM',
            time;
	    if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
	    } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
	    } else if (hh === 0) {
		    h = 12;
	}

        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
        console.log(time)
        return time;
    }


    createMessages(e) {
        e.preventDefault();
        this.messagesRef.push({
            content: this.state.message.content,
            roomId: this.props.activeRoom.key,
            username: this.props.user ? this.props.user.displayName : "Guest",
            //this sentAT is giving me incorrect date and time
            sentAt: this.convertTimestamp(Date.now())
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