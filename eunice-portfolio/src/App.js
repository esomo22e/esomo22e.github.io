import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Header from "./components/Header";
import FeaturedPortfolio from "./components/FeaturedPortfolio";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <FeaturedPortfolio></FeaturedPortfolio>
    </div>
  );
}

export default App;
