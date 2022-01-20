import * as React from "react";
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Col,
} from "reactstrap";

interface Props {}

interface State {}

class ContactUs extends React.Component<Props, State> {
    render() {
        return (
            <Row>
                <Col>
                    <Card
                        body
                        color="danger"
                        outline
                        style={{ textAlign: "center" }}
                    >
                        <CardBody>
                            <CardTitle tag="h5">Contact Us</CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                                Have an idea to share with us or feature that you think would be helpful ? <br/>
                                Please drop us your comments or idea here and we will get back to you on the shared email.
                            </CardSubtitle>
                            <CardText>
                                
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ContactUs;
