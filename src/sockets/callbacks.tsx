import { Message } from "../types/Chat.js";
import App from '../app.js'
import Session from "../types/session.js";
import { lookupService } from "dns";

export interface EventHandlerCallbacks {
    connectionSuccesfulCallback: () => void
    groupMessageCallback: (message: Message) => void;
    privateMessageCallback: (mesage: Message) => void;
    onlineUsersUpdateCallback: ( channelId: string, users: Array<string>) => void;
    serverDisconnectEvent: () => void;
    sessionStartCallback: (session: Session) => void;
}

export const getEventHandlerCallbacks = (app: App): EventHandlerCallbacks => {
    return {
        connectionSuccesfulCallback: () => {
            console.log('succesfully connected to server')
        },

        groupMessageCallback: (message: Message) => {
            if (app.state.groupMessages?.has(message.receiver)) {
                app.state.groupMessages.get(message.receiver)?.push(message);
            } else {
                app.state.groupMessages?.set(message.receiver, [message]);
            }
            app.setState({ ...app.state });
        },

        privateMessageCallback: (message: Message) => {
            if (app.state.groupMessages?.has(message.sender)) {
                app.state.groupMessages.get(message.sender)?.push(message);
            } else {
                app.state.groupMessages?.set(message.sender, [message]);
            }
            app.setState({ ...app.state });
        },

        onlineUsersUpdateCallback: (channelId: string, users: Array<string>) => {
            app.state.onlineUsers?.set(channelId, users);
            app.setState({ ...app.state });
        },

        sessionStartCallback: (session: Session) => {
            Object.entries(session).forEach(entry => localStorage.setItem(entry[0], entry[1]))
            app.setState({ ...app.state, session: { ...session }})
        },

        serverDisconnectEvent: () => {
            console.log('disconnected to web socket server.')
            app.setState({...app.state, webSocket: undefined})
        }
    };
};

