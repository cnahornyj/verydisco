import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "../style/Navbar.css";

class Navbar extends Component {
    render() {
        return (
            <div className='Navbar'>
                <h1>Verydisco</h1>
                <nav>
                    <ul>
                        <li><NavLink exact to="/">Accueil</NavLink></li>
                        <li><NavLink exact to="/apropos">A propos</NavLink></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Navbar;