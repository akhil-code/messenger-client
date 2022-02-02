import React from "react";
import MessageEditor from "./messageEditor";
import Conversation from "./conversation";

interface Message {
    message: string,
    sender: string
}

export default function ChannelConversation(props: {}){

    const [conversation, setConversation] = React.useState<Array<Message>>([])

    const getAvailableRooms = () => {
        // make call to backend
    }
    // const addToConversation = (newMessage: Message) => setConversation([...conversation, newMessage])

    return (
        <React.Fragment>
            {/* <SocketHandler updateSocket={this.updateSocket} socket={this.state.socket} addToConversation={this.addToConversation} /> */}
            <Conversation conversation={conversation} />
            <br/>
            <MessageEditor/>
        </React.Fragment>
    );
}