import * as React from "react";
import WebSocket from "../handlers/webSocketHandler";

interface ContextInterface {
    webSocket?: WebSocket,
    updateSocket: (webSocket: WebSocket) => void,
    selectedLocation?: string,
    updateSelectedLocation: (location: string) => void,
    updateState?: () => void
}

export const AppContext = React.createContext<ContextInterface>({
    updateSocket: (webSocket: WebSocket) => {},
    updateSelectedLocation: (location: string) => {},
});
