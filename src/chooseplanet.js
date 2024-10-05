import React, { useState, useEffect } from 'react';
import './App.css';
import earth from './earth.jpg';
import mars from './mars.jpg';
import jupiter from './jupiter.jpg';
import saturn from './saturn.jpg'; // New planet
import venus from './venus.jpg'; // New planet
import Planet from './Planet';
import Navbar from './navbar';
import menuImage from './menuimage.png'; // Import your menu image
import Appbackground from './Appbackground.png';
import leftIcon from './left.png'; // Import the left icon
import rightIcon from './right.png'; // Import the right icon
import { Link } from 'react-router-dom';

const planets = [
    { name: '11 Com b', image: earth },
    { name: '11 UMi b', image: mars },
    { name: '14 And b', image: jupiter },
    { name: '14 Her b', image: saturn }, // New planet added
    { name: '16 Cyg B b', image: venus }, // New planet added
];

async function NasaExoPlanetAPI() {
    let response = await fetch("https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,ra,dec,sy_dist+from+ps&format=json");
    let data = await response.json();

    for (let i = 0; i < 5; i++) {
        planets[i].name = data[i].pl_name;
    }
}

function Chooseplanet() {
    const [currentPlanet, setCurrentPlanet] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handlePrev = () => {
        setCurrentPlanet((prev) => (prev > 0 ? prev - 1 : planets.length - 1));
    };

    const handleNext = () => {
        setCurrentPlanet((prev) => (prev < planets.length - 1 ? prev + 1 : 0));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="App" style={{ color: 'white', textAlign: 'center' }}>
            {/* Navbar */}
            <Navbar />

            {/* Planet Display */}
            <div className="planet-display">
                <div className="slider-container">
                    <button className="slider-button" onClick={handlePrev}>
                        <img src={leftIcon} alt="Left" />
                    </button>
                    <div className="main-planet-container">
                        <Planet image={planets[currentPlanet].image} size={1.5} /> {/* Adjusted size of main planet */}
                    </div>
                    <button className="slider-button" onClick={handleNext}>
                        <img src={rightIcon} alt="Right" />
                    </button>
                </div>

                {/* Thumbnail Planets with Buttons */}
                <div className="thumbnails-container">
                    {planets.map((planet, index) => (
                        <div className="thumbnail-box" key={index}>
                            {/* 3D Planet on top of the name */}
                            <div className="thumbnail-planet-container">
                                <Planet image={planet.image} size={1.4} isRotate={false} /> {/* Increased size for thumbnails */}
                            </div>
                            <h2 className="planet-name">{planet.name}</h2>
                            <div className="thumbnail-buttons">
                                <Link to="/sky"><button>Explore</button></Link>
                                <button>Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chooseplanet;
