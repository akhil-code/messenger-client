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

interface Props {}

interface State {}

class App extends React.Component<Props, State> {
    render() {
        return (
            <Container>
                <PageHeader />
                <div style={{paddingTop: "75px"}}>
                    <BrowserRouter>
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
            </Container>
        );
    }
}

export default App;
