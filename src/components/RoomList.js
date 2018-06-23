import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super (props);
        this.state = {
            rooms: []
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room )})
        });
    }

    createRoom = (e) => {this.setState({ newRoomName: e.target.value });
    }

    handleSubmit = (newRoomName) => {
    this.roomsRef.push({
        name: newRoomName
    });
    this.setState({newRoomName: ""});
}

    render() {
        return (
            <div>
                <ul className="list-rooms">
                    {this.state.rooms.map((room) =>
                    <li key={room.key}>{room.name}</li>)}
                </ul>
                <form className="create-room-form" onSubmit={ (e) => {this.handleSubmit(this.state.newRoomName)} }>
                    <input type="text" placeholder="Enter New Room Name" value={this.state.newRoomName} onChange={this.createRoom} />
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Create New Room</button>
                </form>
            </div>
        );
}
}

export default RoomList;