import React, { Component } from 'react';
import '../style/Block.css';
import PlaceCard from './PlaceCard';

class Block extends Component {
    render() {
        return (
            <div className='Block'>
                {/* Comment in React */}
                <div className='EnteteBloc'>                
                    <h1>Musée</h1>
                    <img src="https://upload.wikimedia.org/wikipedia/fr/1/11/Panda3D_Logo.png" style={{"width":"50px"}} alt="Logo"/>
                </div>
                <div className='Informations'>
                    <PlaceCard/>
                    <PlaceCard/>
                </div>
            </div> 
        );
    }
}


export default Block;

