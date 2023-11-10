import React, { Component } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import "../style/Navbar.css";
import logout_icon from '../assets/logout_white_icon.png';

class Navbar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          disconnected: null
        };

        this.logOut = this.logOut.bind(this);
      }
    
    render() {
        return (
            <div className='Navbar'>
                <h1>Verydisco</h1>
                <nav>
                    <ul>
                        <li><NavLink exact to="/home">Accueil</NavLink></li>
                        <img src={logout_icon} alt="Bouton de déconnexion" className='logOutIcon' onClick={this.logOut}/>
                        {this.state.disconnected && <Navigate to={'/login'}/>}
                    </ul>
                </nav>
            </div>
        );
    }

    logOut(){
        localStorage.removeItem("token");
        setTimeout(() => {
            this.setState({disconnected: true});
          }, 1000);
    }
}

export default Navbar;