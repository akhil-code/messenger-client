import React, { Component } from "react";
import { io, Socket } from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

interface Message {
    message: string,
    sender: string
}

interface Props {
    socket?: Socket;
    updateSocket: (socket?: Socket) => void;
    addToConversation: (newMessage: Message) => void;
}

interface State {
    socket?: Socket<ServerToClientEvents, ClientToServerEvents>;
}

interface ServerToClientEvents {
    directMessage: (message: string) => void;
}

interface ClientToServerEvents {
    directMessage: (message: string) => void;
}

class SocketHandler extends Component<Props, State> {
    state = {
        socket: undefined,
    };
    
    componentDidMount() {
        this.connectToSocketServer()
    }

    connectToSocketServer = () => {
        const { REACT_APP_BACKEND_SERVER_DOMAIN } = process.env;

        console.log(`attempting to connect to socket server`);
        // connect to socket server
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
            `${REACT_APP_BACKEND_SERVER_DOMAIN}`,
            { transports: ["websocket"] }
        );
        socket.on(`connect`, () => {
            console.log(
                `connection successful with server with socket id: ${socket.id}`
            );

            this.props.updateSocket(socket);
            this.addEventListeners(socket);
        });
    };

    disconnectFromSocketServer = (
        socket?: Socket<ServerToClientEvents, ClientToServerEvents>
    ) => {
        if (socket !== undefined) {
            console.log(`attempting to disconnect from socket server`);
            socket.disconnect();
            this.props.updateSocket(undefined);
        }
    };

    addEventListeners = (socket: Socket) => {
        socket.on("groupMessage", (message) => {
            this.props.addToConversation(message);
        });
    };

    render() {
        return <div></div>;
    }
}

export default SocketHandler;
