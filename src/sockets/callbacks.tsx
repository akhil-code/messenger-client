import { Message } from "../types/message.js";
import App from '../app.js'
import Session from "../types/session.js";
import MessageEvent from "../types/messageEvent.js";

export interface EventHandlerCallbacks {
    connectionSuccesfulCallback: () => void
    groupMessageCallback: (messageEvent: MessageEvent) => void;
    privateMessageCallback: (messageEvent: MessageEvent) => void;
    onlineUsersUpdateCallback: ( channelId: string, users: Array<string>) => void;
    serverDisconnectEvent: () => void;
    sessionStartCallback: (session: Session) => void;
    errorCallback: (error?: Error) => void;
}

export const getEventHandlerCallbacks = (app: App): EventHandlerCallbacks => {
    return {
        connectionSuccesfulCallback: () => {
            // console.log('succesfully connected to server')
        },

        groupMessageCallback: (messageEvent: MessageEvent) => {
            if (app.state.groupMessages?.has(messageEvent.receiver.sessionId!)) {
                app.state.groupMessages.get(messageEvent.receiver.sessionId!)?.push(messageEvent);
            } else {
                app.state.groupMessages?.set(messageEvent.receiver.sessionId!, [messageEvent]);
            }
            app.setState({ ...app.state });
        },

        privateMessageCallback: (messageEvent: MessageEvent) => {
            console.log('direct message callback triggered: ', messageEvent)
            if (app.state.groupMessages?.has(messageEvent.sender.sessionId!)) {
                app.state.groupMessages.get(messageEvent.sender.sessionId!)?.push(messageEvent);
            } else {
                app.state.groupMessages?.set(messageEvent.sender.sessionId!, [messageEvent]);
            }
            app.setState({ ...app.state });
        },

        onlineUsersUpdateCallback: (channelId: string, users: Array<string>) => {
            app.state.onlineUsers?.set(channelId, users);
            app.setState({ ...app.state });
        },

        sessionStartCallback: (session: Session) => {
            console.log('session started: ', session)
            localStorage.setItem('sessionId', session.sessionId!)
            localStorage.setItem('location', session.location!)
            app.setState({ ...app.state, session: { ...session }})
        },

        serverDisconnectEvent: () => {
            console.log('disconnected to web socket server.')
            app.setState({...app.state, webSocket: undefined, session: undefined})
        },

        errorCallback: (error?: Error) => {
            console.log('Error connecting to socket server ', error?.message)
            app.setState({...app.state, webSocket: undefined, session: undefined})
        }
    };
};

