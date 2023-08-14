import React, { Component } from 'react';
import '../style/Form.css';
import aquarium from '../assets/aquarium_dark_icon.png';
import cocktail from '../assets/cocktail_dark_icon.png';
import mirrorball from '../assets/mirror-ball_dark_icon.png';
import monalisa from '../assets/mona-lisa_dark_icon.png';
import museum from '../assets/museum_dark_icon.png';
import park from '../assets/park_dark_icon.png';
import praying from '../assets/praying_dark_icon.png';
import roallercoaster from '../assets/roallercoaster_dark_icon.png';
import cities from "../cities.json";
import cityicon from "../assets/city-icon.png";

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
            ],
            mapIsVisible: false,
            selectedPlaces: null   
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    changeCity = (e) => {
        let value = e.target.value;
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

    onFormSubmit(e) {
        e.preventDefault();

        var cityCoordinates = this.state.listCities.cities.find(city => city.name === this.state.city);

        var center = {
            lat: cityCoordinates.lat,
            lng: cityCoordinates.lng
        }

        console.log(center);

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

            // Verify if at least a type of place has been selected and send requests
            if(selectedTypes.length > 0){
                for(i in selectedTypes){
                    console.log("On passe ici");
                    this.findPlaces(center,selectedTypes[i]);
                }
            } else {
                alert("Selectionnez au moins un type de lieu !");
            }
        }
    }

    findPlaces(center, type){

        let map;

        map = new window.google.maps.Map(document.getElementById("map"), {
          center: center,
          zoom: 17,
        });

        let mapOptions = {
        center: center,
        zoom: 17
        };

        let radius;
        switch (type) {
        case 'zoo':
            radius = 15000;
            break;
        case 'bar':
            radius = 2000;
        break;  
        case 'night_club':
            radius = 2000;
        break;
        case 'art_gallery':
            radius = 3000;
        break;
        case 'museum':
            radius = 3000;
        break;
        case 'park':
            radius = 1500;
        break;
        case 'church':
            radius = 2500;
        break;
        case 'amusement_park':
            radius = 20000;
            break;
        default:
            console.log(`Sorry, there is no type of place.`);
        }

        let service;
        service = new window.google.maps.places.PlacesService(map);
       
        service.nearbySearch(
            { location: mapOptions.center, radius: radius, type: type},
            (results, status, pagination) => {
                console.log(status,results);
                if (status !== "OK" || !results){
                    console.log("Il y a une erreur lors de la récupération des données");
                } else {
                    console.log("La requête est ok");
                    /* var arrPlaces = [];
                    for(let i = 0; i < results.length; i++){
                        var placeId = results[i].place_id;
                        arrPlaces.push(placeId);
                    }
                    var data = JSON.stringify(arrPlaces);
                    localStorage.setItem('placesId', data);*/
                }
            }
        );
        //TODO: récupérer l'élément avec l'id map (querySelector) et lui passer une hauteur x large (car initialement la carte doit être cachée/vide)
        //TODO: ajouter les marqueurs sur la carte
        //TODO: passer des boutons de like aux marqueurs (au clic ajoute l'ID du lieu au localStorage)

    }
        
    // findInformationsPlace(){
    // loader
    // .load()
    // .then((google) => {
    //     //! Les variables mapOptions & map ne seront pas utilisées à ce niveau à terme, ici elles sont utilisées pour un test préalable (test OK)
    //     //! Le centre correspond à la ville de Lyon (il faudra passer le centre selon la ville sélectionnée)
    //     var mapOptions = {
    //     center: {
    //         lat: 45.765,
    //         lng: 4.832
    //     },
    //     zoom: 17
    //     };
    //     var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //     var infowindow = new google.maps.InfoWindow();
    //     var service = new google.maps.places.PlacesService(map);
    //     var ids = localStorage.getItem("placesId");
    //     var placesId = ids.replace('[','').replace(']','').replaceAll('"','').split(',');
    
    //     for(let i = 0; i < placesId.length; i++){
    //     var request = {
    //         placeId: placesId[i]
    //     };
    //     service.getDetails(request, function(place, status) {
    //         // console.log("Statut de la requête:"+status)
    //         if (status === google.maps.places.PlacesServiceStatus.OK) {
    //         //TODO: Add markers on map and a like button on every marker if click event on push placeId in localStorage
    //         var marker = new google.maps.Marker({
    //             map: map,
    //             position: place.geometry.location
    //         });
    //         google.maps.event.addListener(marker, 'click', function() {
    //             //TODO: Passer les infos relatives au lieu
    //             const content = document.createElement("div");
    
    //             const nameElement = document.createElement("h2");
    //             nameElement.textContent = place.name;
    //             content.appendChild(nameElement);
    
    //             const placeAddressElement = document.createElement("p");
    //             placeAddressElement.textContent = place.formatted_address;
    //             content.appendChild(placeAddressElement);
    
    //             if(place.website !== undefined) {
    //             const websiteElement = document.createElement("a");
    //             websiteElement.href = place.website;
    //             websiteElement.target = "_blank";
    //             websiteElement.textContent = "Site web";
    //             content.appendChild(websiteElement);
    //             }
    
    //             if(place.user_ratings_total > 0) {
    //             const placeRatingElement = document.createElement("p");
    //             placeRatingElement.textContent = place.rating + "/5 ⭐";
    //             content.appendChild(placeRatingElement);
    //             const nbOfRatings = document.createElement("p");
    //             nbOfRatings.textContent = place.user_ratings_total + " avis";
    //             content.appendChild(nbOfRatings);
    //             }
    
    //             const likeElement = document.createElement("button");
    //             likeElement.classList.add("likeBtn");
    //             likeElement.textContent = "❤";
    //             likeElement.addEventListener("click", function(){
    //             likeElement.classList.add("likeBtnLiked");
    //             })
    //             content.appendChild(likeElement);
                
    //             infowindow.setContent(content);
    //             infowindow.open(map, this);
    
    //         });
    //         }
    //     });
    //     }
    
    
    // })
    // .catch(e => {
    //     // do something
    // });
    // }

    render() {
        return (
            <div className='Form'>
                <form onSubmit={this.onFormSubmit}>
                <img src={cityicon} alt="city icon" />
                    <div className='cities'>
                        <p>Ville</p>
                        <select name="cities" id="cities" onChange={this.changeCity}>
                            <option value="lyon">Lyon</option>
                            <option value="paris">Paris</option>
                            <option value="newyork">New York</option>
                        </select>
                    </div>
                    <div>
                        <p>Types de lieux</p>
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
                <div id='map'></div>
            </div>
        );
    }
}

export default Form;

