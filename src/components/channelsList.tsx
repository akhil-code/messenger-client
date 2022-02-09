import * as React from "react";
import { Row, ListGroup, ListGroupItem, Col } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import WelcomeNote from "./welcomeNote";
import { Link } from "react-router-dom";

interface Props {}

interface State {
    channels: Map<string, Array<string>>;
    onlineUsers: number;
}

class ChannelsList extends React.Component<Props, State> {
    state = {
        channels: new Map<string, Array<string>>(),
        onlineUsers: 0,
    };

    componentDidMount() {
        const { REACT_APP_BACKEND_SERVER_DOMAIN } = process.env;

        fetch(`${REACT_APP_BACKEND_SERVER_DOMAIN}/supported-channels`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    ...this.state,
                    channels: res,
                });
            });

        fetch(`${REACT_APP_BACKEND_SERVER_DOMAIN}/online-users`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    ...this.state,
                    onlineUsers: res.length,
                });
            });
    }

    renderChannelsList = (channelNames: Array<string>) => {
        return channelNames.map((channel) => (
            <ListGroupItem key={uuidv4()}>
                <Link to={`/conversation/channel/${channel}`}>
                    {channel}
                </Link>
            </ListGroupItem>
            
        ));
    };

    render() {
        return (
            <React.Fragment>
                <WelcomeNote />
                <Row>
                    {/* key is location name, value is list of channel names */}
                    {Object.entries(this.state.channels).map(
                        (entry) => (
                            <Col xs="6" key={uuidv4()}>
                                <React.Fragment>
                                    <ListGroup>
                                        <ListGroupItem
                                            action
                                            active
                                            href="#"
                                            tag="button"
                                        >
                                            {entry[0]}{" "}
                                            
                                        </ListGroupItem>
                                        {this.renderChannelsList(entry[1])}
                                    </ListGroup>
                                    <br />
                                </React.Fragment>
                            </Col>
                        )
                    )}
                </Row>
            </React.Fragment>
        );
    }
}

export default ChannelsList;
