import React, { Component } from "react";
import MenswearComponent from "./MenswearComponent/MenswearComponent"
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Farfetch App</h1>
        <MenswearComponent />
      </div>
    );
  }
}

export default App;
