import React from "react";
import MessageEditor from "./messageEditor";
import Conversation from "./conversation";
import { useParams } from 'react-router-dom';
import ConversationUsers from "./conversationUsers";

interface Props {}
interface State {}
 
export default function ChannelConversation() {
    let { channel } = useParams()
    return (
        <React.Fragment>
            <Conversation channel={channel}/>
            <br/>
            <MessageEditor channel={channel!}/>
            <ConversationUsers channel={channel!}/>
        </React.Fragment>
    );
}
 