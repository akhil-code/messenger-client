import * as React from "react";
import App from "../app";
import { EventHandlerCallbacks } from "../sockets/callbacks";
import WebSocket from "../sockets/webSocket";
import { Message } from '../types/Chat.js';
import { getEventHandlerCallbacks } from "../sockets/callbacks";


export interface ContextData {
    webSocket?: WebSocket,
    selectedLocation?: string,
    groupMessages?: Map<string, Array<Message>>,
    onlineUsers?: Map<string, Array<string>>,
    eventHandlerCallbacks?: EventHandlerCallbacks
}

export interface Context {
    context: ContextData,
    updateContext: ({}) => void
}


export const AppContext = React.createContext<Context>({
    context: {},
    updateContext: ({}) => {},
});

export const getDefaultContextData = (app: App) => {
    return {
        webSocket: undefined, 
        selectedLocation: undefined,
        groupMessages: new Map<string, Array<Message>>(),
        onlineUsers: new Map<string, Array<string>>(),
        eventHandlerCallbacks: getEventHandlerCallbacks(app)
    }
}
