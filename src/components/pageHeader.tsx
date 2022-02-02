import * as React from "react";
import {
    Row,
    Navbar,
    NavbarToggler,
    Collapse,
    Nav,
    Badge,
    NavItem,
} from "reactstrap";
import { Link } from 'react-router-dom'
import { AppContext } from '../context/appContext'

interface Props {}

interface State {
    expandNavbar: boolean;
}

class PageHeader extends React.Component<Props, State> {
    state = {
        expandNavbar: false,
    };

    toggleNavbarItems = () => {
        this.setState({
            ...this.state,
            expandNavbar: !this.state.expandNavbar,
        });
    };

    render() {
        return (
            <AppContext.Consumer>
                { ({context}) => (
                    <Row>
                        <Navbar color="warning" fixed="top" light expand="md">
                            <Link className="navbar-brand" to="/">Quick dates</Link>
                            {context.selectedLocation === undefined ? <></> : (
                                    <Badge color="secondary" pill>{context.selectedLocation}</Badge>
                            )}
                            <NavbarToggler onClick={this.toggleNavbarItems} />
                            <Collapse navbar isOpen={this.state.expandNavbar}>
                                <Nav className="me-auto" navbar>
                                    {context.webSocket !== undefined ? <></> : (
                                        <NavItem>
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </NavItem>
                                    )}
                                    <NavItem>
                                        <Link className="nav-link" to="/online-users">Online users</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/channels">Channels</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/create-channel">Create channel</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/support">Support us / donate</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/contact-us">Contact us</Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Row>
                )}
            </AppContext.Consumer>
            
        );
    }
}

export default PageHeader;
