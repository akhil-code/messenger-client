import * as React from "react";
import EventHandlerCallbacks from "../sockets/callbacks";
import WebSocket from "../sockets/webSocket";
import { Message } from '../types/Chat.js';

export interface Context {
    context: {
        webSocket?: WebSocket,
        selectedLocation?: string,
        groupMessages?: Map<string, Array<Message>>,
        eventHandlerCallbacks?: EventHandlerCallbacks
    },
    updateContext: ({}) => void
}

export const AppContext = React.createContext<Context>({
    context: {},
    updateContext: ({}) => {},
});
