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
import { findPlaces } from '../App';

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            city: 'Lyon',
            typesPlaces: [
                {place: "aquarium", isChecked : false},
                {place: "cocktail", isChecked : false},
                {place: "mirrorball", isChecked : false},
                {place: "monalisa", isChecked : false},
                {place: "museum", isChecked : false},
                {place: "park", isChecked : false},
                {place: "praying", isChecked : false},
                {place: "roallercoaster", isChecked : false}
            ]   
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    //TODO: Créer une fonction addCity qui MAJ l'état city avec la valeur sélectionnée dans la liste des villes


    addOrRemoveTypePlace(e){
        // Replace icon by whitespace and retire it
        var typePlace = e.target.alt.replace('icon','').replace(/ /g, "");
        console.log('Location type selected: '+typePlace);

        // Find type of place in array of objects typesPlaces
        var placeSelected = this.state.typesPlaces.find((type) => type.place === typePlace);
        // Check the isChecked value of the type of place
        var isSelected = placeSelected.isChecked;

        // Update the state typesPlaces with invert isChecked value of the type of place selected
        this.setState(prevState => ({
            typesPlaces: prevState.typesPlaces.map(
            obj => (obj.place === typePlace ? Object.assign(obj, { isChecked: !isSelected }) : obj)
          )
        }));

        console.log("List of places and values: ",  this.state.typesPlaces);
    }

    //TODO: Créer une fonction onSubmit du formulaire qui récupère toutes les valeurs place dont la valeur isChecked == true puis envoie la/les requête(s) à partir du state récupéré
    onFormSubmit(event) {
        event.preventDefault();
        //console.log('onFormSubmit : ', this); 

        // Verify if a city has been selected
        if(!this.state.city){
            alert("Veuillez sélectionner une ville!");
        // Verify if at least a type of place has been selected   
        //TODO: Voir pour faire une vérification de la valeur isChecked pour chaque type de lieu 
        } else if (!this.state.typesPlaces[0].isChecked && !this.state.typesPlaces[1].isChecked){
            alert("Veuillez sélectionner au moins un type de lieu!");
        // If everything's ok we send request(s)    
        } else {
            //TODO: Envoyer la/les requête(s)
            alert("On envoie la/les requête(s)!");
            // Test de la fonction findPlaces dans le composant App (données en dure)
            var center = {
                lat: 45.763,
                lng: 4.835
            };
            var type = "cocktail";
            findPlaces(type);
        }
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className='cities'>
                    <p>Choississez une ville</p>
                    <select name="cities" id="cities">
                        <option value="Lyon">Lyon</option>
                        <option value="Paris">Paris</option>
                    </select>
                </div>
                <div>
                    <p>Choississez des types de lieux</p>
                    <div className='TypesPlaces'>
                        {/*<img src={aquarium} alt="aquarium icon" onClick={e => alert(e.target.alt)}/>*/}
                        {/*//TODO Voir pour récupérer au clic sur la div l'attribut alt de la balise enfant */}
                        <div className='TypePlace'>
                            <img src={aquarium} alt="aquarium icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Aquarium</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={cocktail} alt="cocktail icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Bar</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={mirrorball} alt="mirrorball icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>    
                            <p>Boite</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={monalisa} alt="monalisa icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Peinture</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={museum} alt="museum icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Musée</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={park} alt="park icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Parc</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={praying} alt="praying icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Culte</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={roallercoaster} alt="roallercoaster icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Attraction</p>
                        </div>                        
                    </div>
                    <button>Envoyer</button>
                </div>
            </form>
        );
    }
}

export default Form;