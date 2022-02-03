import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { ListGroupItem, ListGroup, Row, Badge } from "reactstrap";
import { Message } from '../types/Chat.js';
import { AppContext } from '../context/appContext'

interface Props {
    channel?: string;
}

interface State {
    pastConversation: Array<Message>;
}

class Conversation extends React.Component<Props, State> {

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

        const { REACT_APP_BACKEND_SERVER_DOMAIN } = process.env
        fetch(`${REACT_APP_BACKEND_SERVER_DOMAIN}/chat-history`, requestOptions)
        .then(res => res.json())
        .then(res => {
            this.setState({
                ...this.state,
                pastConversation: res
            })
        })
    }

    renderPastConversation = () => {
        return this.state.pastConversation.map((item) => (
            <ListGroupItem key={uuidv4()}>
                <Badge>{item.sender}</Badge> : {item.message}
            </ListGroupItem>
        ));
    }

    renderConversation = (conversation?: Array<Message>) => {
        return conversation?.map((item) => (
            <ListGroupItem key={uuidv4()}>
                <Badge>{item.sender}</Badge> : {item.message}
            </ListGroupItem>
        ));
    };

    render() {
        return (
            <AppContext.Consumer>
                {({context, updateContext}) => (
                    <Row>
                        <h3>Conversation</h3>
                        <ListGroup>
                            {this.renderPastConversation()}
                            {this.renderConversation(context.groupMessages?.get(this.props.channel!))}
                        </ListGroup>
                        {context.webSocket?.addToRoom(context.selectedLocation!, this.props.channel!)}
                    </Row>
                )}
            </AppContext.Consumer>
        );
    }
}
Conversation.contextType = AppContext

export default Conversation;
