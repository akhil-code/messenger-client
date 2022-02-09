import React, { Component } from "react";
import { InputGroup, Input, Button, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Message } from '../types/Chat'
import { AppContext } from "../context/appContext";
import WebSocket from "../sockets/webSocket";

interface Props {
    channel: string;
}

interface State {
    message: string;
}

class PublicMessageInput extends Component<Props, State> {
    state = {
        message: "",
    };

    handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            message: event.target.value,
        });
    };

    sendMessageHandler = (event: React.SyntheticEvent, socket?: WebSocket) => {
        event.preventDefault();
        // send message event
        let message = this.state.message;

        if (socket !== undefined && message !== "") {
            let messageEvent: Message = {
                sender: socket.getSocketId(),
                receiver: this.props.channel,
                message: message,
            };

            socket?.sendGroupMessage(messageEvent)
            this.setState({ message: "" });
        }
    };

    render() {
        return (
            <AppContext.Consumer>
                {({context, updateContext}) => (
                    <Row>
                        {context.webSocket !== undefined && 
                            <form>
                                <InputGroup>
                                    <Input
                                        value={this.state.message}
                                        onChange={this.handleMessageChange}
                                        placeholder="Type your message here...."
                                    />
                                    <Button
                                        type="submit"
                                        onClick={(event) => this.sendMessageHandler(event, context.webSocket)}
                                        disabled={this.state.message === ""}
                                        color="success"
                                    >
                                        Send
                                    </Button>
                                </InputGroup>
                            </form>
                        }
                    </Row>
                )}
            </AppContext.Consumer>
        );
    }
}

export default PublicMessageInput;
