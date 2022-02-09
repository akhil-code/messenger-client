import * as React from "react";
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    Button,
    CardText,
    Col,
} from "reactstrap";


interface Props {}

interface State {}

class SupportPage extends React.Component<Props, State> {
    render() {
        return (
            <Row>
                <Col>
                    <Card
                        body
                        color="warning"
                        outline
                        style={{ textAlign: "center" }}
                    >
                        <CardBody>
                            <CardTitle tag="h5">Support Us</CardTitle>
                            <CardText>
                                Please support us with a donation so that we can
                                better maintain and improve this platform with
                                new features.
                            </CardText>

                            <Row>
                                <Col>
                                    <Button color="primary" outline>
                                        Donate by UPI - quickdatesfunda@ybl
                                    </Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>

                
            </Row>
        );
    }
}

export default SupportPage;
