import * as React from "react";
import { Row, Col, ListGroup, ListGroupItem, Button } from "reactstrap";

interface Props {}

interface State {
    availableUsersList: Array<string>;
}

class OnlineUsers extends React.Component<Props, State> {
    state = {
        availableUsersList: [],
    };

    componentDidMount() {
        this.fetchAllAvailableUsers();
    }

    fetchAllAvailableUsers = () => {
        console.log("fetching users from server at /sockets");
        const { REACT_APP_BACKEND_SERVER_DOMAIN } = process.env;
        fetch(`${REACT_APP_BACKEND_SERVER_DOMAIN}/sockets`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    ...this.state,
                    availableUsersList: res,
                });
            });
    };

    render() {
        return (
            <Row>
                <Col>
                    <ListGroup>
                        <ListGroupItem action active href="#" tag="button">
                            Online users
                        </ListGroupItem>
                        {this.state.availableUsersList.map((user) => (
                            <ListGroupItem key={user}>
                                <Row>
                                    <Col xs="10">{user}</Col>
                                    <Col xs="2">
                                        <Button color="dark" outline size="sm">
                                            Chat
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        );
    }
}

export default OnlineUsers;
