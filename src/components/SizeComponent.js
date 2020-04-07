import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Input } from "reactstrap";

class SizeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 4
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target }) {
    let { name, value } = target;
    if (value <= 0) {
      value = "";
    }
    this.setState({ [name]: value });
    this.props.handleSizeChange({ ...this.state, [name]: value });
  }

  render() {
    return (
      <Row className="text-left">
        <Col xs={{ size: 12 }} md={{ size: "auto" }}>
          <h2>Введите колличество уравнений:</h2>
        </Col>
        <Col xs={11} md={3} className="mt-1">
          <Form>
            <FormGroup row>
              <Col>
                <Input
                  type="number"
                  placeholder={1}
                  name="size"
                  value={this.state.size}
                  onChange={this.handleInput}
                  min={1}
                />
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default SizeComponent;
