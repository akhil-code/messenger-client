import React, { Component } from "react";
import { Socket } from "socket.io-client";
import { InputGroup, Input, Button, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Message } from '../types/Chat'

interface Props {
    socket?: Socket;
}

interface State {
    message: string;
}

class MessageEditor extends Component<Props, State> {
    state = {
        message: "",
    };

    handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            message: event.target.value,
        });
    };

    sendMessageHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        // send message event
        let socket = this.props.socket;
        let message = this.state.message;

        if (socket !== undefined && message !== "") {
            let messageEvent: Message = {
                sender: socket.id,
                receiver: "/",
                message: message,
            };

            socket.emit("groupMessage", messageEvent);
        }
        this.setState({ message: "" });
    };

    render() {
        return (
            <Row>
                <form>
                    <InputGroup>
                        <Input
                            value={this.state.message}
                            onChange={this.handleMessageChange}
                            placeholder="Type your message here...."
                        />
                        <Button
                            type="submit"
                            onClick={this.sendMessageHandler}
                            disabled={this.state.message === ""}
                            color="success"
                        >
                            Send
                        </Button>
                    </InputGroup>
                </form>
            </Row>
        );
    }
}

export default MessageEditor;
