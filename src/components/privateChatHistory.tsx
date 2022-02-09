import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { ListGroupItem, ListGroup, Row, Badge } from "reactstrap";
import { Message } from '../types/Chat.js';
import { AppContext } from '../context/appContext'

interface Props {
    channel?: string;
}

interface State {}

class PrivateChatHistory extends React.Component<Props, State> {
    
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
                {({context}) => (
                    <Row>
                        <h3>{this.props.channel}</h3>
                        <ListGroup>
                            {this.renderConversation(context.groupMessages?.get(this.props.channel!))}
                        </ListGroup>
                    </Row>
                )}
            </AppContext.Consumer>
        );
    }
}
PrivateChatHistory.contextType = AppContext
export default PrivateChatHistory;
