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
import cities from "../cities.json";

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listCities: cities,
            city: "lyon",
            typesPlaces: [
                {place: "zoo", isChecked : false},
                {place: "bar", isChecked : false},
                {place: "night_club", isChecked : false},
                {place: "art_gallery", isChecked : false},
                {place: "museum", isChecked : false},
                {place: "park", isChecked : false},
                {place: "church", isChecked : false},
                {place: "amusement_park", isChecked : false}
            ]   
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    changeCity = (event) => {
        let value = event.target.value;
        this.setState(prevState => ({ city: prevState.city = value}))
    };

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

    onFormSubmit(event) {
        event.preventDefault();

        //console.log("Selected city: "+this.state.city);

        var cityCoordinates = this.state.listCities.cities.find(city => city.name === this.state.city);
        /* console.log('%c City coordinates: ', 'background: #ffff62; color: #000');
        console.log(cityCoordinates); */

        var center = {
            lat: cityCoordinates.lat,
            lng: cityCoordinates.lng
        }
        /* console.log('%c Central city coordinates: ', 'background: #ffff62; color: #000');
        console.log(center); */

        // Verify if a city has been selected
        if(!this.state.city){
            alert("Select a city!"); 
        } else {
            var selectedTypes = [];
            for (var i = 0; i < this.state.typesPlaces.length; i++) {
                if (this.state.typesPlaces[i].isChecked) {
                    selectedTypes.push(this.state.typesPlaces[i].place);
                }
            } 
            /* console.log("Types of place selected :"+selectedTypes); 
            console.log("On envoie la/les requête(s)!"); */

            // Verify if at least a type of place has been selected and send requests
            if(selectedTypes.length > 0){
                for(i in selectedTypes){
                    findPlaces(center,selectedTypes[i]);
                }
            } else {
                alert("Selectionnez au moins un type de lieu !");
            }
        }
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div className='cities'>
                    <p>Choississez une ville</p>
                    {/*//TODO Update this.state.city with the new value selected */}
                    <select name="cities" id="cities" onChange={this.changeCity}>
                        <option value="lyon">Lyon</option>
                        <option value="paris">Paris</option>
                        <option value="newyork">New York</option>
                    </select>
                </div>
                <div>
                    <p>Choississez des types de lieux</p>
                    <div className='TypesPlaces'>
                        {/*<img src={aquarium} alt="zoo icon" onClick={e => alert(e.target.alt)}/>*/}
                        {/*//TODO Voir pour récupérer au clic sur la div l'attribut alt de la balise enfant */}
                        <div className='TypePlace'>
                            <img src={aquarium} alt="zoo icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Zoo</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={cocktail} alt="bar icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Bar</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={mirrorball} alt="night_club icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>    
                            <p>Boite</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={monalisa} alt="art_gallery icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
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
                            <img src={praying} alt="church icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
                            <p>Culte</p>
                        </div>
                        <div className='TypePlace'>
                            <img src={roallercoaster} alt="amusement_park icon" onClick={this.addOrRemoveTypePlace.bind(this)}/>
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

