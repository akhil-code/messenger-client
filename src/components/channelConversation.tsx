import React from "react";
import PublicMessageInput from "./publicMessageInput";
import PublicChatHistory from "./publicChatHistory";
import { useParams } from 'react-router-dom';
import PublicConversationUsers from "./publicConversationUsers";

interface Props {}
interface State {}
 
export default function ChannelConversation() {
    let { channel } = useParams()
    return (
        <React.Fragment>
            <PublicChatHistory channel={channel}/>
            <br/>
            <PublicMessageInput channel={channel!}/>
            <PublicConversationUsers channel={channel!}/>
        </React.Fragment>
    );
}
 