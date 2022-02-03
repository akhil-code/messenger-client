import * as React from 'react';
import { Component } from 'react';
import { AppContext } from '../context/appContext'
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap'

interface Props {
    channel: string;
}
 
interface State {
    onlineUsers: Array<string>;
}
 
class ConversationUsers extends React.Component<Props, State> {
    state = {
        onlineUsers: []
    }

    componentDidMount() {
        let url = process.env.REACT_APP_BACKEND_SERVER_DOMAIN
        console.log(this.context)
        let location = this.context.context.selectedLocation
        
        fetch(`${url}/online-users/${location}/channel/${this.props.channel}`)
            .then(res => res.json())
            .then(res => this.setState({...this.state, onlineUsers: res}))
    }

    render() { 
        return (
            <AppContext.Consumer>
                {({context, updateContext}) => (
                    <Row>
                        <Col>
                            <br/>
                            <h2>Online users</h2>
                            <ListGroup>
                                {this.state.onlineUsers.map(user => (
                                    <ListGroupItem> {user} </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                )}
            </AppContext.Consumer>
        );
    }
}
ConversationUsers.contextType = AppContext


export default ConversationUsers;