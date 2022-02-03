import React from "react";
import MessageEditor from "./messageEditor";
import Conversation from "./conversation";
import { useParams } from 'react-router-dom';

interface Props {}
interface State {}
 
export default function ChannelConversation() {
    let { channel } = useParams()
    return (
        <React.Fragment>
            <Conversation channel={channel}/>
            <br/>
            <MessageEditor channel={channel!}/>
        </React.Fragment>
    );
}
 