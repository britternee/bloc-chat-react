import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super (props);
        this.state = {
            rooms: [],
            newRoom: ''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    handleSubmit(e) {
        this.setState({ newRoom: e.target.value });
    }

    createRoom(e) {
        e.preventDefault();
        if (!this.state.newRoom) {return}
        this.roomsRef.push({
        name: this.state.newRoom
    });
        this.setState({newRoom: ''})
    }



    render() {
        return (
            <div>
                <ul className="list-rooms">
                    {this.state.rooms.map((room, index) =>
                    <li key={index} onClick={ () => this.props.selectActiveRoom(room)}>{room.name}</li>)}
                </ul>
                <form className="create-room-form" onSubmit={ (e) => this.createRoom(e) }>
                    <input type="text" placeholder="Enter New Room Name" value={ this.state.newRoom } onChange={ (e) => this.handleSubmit(e) } />
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent">Create New Room</button>
                </form>
            </div>
        );
}
}

export default RoomList;
