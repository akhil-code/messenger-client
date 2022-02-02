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
import WebSocket from "./handlers/webSocketHandler";

interface Props {}
interface State {
    webSocket?: WebSocket
    selectedLocation?: string
}

class App extends React.Component<Props, State> {
    state = { webSocket: undefined, selectedLocation: undefined }
    
    updateSocket = (webSocket: WebSocket) => {
        console.log(`update socket triggered`)
        this.setState({...this.state, webSocket})
    }
    updateSelectedLocation = (location: string) => this.setState({...this.state, selectedLocation: location})

    componentDidUpdate() {
        console.log(this.state)
    }

    render() {
        let appContext = {
            webSocket: this.state.webSocket,
            updateSocket: this.updateSocket,
            selectedLocation: this.state.selectedLocation,
            updateSelectedLocation: this.updateSelectedLocation
        }
        return (
            <Container>
                <AppContext.Provider value={appContext}>
                    <div style={{paddingTop: "75px"}}>
                        <BrowserRouter>
                            <PageHeader />
                            <Routes>
                                <Route path="/" element={<ChannelsList />} />
                                <Route path="/channels" element={<ChannelsList />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/online-users" element={<OnlineUsers />} />
                                <Route path="/conversation" element={< ChannelConversation />} />
                                <Route path="/create-channel" element={<CreateChannel />} />
                                <Route path="/support" element={<SupportPage />} />
                                <Route path="/contact-us" element={<ContactUs />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </AppContext.Provider>
                
            </Container>
        );
    }
}

export default App;