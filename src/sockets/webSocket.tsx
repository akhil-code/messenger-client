import { io, Socket } from "socket.io-client";
import { Message } from '../types/Chat.js'
import { EventHandlerCallbacks } from './callbacks'

export default class WebSocket {

    socket: Socket

    constructor(location: string, callbacks?: EventHandlerCallbacks) {
        const { REACT_APP_BACKEND_SERVER_DOMAIN: domain } = process.env;
        console.log(`attempting to connect to socket server ${domain}`);
        this.socket = io(`${domain}/${location}`,{ transports: ["websocket"] })
        this.socket.on('connect', () => {
            console.log(`connection successful with server with socket id: ${this.socket.id}`)

            this.socket.on('groupMessage', (message: Message) => {
                callbacks?.groupMessageCallback(message)
            })

            this.socket.on('onlineUsersUpdate', (channelId: string, users: Array<string>) => {
                callbacks?.onlineUsersUpdateCallback(channelId, users)
            })
        })
    }

    getSocketId = () => this.socket.id

    sendMessage = (message: Message) => {
        this.socket.emit('groupMessage', message)
    }

    addToRoom = (location: string, roomName: string) => {
        if(roomName === "") {
            console.log("Empty room name")
            return
        }
        this.socket.emit('joinRoom', location, roomName)
    }
    
    disconnectFromServer = () => {
        if(this.socket !== undefined) {
            console.log(`attempting to disconnect from socket server`)
            this.socket.disconnect()
        }
    }
}
