import { v4 as uuidv4 } from 'uuid';
import * as React from "react";
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    Input,
    InputGroup,
    InputGroupText,
    CardText,
    FormFeedback,
    Button,
} from "reactstrap";

interface Props {}

interface State {
    channelName: string;
    location: string;
    isInvalidChannelName: boolean;
    channelNameErrorMessage: string;
    locationErrorMessage: string,
    isInvalidLocation: boolean;
    supportedLocations: Array<string>;
    locationSelectionKey: string
}

class CreateChannel extends React.Component<Props, State> {
    state = {
        channelName: "",
        location: "",
        isInvalidChannelName: false,
        channelNameErrorMessage: "",
        isInvalidLocation: false,
        locationErrorMessage: "",
        supportedLocations: [],
        locationSelectionKey: uuidv4()
    };

    componentDidMount() {
        let serverDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN
        fetch(`${serverDomain}/supported-locations`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                ...this.state,
                supportedLocations: res
            })
        })
    }

    handleChannelNameFieldEvents = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            channelName: event.target.value,
            isInvalidChannelName: false,
            channelNameErrorMessage: "",
        })
    };

    handleLocationSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            location: event.target.value,
            isInvalidLocation: false,
            locationErrorMessage: "",
        })
    }

    /**
     * Validates the channel name & location
     * @returns true if validation is successful or else returns false.
     */
     channelCreationInputs = (): boolean => {
         let channelName = this.state.channelName;
         let location = this.state.location;

        if(channelName === "") {
            this.setState({
                ...this.state,
                isInvalidChannelName: true,
                channelNameErrorMessage: "Empty channel name"
            })
            return false;
        }

        if(location === "" || location ==="default") {
            console.log("invalid value")
            this.setState({
                ...this.state,
                isInvalidLocation: true,
                locationErrorMessage: "Please select a location"
            })
            return false;
        }
        return true;
    }
    
    handleCreateChannel = () => {
        let newChannelName = this.state.channelName;
        let location = this.state.location;
        if(!this.channelCreationInputs()) {
            return;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                channelName: newChannelName,
                location: location
            })
        }

        let serverDomain = process.env.REACT_APP_BACKEND_SERVER_DOMAIN
        fetch(`${serverDomain}/create-channel`, requestOptions)
        .then(res => res.json())
        .then(res => console.log(res))
    }

    resetForm = () => {
        this.setState({
            ...this.state,
            channelName: "",
            location: "",
            isInvalidChannelName: false,
            channelNameErrorMessage: "",
            locationSelectionKey: uuidv4()
        })

        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col lg={{ offset: 3, size: 6 }}>
                        <Card>
                            <CardHeader tag="h3">Create channel</CardHeader>
                            <CardBody>
                                <CardText>
                                    Please fill in the following details to
                                    quickly jump in and start chatting.
                                </CardText>

                                <Form>
                                    <InputGroup>
                                        <InputGroupText>Channel Name</InputGroupText>
                                        <Input
                                            invalid={
                                                this.state.isInvalidChannelName
                                            }
                                            onChange={
                                                this
                                                    .handleChannelNameFieldEvents
                                            }
                                            value={this.state.channelName}
                                        />
                                        <FormFeedback>
                                            {this.state.channelNameErrorMessage}
                                        </FormFeedback>
                                    </InputGroup>
                                </Form>
                                <br/>
                                <InputGroup>
                                    <InputGroupText>
                                        Location
                                    </InputGroupText>
                                    <Input key={this.state.locationSelectionKey} invalid={this.state.isInvalidLocation} type="select" onChange={this.handleLocationSelection}>
                                        <option disabled selected value="default">-- select an option --</option>
                                        {this.state.supportedLocations.map(location => (
                                            <option key={location} value={location}>{location}</option>
                                        ))}
                                    </Input>
                                    <FormFeedback>
                                            {this.state.locationErrorMessage}
                                    </FormFeedback>
                                </InputGroup>
                                <br />
                                <Row>
                                    <Col xs="auto">
                                        <Button
                                            onClick={this.handleCreateChannel}
                                            outline
                                            color="success"
                                        >
                                            Create channel
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

export default CreateChannel;
