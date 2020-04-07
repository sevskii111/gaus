import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import SizeComponent from "./SizeComponent";
import MatrixComponent from "./MatrixComponent";
import { solveGaus } from "../helpers/math";

class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 5,
      height: 4,
      matrix: [
        [3.75, 0.49, 3.34, -0.03, 3.12],
        [2.5, -1.1, 1.62, 1.52, 9.71],
        [-1.76, 2.16, 2.37, -0.68, -4.3],
        [-2.22, 2.12, -3.28, -2.06, 10.1]
      ],
      solution: null
    };

    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleMatrixChange = this.handleMatrixChange.bind(this);
  }

  handleSizeChange({ size }) {
    this.setState({ width: +size + 1, height: size });
  }

  handleMatrixChange(values) {
    this.setState({
      matrix: values,
      solution: solveGaus(values.map(x => [...x]))
    });
  }

  renderSolution() {
    if (!this.state.matrix) return;
    if (this.state.solution) {
      console.log(this.state.solution);
      return this.state.solution.map((x, i) => (
        <p key={i}>
          <b>
            X<sub>{i + 1}</sub>
          </b>
          ={x}
        </p>
      ));
    } else {
      return <h1 className="text-warning">Не удаётся найти решение</h1>;
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs={{ offset: 1, size: "10" }} className="mt-2">
            <SizeComponent handleSizeChange={this.handleSizeChange} />
            <MatrixComponent
              width={this.state.width}
              height={this.state.height}
              handleMatrixChange={this.handleMatrixChange}
              saddle={this.state.saddle}
              values={this.state.matrix}
            />
            {this.renderSolution()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MainComponent;
