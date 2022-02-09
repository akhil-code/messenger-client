import * as React from "react";
import { AppContext } from "../context/appContext";
import { Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

interface Props {
    channel: string;
}

interface State {}

class PublicConversationUsers extends React.Component<Props, State> {
    render() {
        return (
            <AppContext.Consumer>
                {({ context, updateContext }) => (
                    <Row>
                        {context.webSocket !== undefined && 
                            <Col>
                                <br />
                                <h2>Online users</h2>
                                <ListGroup>
                                    {context.onlineUsers?.get(this.props.channel)?.map((user) => (
                                        <ListGroupItem key={uuidv4()}>
                                            <Row>
                                                <Col xs="10">{user}</Col>
                                                <Col xs="2">
                                                    <Link to={`/conversation/private/${user}`}>
                                                    </Link>
                                                    <Button color="dark" outline size="sm">
                                                        Chat
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </Col>
                        }
                    </Row>
                )}
            </AppContext.Consumer>
        );
    }
}
PublicConversationUsers.contextType = AppContext;

export default PublicConversationUsers;
