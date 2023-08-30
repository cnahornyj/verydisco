import React, { Component } from 'react';
import '../style/PlaceCard.css';

class PlaceCard extends Component {
    render() {
        return (
            <div className='PlaceCard'>
                <img src="https://www.sciencesetavenir.fr/assets/img/2022/07/04/cover-r4x3w1200-62c2825fb3e2b-6d4075469d9584386c0f08b7a633ff1d267da409-jpg.jpg" style={{"width":"50%"}} alt="Bloc"/>
                <div className='TextInformations'>
                    <h4>Panda city</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <img src="https://www.svgrepo.com/show/59321/information-icon.svg" alt="Icône informations" />
                </div>
            </div>
        );
    }
}

export default PlaceCard;