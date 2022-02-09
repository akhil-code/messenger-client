import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { ListGroupItem, ListGroup, Row, Badge } from "reactstrap";
import { Message } from '../types/message.js';
import { AppContext } from '../context/appContext'
import MessageEvent from '../types/messageEvent.js'

interface Props {
    channel?: string;
}

interface State {
    pastConversation: Array<Message>;
}

class PublicChatHistory extends React.Component<Props, State> {

    state = {
        pastConversation: new Array<Message>()
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            params: JSON.stringify({
                channel: this.props.channel,
                location: this.context.selectedLocation
            }),
        };

        const serverDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN
        fetch(`${serverDomain}/chat-history`, requestOptions)
        .then(res => res.json())
        .then(res => {
            this.setState({
                ...this.state,
                pastConversation: res
            })
        })
        
        
        let context = this.context.context
        context.webSocket?.addToPublicRoom(context.selectedLocation, this.props.channel)
    }

    renderPastConversation = () => {
        return this.state.pastConversation.map((item) => (
            <ListGroupItem key={uuidv4()}>
                <Badge>{item.sender}</Badge> : {item.message}
            </ListGroupItem>
        ));
    }

    renderConversation = (conversation?: Array<MessageEvent>) => {
        return conversation?.map((item) => (
            <ListGroupItem key={uuidv4()}>
                <Badge>{item.sender.username}</Badge> : {item.message}
            </ListGroupItem>
        ));
    };

    render() {
        return (
            <AppContext.Consumer>
                {({context, updateContext}) => (
                    <Row>
                        <h3>{this.props.channel}</h3>
                        <ListGroup>
                            {this.renderPastConversation()}
                            {this.renderConversation(context.groupMessages?.get(this.props.channel!))}
                        </ListGroup>
                    </Row>
                )}
            </AppContext.Consumer>
        );
    }
}
PublicChatHistory.contextType = AppContext

export default PublicChatHistory;
