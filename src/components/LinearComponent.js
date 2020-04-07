import React from "react";
import { Row, Col } from "reactstrap";
import { lienarSolve } from "../helpers/math";
import { transpose } from "mathjs";

const playerSolution = (ind, a, s) => {
  const Solution = () => s ? (
    <div>
      <h4>Решение:</h4>
      <p>y = {s[s.length - 1].toFixed(2)}</p>
      {s.slice(0, s.length - 1).map((s, i) => (
        <p key={`s-${i}`}>
          p<sub>{i + 1}</sub> = {s.toFixed(2)}
        </p>
      ))}
    </div>
  ) : (
    <div className="text-danger">Система не имеет решений</div>
  );
  return (
    <div>
      <h3>Система уравнений для {ind} игрока</h3>
      {a.map((aa, i) => (
        <p key={`a-${i}`}>
          {aa.splice(0, aa.length - 1).map((p, j) => (
            <span key={`a-${i}-${j}`}>
              {p >= 0 && j !== 0 ? `+${p}` : p}p<sub>{j + 1}</sub>
            </span>
          ))}{" "}
          = {i < a.length - 1 ? "y" : "1"}
        </p>
      ))}
      <Solution />
    </div>
  );
};

const LinearComponent = ({ matrix }) => {
  if (!matrix || !matrix[0] || matrix.length !== matrix[0].length) {
    return <div />;
  }
  const solutions = [lienarSolve(transpose(matrix)), lienarSolve(matrix)];
  return (
    <Row>
      <Col xs={12}>
        <hr />
        <h2 className="text-success">Таблица имеет вид NxN</h2>
        {playerSolution(1, solutions[0].a, solutions[0].s)}
        {playerSolution(2, solutions[1].a, solutions[1].s)}
      </Col>
    </Row>
  );
};

export default LinearComponent;
