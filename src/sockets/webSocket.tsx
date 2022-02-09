import { io, Socket } from "socket.io-client";
import { Message } from '../types/Chat.js'
import { EventHandlerCallbacks } from './callbacks'
import Session from "../types/session.js";

export default class WebSocket {
    socket: Socket

    constructor(location?: string, callbacks?: EventHandlerCallbacks) {
        const serverDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN;

        this.socket = io(`${serverDomain}/${location}`,{ autoConnect: false, transports: ["websocket"] })
        
        this.socket.on('connect', () => {
            callbacks?.connectionSuccesfulCallback()

            this.socket.on('groupMessage', (message: Message) => {
                callbacks?.groupMessageCallback(message)
            })

            this.socket.on('directMessage', (message: Message) => {
                callbacks?.privateMessageCallback(message)
            })

            this.socket.on('onlineUsersUpdate', (channelId: string, users: Array<string>) => {
                callbacks?.onlineUsersUpdateCallback(channelId, users)
            })

            this.socket.on('session', (session: Session) => {
                callbacks?.sessionStartCallback(session);
            })

            this.socket.on('disconnect', () => callbacks?.serverDisconnectEvent())
        })
    }

    setSession = (session: Session) => this.socket.auth = { ... session }
    connect = () => this.socket.connect()

    getSocketId = () => this.socket.id

    sendGroupMessage = (message: Message) => {
        this.socket.emit('groupMessage', message)
    }

    addToPublicRoom = (location: string, roomName: string) => {
        this.socket.emit('joinRoom', location, roomName)
    }
    
    sendPrivateMessage = (message: Message) => {
        this.socket.emit('directMessage', message)
    }
    
    disconnectFromServer = () => {
        if(this.socket !== undefined) {
            this.socket.disconnect()
        }
    }
}
