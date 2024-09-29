import React, { useState } from 'react';
import './Portfolio.css'; // For styling

function Portfolio() {
    const [activeSquare, setActiveSquare] = useState(null);

    const handleSquareClick = (index) => {
        setActiveSquare(index);
    };

    const handleClosePopup = () => {
        setActiveSquare(null);
    };

    return (
        <div className="portfolio-container">
            <div className="portfolio-grid">
                {Array(9).fill(null).map((_, index) => (
                    <div 
                        key={index} 
                        className="portfolio-square" 
                        onClick={() => handleSquareClick(index)}
                    >
                        Square {index + 1}
                    </div>
                ))}
            </div>

            {activeSquare !== null && (
                <div className="portfolio-popup">
                    <div className="popup-content">
                        <button className="close-btn" onClick={handleClosePopup}>X</button>
                        <h2>Square {activeSquare + 1} Content</h2>
                        <p>This is the content for the square {activeSquare + 1}.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Portfolio;
