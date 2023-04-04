import React, { Component } from 'react';
import '../style/Form.css';
import aquarium from '../assets/aquarium_white_icon.png';
import cocktail from '../assets/cocktail_white_icon.png';
import mirrorball from '../assets/mirror-ball_white_icon.png';
import monalisa from '../assets/mona-lisa_white_icon.png';
import museum from '../assets/museum_white_icon.png';
import park from '../assets/park_white_icon.png';
import praying from '../assets/praying_white_icon.png';
import roallercoaster from '../assets/roallercoaster_white_icon.png';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            //TODO: Gérer le click sur les types de places avec un true/false qui ajoute/retire la valeur du tableau
            place: '',
            typesPlaces: []
            //TODO: Passer chaque type de lieu à false et les passer à true au click dessus
            
        }
    }

    addOrRemoveTypePlace(e){
        // Replace icon by whitespace and retire it
        var typePlace = e.target.alt.replace('icon','').replace(/ /g, "");
        console.log('location type selected: '+typePlace);
        //*TODO: pousser l'élément dans le tableau typesPlaces ? Ne pas pouvoir si déjà existant ?
    }

    //TODO: Créer une fonction onSubmit du formulaire qui récupère tous les états dont la valeur est true (?) et les pousse dans le tableau typesPlaces (?) puis envoie la/les requête(s) à partir du state récupéré
    
    render() {
        return (
            <form>
                <div className='cities'>
                    <p>Choississez une ville</p>
                    <select name="cities" id="cities">
                        <option value="Lyon">Lyon</option>
                        <option value="Paris">Paris</option>
                    </select>
                </div>
                <div>
                    <p>Choississez des types de lieux</p>
                    {/*TODO: Ajouter des textes pour une meilleure compréhension */}
                    <div className='TypesPlaces'>
                        {/*<img src={aquarium} alt="aquarium icon" onClick={e => alert(e.target.alt)}/>*/}
                        <img src={aquarium} alt="aquarium icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                        <img src={cocktail} alt="cocktail icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                        <img src={mirrorball} alt="mirrorball icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                        <img src={monalisa} alt="monalisa icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                        <img src={museum} alt="museum icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                        <img src={park} alt="park icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                        <img src={praying} alt="praying icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                        <img src={roallercoaster} alt="roallercoaster icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;