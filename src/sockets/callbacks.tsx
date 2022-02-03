import { Message } from "../types/Chat.js";
import { ContextData } from "../context/appContext.js";
import App from '../app.js'

export interface EventHandlerCallbacks {
    groupMessageCallback: (message: Message) => void;
    onlineUsersUpdateCallback: ( channelId: string, users: Array<string>) => void;
}

export const getEventHandlerCallbacks = (app: App): EventHandlerCallbacks => {
    return {
        groupMessageCallback: (message: Message) => {
            if (app.state.groupMessages?.has(message.receiver)) {
                app.state.groupMessages.get(message.receiver)?.push(message);
            } else {
                app.state.groupMessages?.set(message.receiver, [message]);
            }
            app.setState({ ...app.state });
        },

        onlineUsersUpdateCallback: (channelId: string, users: Array<string>) => {
            app.state.onlineUsers?.set(channelId, users);
            app.setState({ ...app.state });
        },
    };
};
