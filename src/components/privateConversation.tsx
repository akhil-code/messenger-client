import * as React from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/appContext';
import PrivateChatHistory from './privateChatHistory';
import PrivateMessageInput from './privateMessageInput';
import Session from '../types/session';
 
export default function PrivateConversation() {
    let { channel } = useParams()
    let [receiverSession, setReceiverSession] = React.useState<Session>({})

    React.useEffect(() => {
        let serverDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN
        fetch(`${serverDomain}/user/${channel}`)
            .then(res => res.json())
            .then((user: Session) => setReceiverSession(user))
    }, [])
    

    return (
        <AppContext.Consumer>
            {({context, updateContext}) => (
                <>
                    <PrivateChatHistory receiver={receiverSession}/>
                    <br/>
                    <PrivateMessageInput receiver={receiverSession}/>
                </>
            )}
        </AppContext.Consumer>
    );
}
 