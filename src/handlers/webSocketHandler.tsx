import { io, Socket } from "socket.io-client";

export default class WebSocket {

    socket: Socket

    constructor() {
        const { REACT_APP_BACKEND_SERVER_DOMAIN: domain } = process.env;
        console.log(`attempting to connect to socket server`);
        this.socket = io(`${domain}`,{ transports: ["websocket"] })
        this.socket.on('connect', () => {
            console.log(`connection successful with server with socket id: ${this.socket.id}`)
        })
    }

    getSocketId = () => this.socket.id
    
    disconnectFromServer = () => {
        if(this.socket !== undefined) {
            console.log(`attempting to disconnect from socket server`)
            this.socket.disconnect()
        }
    }
}
