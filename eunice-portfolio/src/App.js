import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import About from "./pages/About";
import Resume from "./pages/Resume";
import PortfolioPage from "./pages/PortfolioPage";
import FeaturedPortfolio from "./components/FeaturedPortfolio";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <div className="App">
        <Nav onPageChange={handlePageChange} />
        {/* <Header /> */}
        {/* {currentPage === "home" && <Header />} */}
        {/* {currentPage === "home" && <FeaturedPortfolio />}
        {currentPage === "about" && <About />}
        {currentPage === "resume" && <Resume />}
        {currentPage === "portfolio" && <PortfolioPage />} */}

        {/* Add more conditions for other pages */}
        {/* Hello testing */}
      
        <Routes>
          <Route path="/pages/about" element={<About />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/" element={<FeaturedPortfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
