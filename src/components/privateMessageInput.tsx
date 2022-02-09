import * as React from 'react';
import { InputGroup, Input, Button, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Message } from '../types/message'
import { AppContext, ContextData } from "../context/appContext";
import WebSocket from "../sockets/webSocket";
import Session from '../types/session'
import MessageEvent from '../types/messageEvent'

interface Props {
    receiver: Session;
}

interface State {
    message: string;
}
 
class PrivateMessageInput extends React.Component<Props, State> {
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
            // update local cache with new message
            let context: ContextData = this.context.context;
            let updateContext = this.context.updateContext;
            
            let messageEvent: MessageEvent = {
                sender: context.session!,
                receiver: this.props.receiver,
                message,
            };

            context.groupMessages = this.storeMessageEvent(messageEvent, context.groupMessages)
            updateContext(context)
            
            // send message to server.
            socket?.sendPrivateMessage(messageEvent)
            // event.target.dispatchEvent(new Event('scroll'))
            window.scrollY = 10000

            this.setState({ message: "" });
            
        }

    };

    storeMessageEvent = (messageEvent: MessageEvent, messageMap?: Map<string, Array<MessageEvent>>) => {
        if(messageMap !== undefined) {
            if(messageMap.has(messageEvent.receiver.sessionId!)) {
                messageMap.get(messageEvent.receiver.sessionId!)?.push(messageEvent)
            } else {
                messageMap.set(messageEvent.receiver.sessionId!, [messageEvent])
            }
        }
        return messageMap
    }


    render() { 
        return (
            <AppContext.Consumer>
                {({context}) => (
                    <Row style={ {position: "fixed", bottom: "20px", left: "20px", right: "20px"} }>
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
PrivateMessageInput.contextType = AppContext
 
export default PrivateMessageInput;