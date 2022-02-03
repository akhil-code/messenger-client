import * as React from "react";
import { Row, Col, Badge, CardTitle, ListGroup, ListGroupItem, Button, Card, CardBody } from "reactstrap";
import { v4 as uuidv4 } from 'uuid'

interface Props {}

interface State {
    // key is the location, values is list of users.
    usersMap: Map<string, Array<string>>
}

class OnlineUsers extends React.Component<Props, State> {
    state = {
        usersMap: new Map<string, Array<string>>(),
    };

    componentDidMount() {
        this.fetchAllAvailableUsers();
    }

    fetchAllAvailableUsers = () => {
        console.log("fetching users from server at /online-users");
        const serverDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN;
        fetch(`${serverDomain}/online-users`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({...this.state, usersMap: res})
            });
    };

    renderUsersOfLocation = (location: string, users: Array<string>) => {
        if(users.length > 0) {
            return (
                <ListGroup key={location}>
                    {this.renderLocation(location, users.length)}
                    {this.renderUsers(users)}
                    <br/>
                </ListGroup>
            )
        } else {
            return <></>
        }
    }

    renderLocation = (location: string, userCount: number) => {
        return (
            <ListGroupItem action active key={uuidv4()}>
                {location} <Badge color="danger" pill>{userCount}</Badge>
            </ListGroupItem>
        )
    }

    renderUsers = (users: Array<string>) => {
        return users.map(user => (
            <ListGroupItem key={uuidv4()}>
                <Row>
                    <Col xs="10">{user}</Col>
                    <Col xs="2">
                        <Button color="dark" outline size="sm">
                            Chat
                        </Button>
                    </Col>
                </Row>
            </ListGroupItem>
        ));
    }

    render() {
        return (
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h2"> Online users</CardTitle>
                            {Object.entries(this.state.usersMap).map(entry => (
                                this.renderUsersOfLocation(entry[0], entry[1])
                            ))}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default OnlineUsers;
