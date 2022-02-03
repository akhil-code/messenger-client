import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";
import ChannelsList from "./components/channelsList";
import ChannelConversation from "./components/channelConversation";
import PageHeader from "./components/pageHeader";
import SupportPage from "./components/supportPage";
import ContactUs from "./components/contactUs";
import OnlineUsers from "./components/onlineUsers";
import Login from "./components/login";
import CreateChannel from "./components/createChannel";
import { AppContext } from "./context/appContext";
import WebSocket from "./sockets/webSocket";
import { Message } from "./types/Chat.js";
import EventHandlerCallbacks from "./sockets/callbacks";

interface Props {}
interface State {
    webSocket?: WebSocket;
    selectedLocation?: string;
    groupMessages?: Map<string, Array<Message>>;
    eventHandlerCallbacks: EventHandlerCallbacks

}

class App extends React.Component<Props, State> {
    state = { 
        webSocket: undefined, 
        selectedLocation: undefined,
        groupMessages: new Map<string, Array<Message>>(),
        eventHandlerCallbacks: {
            groupMessageCallback: (message: Message) => {
                if(this.state.groupMessages.has(message.receiver)) {
                    this.state.groupMessages.get(message.receiver)?.push(message)
                } else {
                    this.state.groupMessages.set(message.receiver, [message])
                }
                this.setState({...this.state})
            },  
        }
    };

    render() {
        let appContext = {
            context: { ...this.state },
            updateContext: (context: {}) => this.setState({...this.state, ...context})
        };

        return (
            <Container>
                <AppContext.Provider value={appContext}>
                    <div style={{ paddingTop: "75px" }}>
                        <BrowserRouter>
                            <PageHeader />
                            <Routes>
                                <Route path="/" element={<ChannelsList />} />
                                <Route
                                    path="/channels"
                                    element={<ChannelsList />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route
                                    path="/online-users"
                                    element={<OnlineUsers />}
                                />
                                <Route
                                    path="/conversation/:channel"
                                    element={<ChannelConversation />}
                                />
                                <Route
                                    path="/create-channel"
                                    element={<CreateChannel />}
                                />
                                <Route
                                    path="/support"
                                    element={<SupportPage />}
                                />
                                <Route
                                    path="/contact-us"
                                    element={<ContactUs />}
                                />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </AppContext.Provider>
            </Container>
        );
    }
}

export default App;
