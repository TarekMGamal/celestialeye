import React from 'react';
import "./App.css";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar" style={{ color: 'white', textAlign: 'center' }}>
            <Link className='link' to="/">
                <h1>Celestial Eye</h1>
              </Link>
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search-input" />
            </div>
            <div className="explore-details-buttons">
                <button>My constellation</button>
                <button>Contact us</button>
            </div>
        </nav>
    )
}


export default Navbar