import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Col,
    Row,
    Card,
    Button,
    CardText,
    InputGroup,
    InputGroupText,
    FormFeedback,
    Form,
    Input,
    CardHeader,
    CardBody,
} from "reactstrap";

interface Props {}

interface State {
    name: string;
    location: string;
    supportedLocations: Array<string>;
    nameValidationFailure: boolean;
    nameValidationFailureMessage: string;
    locationSelectionKey: string;
    locationErrorMessage: string;
    isInvalidLocationSelected: boolean;
}

class Login extends React.Component<Props, State> {
    state = {
        name: "",
        location: "",
        supportedLocations: [],
        nameValidationFailure: false,
        nameValidationFailureMessage: "",
        locationSelectionKey: uuidv4(),
        isInvalidLocationSelected: false,
        locationErrorMessage: "",
    };

    componentDidMount() {
        let serverDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN;
        fetch(`${serverDomain}/supported-locations`)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    ...this.state,
                    supportedLocations: res,
                });
            });
    }

    handleNameFieldEvents = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            name: event.target.value,
            nameValidationFailure: false,
            nameValidationFailureMessage: "",
        });
    };

    handleLocationSelectionEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            location: event.target.value,
            isInvalidLocationSelected: false,
            locationErrorMessage: "",
        })
    }

    validateSignIn = () => {
        if (this.state.name === "") {
            this.setState({
                ...this.state,
                nameValidationFailure: true,
                nameValidationFailureMessage:
                    "Empty name, Please provide your name so that others identify you",
            });
            return false;
        }

        if (this.state.location === "" || this.state.location === "default") {
            this.setState({
                ...this.state,
                isInvalidLocationSelected: true,
                locationErrorMessage: "Please select a location.",
            });
        }

        return true;
    };

    handleSignIn = () => {
        if (!this.validateSignIn()) {
            return;
        }
    };

    resetForm = () => {
        this.setState({
            ...this.state,
            name: "",
            nameValidationFailure: false,
            nameValidationFailureMessage: "",
            location: "",
            locationSelectionKey: uuidv4(),
        });
    };

    render() {
        return (
            <div>
                <Row>
                    <Col lg={{ offset: 3, size: 6 }}>
                        <Card>
                            <CardHeader tag="h3">Login</CardHeader>
                            <CardBody>
                                <CardText>
                                    Please fill in the following details to
                                    quickly jump in and start chatting.
                                </CardText>

                                <Form>
                                    <InputGroup>
                                        <InputGroupText>Name</InputGroupText>
                                        <Input
                                            invalid={
                                                this.state.nameValidationFailure
                                            }
                                            onChange={
                                                this.handleNameFieldEvents
                                            }
                                            value={this.state.name}
                                        />
                                        <FormFeedback>
                                            {
                                                this.state
                                                    .nameValidationFailureMessage
                                            }
                                        </FormFeedback>
                                    </InputGroup>
                                    <br />
                                    <InputGroup>
                                        <InputGroupText>
                                            Location
                                        </InputGroupText>
                                        <Input
                                            type="select"
                                            onChange={this.handleLocationSelectionEvent}
                                            invalid={
                                                this.state
                                                    .isInvalidLocationSelected
                                            }
                                            key={
                                                this.state.locationSelectionKey
                                            }
                                        >
                                            <option
                                                disabled
                                                selected
                                                value="default"
                                            >
                                                -- select an option --
                                            </option>
                                            {this.state.supportedLocations.map(
                                                (location) => (
                                                    <option key={location}>
                                                        {location}
                                                    </option>
                                                )
                                            )}
                                        </Input>
                                        <FormFeedback>
                                            {this.state.locationErrorMessage}
                                        </FormFeedback>
                                    </InputGroup>
                                    <br />
                                </Form>
                                <Row>
                                    <Col xs="auto">
                                        <Button
                                            onClick={this.handleSignIn}
                                            outline
                                            color="success"
                                        >
                                            Sign in
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            outline
                                            color="danger"
                                            onClick={this.resetForm}
                                        >
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;
