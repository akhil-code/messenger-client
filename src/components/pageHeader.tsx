import * as React from "react";
import {
    Row,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
} from "reactstrap";

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
            <Row>
                <Navbar color="warning" fixed="top" light expand="md">
                    <NavbarBrand href="/">Quick dates</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbarItems} />
                    <Collapse navbar isOpen={this.state.expandNavbar}>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/online-users">
                                    Online users
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/channels">Channels</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/create-channel">Create channel</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/support">
                                    Support us / donate
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/contact-us">Contact us</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Row>
        );
    }
}

export default PageHeader;
