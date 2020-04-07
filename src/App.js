import React from "react";
import { render } from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Main from "./components/MainComponent";

class App extends React.Component {
  render() {
    return <Main />;
  }
}

render(<App />, document.getElementById("root"));
