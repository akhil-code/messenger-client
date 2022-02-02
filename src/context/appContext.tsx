import * as React from "react";
import WebSocket from "../handlers/webSocketHandler";

interface ContextInterface {
    context: {
        webSocket?: WebSocket,
        selectedLocation?: string
    },
    updateContext: ({}) => void
}

export const AppContext = React.createContext<ContextInterface>({
    context: {},
    updateContext: ({}) => {},
});
