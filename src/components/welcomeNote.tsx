import * as React from "react";
import { Alert, Row, Col } from "reactstrap";

interface Props {}

interface State {
    isWelcomeNoteVisible: boolean
}

class WelcomeNote extends React.Component<Props, State> {

    state = {
        isWelcomeNoteVisible: true
    }

    componentDidMount() {
        const { REACT_APP_WELCOME_NOTE_VISIBILTY_TIMEOUT_MILLIS } = process.env
        setTimeout(() => {
            this.setState({
                ...this.state,
                isWelcomeNoteVisible: false
            })

        }, Number(REACT_APP_WELCOME_NOTE_VISIBILTY_TIMEOUT_MILLIS))
    }

    render() {
        return (
            <Row>
                <Col>
                    <Alert isOpen={this.state.isWelcomeNoteVisible}>
                        <h4 className="alert-heading">Welcome to Quick dates</h4>
                        <p>
                            You will get to connect with like minded people
                            instantly here.
                        </p>
                    </Alert>
                </Col>
            </Row>
        );
    }
}

export default WelcomeNote;
