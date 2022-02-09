import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { ListGroupItem, ListGroup, Row, Badge } from "reactstrap";
import { AppContext } from '../context/appContext'
import Session from '../types/session.js'
import MessageEvent from '../types/messageEvent.js';

interface Props {
    receiver?: Session;
}

interface State {}

class PrivateChatHistory extends React.Component<Props, State> {
    
    renderConversation = (conversation?: Array<MessageEvent>) => {
        return conversation?.map((item: MessageEvent) => (
            <ListGroupItem key={uuidv4()}>
                <Badge>{item.sender.username}</Badge> : {item.message}
            </ListGroupItem>
        ));
    };

    render() {
        return (
            <AppContext.Consumer>
                {({context}) => (
                    <Row>
                        <h3>{this.props?.receiver?.username}</h3>
                        <ListGroup>
                            {this.renderConversation(context.groupMessages?.get(this.props.receiver?.sessionId!))}
                        </ListGroup>
                    </Row>
                )}
            </AppContext.Consumer>
        );
    }
}
PrivateChatHistory.contextType = AppContext
export default PrivateChatHistory;
