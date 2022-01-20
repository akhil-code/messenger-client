import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "reactstrap";
import ChannelsList from "./components/channelsList";
import ChannelConversation from "./components/channelConversation";
import PageHeader from "./components/pageHeader";
import SupportPage from "./components/supportPage";
import ContactUs from "./components/contactUs";
import OnlineUsers from "./components/onlineUsers";

interface Props {}

interface State {}

class App extends React.Component<Props, State> {
    render() {
        return (
            <Container>
                <PageHeader />
                <div style={{paddingTop: "60px"}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<ChannelConversation />} />
                            <Route path="/onlineUsers" element={<OnlineUsers />} />
                            <Route path="/channels" element={<ChannelsList />} />
                            <Route path="/support" element={<SupportPage />} />
                            <Route path="/contactUs" element={<ContactUs />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </Container>
        );
    }
}

export default App;
