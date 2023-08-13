import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/EmptyList.css';
import emptyfolder from '../assets/emptyfolder_dark_icon.png';

class EmptyList extends Component {
    render() {
        return (
            <div className='EmptyList'>
                <img src={emptyfolder} alt="empty folder icon" />
                <p>Votre liste de destinations semble vide, vous pouvez en créer une via le bouton suivant : </p>
                <Link to={"/form"} className="redirection">Créer une destination</Link>
            </div>
        );
    }
}

export default EmptyList;