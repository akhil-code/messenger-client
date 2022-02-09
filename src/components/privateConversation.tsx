import * as React from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import PrivateChatHistory from './privateChatHistory';
import PrivateMessageInput from './privateMessageInput';


interface Props {}
interface State {}
 
export default function PrivateConversation() {
    let { channel } = useParams()
    return (
        <AppContext.Consumer>
            {({context, updateContext}) => (
                <>
                    <PrivateChatHistory channel={channel}/>
                    <br/>
                    <PrivateMessageInput channel={channel!}/>
                </>
            )}
        </AppContext.Consumer>
    );
}
 