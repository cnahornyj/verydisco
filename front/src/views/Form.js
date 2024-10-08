import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import "../style/Form.css";
import aquarium from "../assets/aquarium_dark_icon.png";
import cocktail from "../assets/cocktail_dark_icon.png";
import mirrorball from "../assets/mirror-ball_dark_icon.png";
import monalisa from "../assets/mona-lisa_dark_icon.png";
import museum from "../assets/museum_dark_icon.png";
import park from "../assets/park_dark_icon.png";
import praying from "../assets/praying_dark_icon.png";
import roallercoaster from "../assets/roallercoaster_dark_icon.png";
import cities from "../cities.json";
import cityicon from "../assets/city-icon.png";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listCities: cities,
      city: "lyon",
      typesPlaces: [
        { place: "zoo", isChecked: false },
        { place: "bar", isChecked: false },
        { place: "night_club", isChecked: false },
        { place: "art_gallery", isChecked: false },
        { place: "museum", isChecked: false },
        { place: "park", isChecked: false },
        { place: "church", isChecked: false },
        { place: "amusement_park", isChecked: false },
      ],
      mapIsVisible: false,
      shouldRedirect: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  changeCity = (e) => {
    let value = e.target.value;
    this.setState((prevState) => ({ city: (prevState.city = value) }));
  };

  addOrRemoveTypePlace(e) {
    //* Replace icon by whitespace and retire it
    var typePlace = e.target.alt.replace("icon", "").replace(/ /g, "");
    console.log("Location type selected: " + typePlace);

    //* Trouver le type de lieu dans le tableau d'objets typesPlaces
    var placeSelected = this.state.typesPlaces.find(
      (type) => type.place === typePlace
    );
    //* Vérifie la valeur boléenne du type de lieu
    var isSelected = placeSelected.isChecked;

    //* Met à jour l'état typesPlaces avec la valeur inversée isChecked du type de lieu sélectionné
    this.setState((prevState) => ({
      typesPlaces: prevState.typesPlaces.map((obj) =>
        obj.place === typePlace
          ? Object.assign(obj, { isChecked: !isSelected })
          : obj
      ),
    }));
    console.log("Liste des lieux sélectionnés ou non: ");
    for (let i = 0; i < this.state.typesPlaces.length; i++) {
      console.log(this.state.typesPlaces[i]);
    }
  }

  onFormSubmit(e) {
    e.preventDefault();

    //* On récupère les coordonnées géographiques du centre de la ville sélectionnée
    var cityCoordinates = this.state.listCities.cities.find(
      (city) => city.name === this.state.city
    );

    //* On passe la latitude et la longitude du centre de la ville dans un objet
    var center = {
      lat: cityCoordinates.lat,
      lng: cityCoordinates.lng,
    };

    //* On vérifie si une ville a été sélectionnée
    if (!this.state.city) {
      alert("Select a city!");
    } else {
      this.props.addCity(this.state.city);
      var selectedTypes = [];
      for (var i = 0; i < this.state.typesPlaces.length; i++) {
        if (this.state.typesPlaces[i].isChecked) {
          selectedTypes.push(this.state.typesPlaces[i].place);
        }
      }
      //* On vérifie si au moins un type de lieu a été sélectionné
      if (selectedTypes.length > 0) {
        for (i in selectedTypes) {
          console.log("On passe ici");
          //* On envoie la/les requêtes
          this.findPlaces(center, selectedTypes[i]);
        }
      } else {
        //* On affiche un message d'erreur
        alert("Selectionnez au moins un type de lieu !");
      }
    }
  }

  findPlaces(center, type) {

    let map;

    map = new window.google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 12,
    });

    let mapOptions = {
      center: center,
      zoom: 12,
    };

    //* On définit un rayon plus ou moins conséquent selon le type de lieu sélectionné
    let radius;
    switch (type) {
      case "zoo":
        radius = 15000;
        break;
      case "bar":
        radius = 2000;
        break;
      case "night_club":
        radius = 2000;
        break;
      case "art_gallery":
        radius = 3000;
        break;
      case "museum":
        radius = 3000;
        break;
      case "park":
        radius = 1500;
        break;
      case "church":
        radius = 2500;
        break;
      case "amusement_park":
        radius = 20000;
        break;
      default:
        console.log(`Sorry, there is no type of place.`);
    }

    let service;
    service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(
      { location: mapOptions.center, radius: radius, type: type },
      (results, status) => {
        console.log(status, results);
        if (status !== "OK" || !results) {
          console.log("Il y a une erreur lors de la récupération des données");
        } else {
          this.setState({ mapIsVisible: true });

          let infowindow;
          infowindow = new window.google.maps.InfoWindow();
          //* Pour chaque lieu on récupère l'id
          for(let i = 0; i < results.length; i++){
            var request = {
                placeId: results[i].place_id,
                fields: ['name', 'vicinity', 'rating', 'user_ratings_total', 'website', 'photos', 'geometry', 'address_components', 'editorial_summary', 'opening_hours']
            };
            //* Et on le passe à la fonction getDetails pour plus de détails sur le lieu
            service.getDetails(request, (place, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  //console.log(place);
                  var photos = place.photos;
                  if (!photos) {
                    return;
                  }
                  let marker = new window.google.maps.Marker({
                      map,
                      position: place.geometry.location
                  });
                  //* On crée un marqueur pour chaque lieu, au clic on affiche des informations sur le lieu
                  window.google.maps.event.addListener(marker, "click", () => {
                    let content = document.createElement("div");

                    if(photos.length > 0){
                      let placeImg = document.createElement("img");
                      placeImg.src = photos[0].getUrl({maxWidth: 230, maxHeight: 135});
                      placeImg.classList.add("ImgMarker");
                      content.appendChild(placeImg);
                      //TODO: stocker l'url dans l'élément
                      let urlImg = {url_main_image : photos[0].getUrl({maxWidth: 230, maxHeight: 135})};
                      console.log(urlImg);
                    }

                    let placeName = document.createElement("h2");
                    placeName.textContent = place.name;
                    content.appendChild(placeName);
                    if (place.rating > 0) {
                      let placeRating = document.createElement("p");
                      placeRating.textContent = place.rating + "/5 ⭐";
                      content.appendChild(placeRating);
                    }
                    if (place.website !== undefined) {
                      let placeWebsite = document.createElement("a");
                      placeWebsite.href = place.website;
                      placeWebsite.target = "_blank";
                      placeWebsite.textContent = "Site web";
                      placeWebsite.classList.add("linkWebsite");
                      content.appendChild(placeWebsite);
                    }
                    let likeBtn = document.createElement("button");
                    likeBtn.classList.add("likeBtn");
                    likeBtn.textContent = "❤";
                    likeBtn.addEventListener("click", () => {
                      likeBtn.classList.add("likeBtnLiked");
                      this.props.prependPlace(place);
                    });
                    content.appendChild(likeBtn);

                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
              }
            });
          };
        }
      }
    );
  }

  saveFinalList = () => {
    this.props.addDestinationAndDetails();
    this.setState({ shouldRedirect: true });
  };

  render() {
    return (
      <div className="Form">
        <form
          onSubmit={this.onFormSubmit}
          style={{ filter: this.state.mapIsVisible ? "blur(5px)" : null }}
        >
          <img src={cityicon} alt="city icon" />
          <div className="cities">
            <p>Ville</p>
            <select name="cities" id="cities" onChange={this.changeCity}>
              <option value="lyon">Lyon</option>
              <option value="paris">Paris</option>
              <option value="newyork">New York</option>
            </select>
          </div>
          <div>
            <p>Types de lieux</p>
            <div className="TypesPlaces">
              <div className="TypePlace">
                <img
                  src={aquarium}
                  alt="zoo icon"
                  onClick={this.addOrRemoveTypePlace.bind(this)}
                />
                <p>Zoo</p>
              </div>
              <div className="TypePlace">
                <img
                  src={cocktail}
                  alt="bar icon"
                  onClick={this.addOrRemoveTypePlace.bind(this)}
                />
                <p>Bar</p>
              </div>
              <div className="TypePlace">
                <img
                  src={mirrorball}
                  alt="night_club icon"
                  onClick={this.addOrRemoveTypePlace.bind(this)}
                />
                <p>Boite</p>
              </div>
              <div className="TypePlace">
                <img
                  src={monalisa}
                  alt="art_gallery icon"
                  onClick={this.addOrRemoveTypePlace.bind(this)}
                />
                <p>Peinture</p>
              </div>
              <div className="TypePlace">
                <img
                  src={museum}
                  alt="museum icon"
                  onClick={this.addOrRemoveTypePlace.bind(this)}
                />
                <p>Musée</p>
              </div>
              <div className="TypePlace">
                <img
                  src={park}
                  alt="park icon"
                  onClick={this.addOrRemoveTypePlace.bind(this)}
                />
                <p>Parc</p>
              </div>
              <div className="TypePlace">
                <img
                  src={praying}
                  alt="church icon"
                  onClick={this.addOrRemoveTypePlace.bind(this)}
                />
                <p>Culte</p>
              </div>
              <div className="TypePlace">
                <img
                  src={roallercoaster}
                  alt="amusement_park icon"
                  onClick={this.addOrRemoveTypePlace.bind(this)}
                />
                <p>Attraction</p>
              </div>
            </div>
            <button>Envoyer</button>
          </div>
        </form>
        <div className="Suggestions">
          {this.state.mapIsVisible ? (
            <div className="SelectedPlaces">
              <div>
                <p>Votre sélection</p>
                <button onClick={this.saveFinalList} className="sendFinalList">
                  Enregistrer
                </button>
              </div>
              {/* On affiche la liste des lieux likés par l'utilisateur */}
              {this.props.placesSelected.map((place) => (
                <p key={place.placeId}>{place.name}</p>
              ))}
            </div>
          ) : null}
          <div
            id="map"
            style={{
              width: this.state.mapIsVisible ? "500px" : "0",
              height: this.state.mapIsVisible ? "500px" : "0",
              borderTopRightRadius: this.state.mapIsVisible ? "30px" : "0",
              borderBottomRightRadius: this.state.mapIsVisible ? "30px" : "0",
            }}
          ></div>
        </div>
        {this.state.shouldRedirect ? (
         <Navigate replace to="/" />
       ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    citySelected: state.city,
    placesSelected: state.places,
    destinations: state.destinations 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addCity: (city) => dispatch({ type: 'ADD_CITY', payload: city }),
      prependPlace: (place) => dispatch({ type: 'PREPEND_PLACE', payload: place }),
      deletePlace: () => dispatch({ type: 'DELETE_PLACE' }),
      addDestinationAndDetails: () => dispatch({ type: 'ADD_DESTINATIONS' })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
