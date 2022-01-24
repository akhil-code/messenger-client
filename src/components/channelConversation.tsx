import React, { Component } from "react";
import MessageEditor from "./messageEditor";
import SocketHandler from "./socketHandler";
import Conversation from "./conversation";
import { Socket } from "socket.io-client";

interface Props {}

interface Message {
    message: string,
    sender: string
}

interface State {
    socket?: Socket
    conversation: Array<Message>
}

class ChannelConversation extends Component<Props, State> {
    state = {
        socket: undefined,
        conversation: []
    }

    updateSocket = (socket?: Socket) => {
        this.setState({
          ...this.state,
          socket
        })
    }

    getAvailableRooms = () => {
        // make call to backend
    }

    addToConversation = (newMessage: Message) => {
        this.setState({
            ...this.state,
            conversation: [...this.state.conversation, newMessage]
        })
    }

    render() {
        return (
            <React.Fragment>
                <SocketHandler updateSocket={this.updateSocket} socket={this.state.socket} addToConversation={this.addToConversation} />
                <Conversation conversation={this.state.conversation} />
                <br/>
                <MessageEditor socket={this.state.socket} />
            </React.Fragment>
        );
    }
}

export default ChannelConversation;
