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
import { AppContext, ContextData, getDefaultContextData } from "./context/appContext";
import PrivateConversation from "./components/privateConversation";

interface Props {}

/**
 * Note - State of app is based on the AppContext.
 */
class App extends React.Component<Props, ContextData> {
    state: ContextData = getDefaultContextData(this)

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
                                <Route path="/channels" element={<ChannelsList />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/online-users" element={<OnlineUsers />} />
                                <Route path="/conversation/channel/:channel" element={<ChannelConversation />} />
                                <Route path="/conversation/private/:channel" element={<PrivateConversation />} />
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
