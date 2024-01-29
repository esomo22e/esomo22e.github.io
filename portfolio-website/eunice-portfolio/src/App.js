import logo from "./logo.svg";
import Container from "react-bootstrap/Container";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import Header from "./components/Header.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <Header></Header>
      <logo></logo>
    </div>
  );
}

export default App;
