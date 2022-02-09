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

    closeNavbarItems = (event: React.SyntheticEvent) => {
        this.setState({...this.state, expandNavbar: false})
    }

    render() {
        return (
            <AppContext.Consumer>
                { ({context}) => (
                    <Row>
                        <Navbar color="warning" fixed="top" light expand="lg">
                            <Link className="navbar-brand" to="/">Quick dates</Link>
                            {context.session?.location === undefined ? <></> : (
                                <Badge color="secondary" pill>{context.session?.location}</Badge>
                            )}
                            <NavbarToggler onClick={this.toggleNavbarItems} />
                            <Collapse navbar isOpen={this.state.expandNavbar}>
                                <Nav className="me-auto" navbar>
                                    {context.webSocket !== undefined ? <></> : (
                                        <NavItem>
                                            <Link className="nav-link" to="/login" onClick={this.closeNavbarItems}>Login</Link>
                                        </NavItem>
                                    )}
                                    <NavItem>
                                        <Link className="nav-link" to="/online-users" onClick={this.closeNavbarItems}>Online users</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/channels" onClick={this.closeNavbarItems}>Channels</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/create-channel" onClick={this.closeNavbarItems}>Create channel</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/support" onClick={this.closeNavbarItems}>Support us / donate</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/contact-us" onClick={this.closeNavbarItems}>Contact us</Link>
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
