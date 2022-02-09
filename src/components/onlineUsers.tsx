import * as React from "react";
import { NavLink } from "react-router-dom";
import { Row, Col, Badge, CardTitle, ListGroup, ListGroupItem, Button, Card, CardBody } from "reactstrap";
import { v4 as uuidv4 } from 'uuid'
import User from '../types/user'

interface Props {}

interface State {
    // key is the location, values is list of users.
    usersMap: Map<string, Array<User>>
}

class OnlineUsers extends React.Component<Props, State> {
    state = {
        usersMap: new Map<string, Array<User>>(),
    };

    componentDidMount() {
        setTimeout(this.fetchAllAvailableUsers, 1000)
    }

    fetchAllAvailableUsers = () => {
        const serverDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN;
        fetch(`${serverDomain}/online-users`)
            .then(res => res.json())
            .then(data => {
                this.setState({...this.state, usersMap: data})
            });
    };

    renderUsersOfLocation = (location: string, users: Array<User>) => {
        // console.log(location, " -> ", users)
        if(users.length > 0) {
            return (
                <ListGroup key={uuidv4()}>
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

    renderUsers = (users: Array<User>) => {
        return users.map(user => (
            <ListGroupItem key={uuidv4()}>
                <Row>
                    <Col xs="10">{user.username}</Col>
                    <Col xs="2">
                        <Button color="dark" outline size="sm">
                            <NavLink className="button" to={`/conversation/private/${user.userId}`}>
                                Chat
                            </NavLink>
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
