import * as React from "react";
import App from "../app";
import { EventHandlerCallbacks } from "../sockets/callbacks";
import WebSocket from "../sockets/webSocket";
import { Message } from '../types/Chat.js';
import { getEventHandlerCallbacks } from "../sockets/callbacks";
import Session from '../types/session'


export interface ContextData {
    session?: Session,    
    webSocket?: WebSocket,
    groupMessages?: Map<string, Array<Message>>,
    onlineUsers?: Map<string, Array<string>>,
    eventHandlerCallbacks?: EventHandlerCallbacks
}

export interface Context {
    context: ContextData,
    updateContext: (context: ContextData) => void
}

export const AppContext = React.createContext<Context>({
    context: {},
    updateContext: ({}) => {},
});

export const getDefaultContextData = (app: App) => {

    let eventHandlerCallbacks = getEventHandlerCallbacks(app);

    let session = getSessionInfo()
    let webSocket : WebSocket | undefined = undefined

    if(session.sessionId && session.location) {
        console.log('creating web socket for sessionId ', session.sessionId, " and location: ", session.location)
        webSocket = new WebSocket(session.location!, eventHandlerCallbacks)
        webSocket.setSession(session)
        webSocket.connect()
    }


    return {
        session,
        webSocket,
        groupMessages: new Map<string, Array<Message>>(),
        onlineUsers: new Map<string, Array<string>>(),
        eventHandlerCallbacks,
    }
}


const getSessionInfo = () : Session => {
    let userId = localStorage.getItem('userId')
    let sessionId = localStorage.getItem('sessionId')
    let username = localStorage.getItem('username')
    let location = localStorage.getItem('location')

    return {
        userId: userId === null ? undefined : userId,
        sessionId: sessionId === null ? undefined : sessionId,
        username: username === null ? undefined : username,
        location: location === null ? undefined : location,
    }   
}