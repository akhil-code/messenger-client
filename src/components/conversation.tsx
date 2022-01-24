import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { ListGroupItem, ListGroup, Row, Badge } from "reactstrap";

interface Message {
    message: string;
    sender: string;
}

interface Props {
    conversation: Array<Message>;
}

interface State {
    pastConversation: Array<Message>;
}

class Conversation extends React.Component<Props, State> {

    state = {
        pastConversation: new Array<Message>()
    }

    componentDidMount() {
        const { REACT_APP_BACKEND_SERVER_DOMAIN } = process.env
        fetch(`${REACT_APP_BACKEND_SERVER_DOMAIN}/chat-history`)
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

    renderConversation = () => {
        return this.props.conversation.map((item) => (
            <ListGroupItem key={uuidv4()}>
                <Badge>{item.sender}</Badge> : {item.message}
            </ListGroupItem>
        ));
    };

    render() {
        return (
            <Row>
                <h3>Conversation</h3>
                <ListGroup>
                    {this.renderPastConversation()}
                    {this.renderConversation()}
                </ListGroup>
            </Row>
        );
    }
}

export default Conversation;
