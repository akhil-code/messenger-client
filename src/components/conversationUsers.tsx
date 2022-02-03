import * as React from "react";
import { AppContext } from "../context/appContext";
import { Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

interface Props {
    channel: string;
}

interface State {}

class ConversationUsers extends React.Component<Props, State> {
    render() {
        return (
            <AppContext.Consumer>
                {({ context, updateContext }) => (
                    <Row>
                        <Col>
                            <br />
                            <h2>Online users</h2>
                            <ListGroup>
                                {context.onlineUsers?.get(this.props.channel)?.map((user) => (
                                    <ListGroupItem key={uuidv4()}>
                                        {user}
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                )}
            </AppContext.Consumer>
        );
    }
}
ConversationUsers.contextType = AppContext;

export default ConversationUsers;
