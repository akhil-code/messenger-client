import * as React from "react";
import { Row, ListGroup, ListGroupItem, Badge, Col } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';

interface Props {}

interface State {
    channelsList: Array<string>;
    onlineUsers: number
}

class ChannelsList extends React.Component<Props, State> {
    state = {
        channelsList: ["Bangalore channel"],
        onlineUsers: 0
    };

    componentDidMount() {
        const { REACT_APP_BACKEND_SERVER_DOMAIN } = process.env
        fetch(`${REACT_APP_BACKEND_SERVER_DOMAIN}/sockets`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                ...this.state,
                onlineUsers: res.length
            })
        })

    }

    render() {
        return (
            <Row>
                <Col>
                    <ListGroup>
                        <ListGroupItem action active href="#" tag="button">
                            All Channels
                        </ListGroupItem>
                        {this.state.channelsList.map((channel) => (
                            <ListGroupItem key={uuidv4()} action tag="a" href="/">
                                {channel} <Badge pill>online users - {this.state.onlineUsers}</Badge>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        );
    }
}

export default ChannelsList;
