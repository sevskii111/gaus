import React, { Component } from "react";
import { Table, Row, Col } from "reactstrap";

class MatrixComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width || 1,
      height: this.props.height || 1,
      values: this.props.values || [],
      readonly: this.props.readonly
    };
    if (!this.props.values) {
      for (let i = 0; i < this.state.height; i++) {
        this.state.values.push([]);
        for (let j = 0; j < this.state.width; j++) {
          this.state.values[i].push(0);
        }
      }
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleResize({ width, height }) {
    if (this.state.width === width && this.state.height === height) return;
    let oldValues = this.state.values;
    let newValues = [];
    for (let i = 0; i < height; i++) {
      newValues.push([]);
      for (let j = 0; j < width; j++) {
        if (oldValues[i]) {
          newValues[i].push(oldValues[i][j] || 0);
        } else {
          newValues[i].push(0);
        }
      }
    }
    this.setState({ width, height, values: newValues });
    this.props.handleMatrixChange(newValues);
  }

  componentDidUpdate() {
    this.handleResize(this.props);
  }

  componentDidMount() {
    if (!this.props.readonly) {
      this.props.handleMatrixChange(this.state.values);
    }
  }

  handleInput(x, y) {
    return ({ target }) => {
      const { value } = target;

      let oldValues = this.state.values;
      let newValues = [];
      for (let i = 0; i < this.state.height; i++) {
        newValues.push([]);
        for (let j = 0; j < this.state.width; j++) {
          if (oldValues[i]) {
            newValues[i].push(oldValues[i][j] || 0);
          } else {
            newValues[i].push(0);
          }
        }
      }
      newValues[x][y] = Number(value);
      this.props.handleMatrixChange(newValues);
      this.setState({ ...this.state, values: newValues });
    };
  }

  renderTable() {
    const calcBg = (i, j) => {
      if (!this.props.saddle) return "";
      if (i === this.props.saddle.y && j === this.props.saddle.x) {
        return "highlight";
      } else if (i === this.props.saddle.y || j === this.props.saddle.x) {
        return "semi-highlight";
      } else {
        return "";
      }
    };
    let columns = [];
    columns.push(
      <tr key="0c">
        {this.state.values[0].map((v, i) => (
          <th className="bg-light" key={`-${i}`}>
            {i === this.state.values[0].length - 1 ? (
              <p>Y</p>
            ) : (
              <p>
                X<sub>{i + 1}</sub>
              </p>
            )}
          </th>
        ))}
      </tr>
    );

    let maxs = [];
    for (let i = 0; i < this.state.height; i++) {
      let rows = [];
      let min = this.state.values[i][0];
      for (let j = 0; j < this.state.width; j++) {
        const val = this.props.readonly
          ? this.props.values[i][j]
          : this.state.values[i][j];
        min = Math.min(min, val);
        if (!maxs[j] || maxs[j] < val) {
          maxs[j] = val;
        }
        rows.push(
          <td key={`${i}-${j}`} className={calcBg(i, j)}>
            <input
              type="number"
              value={val || ""}
              placeholder="0"
              className={`table-input`}
              onChange={this.handleInput(i, j)}
              key={`${i}-${j}`}
              readOnly={this.props.readonly}
            />
          </td>
        );
      }
      columns.push(<tr key={i}>{rows}</tr>);
    }

    return columns;
  }

  render() {
    return (
      <>
        <Row>
          <Col xs={12} md="auto">
            <Table bordered className="text-center" responsive>
              <tbody>{this.renderTable()}</tbody>
            </Table>
          </Col>
        </Row>
      </>
    );
  }
}

export default MatrixComponent;
