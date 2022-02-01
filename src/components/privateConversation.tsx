import * as React from "react";
import { Component } from "react";
import { Socket } from "socket.io-client";

interface Props {
    socket?: Socket;
}

interface State {
    sender: string;
    receiver: string;
    message: string;
}

class PrivateConversation extends React.Component<Props, State> {
    state = {
        sender: "",
        receiver: "",
        message: "",
    };

    handleSenderChangeEvents = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            sender: event.target.value
        })
    }

    handleReceiverChangeEvents = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            receiver: event.target.value
        })
    }

    handleMessageChangeEvents = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            message: event.target.value
        })
    }

    sendMessage = () => {
        console.log(`${this.state.sender} -> ${this.state.receiver} : ${this.state.message}`)

    }

    render() {
        return (
            <div>
                <input placeholder="sender" type="text" onChange={this.handleSenderChangeEvents} value={this.state.sender}></input><br/><br/>
                <input placeholder="receiver" type="text" onChange={this.handleReceiverChangeEvents} value={this.state.receiver}></input><br/><br/>
                <input placeholder="message" type="text" onChange={this.handleMessageChangeEvents} value={this.state.message}></input><br/><br/>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        );
    }
}

export default PrivateConversation;
