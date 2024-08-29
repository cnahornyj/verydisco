import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "../style/DifferentForm.css";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";
import axios from 'axios';

class DifferentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: null,
      places: [],
      destinationId: null,
      shouldRedirect: null,
    };

    this.saveList = this.saveList.bind(this);
    this.addPlaceToDestination = this.addPlaceToDestination.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="DifferentForm">
          <div className="SelectionsList">
            <div className="Title">
              <h1>Votre sélection</h1>
              <button onClick={this.saveList}>Enregistrer</button>
            </div>
            <ul>
              {this.state.places.map((place) => (
                <li key={place.place_id}>{place.name}</li>
              ))}
            </ul>
          </div>
          <div className="Map">
            <div id="map"></div>
            <input
              id="pac-input"
              className="controls"
              type="text"
              placeholder="Entrez un lieu, une adresse.."
            />
          </div>
          {this.state.shouldRedirect ? <Navigate replace to="/home" /> : null}
        </div>
      </div>
    );
  }

  componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 48.857, lng: 2.352 },
      zoom: 13,
    });
    const input = document.getElementById("pac-input");
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      fields: [
        "place_id",
        "geometry",
        "formatted_address",
        "name",
        "website",
        "vicinity",
        "rating",
        "user_ratings_total",
        "address_components",
        "editorial_summary",
        "opening_hours",
        "photos",
        "reviews",
        "price_level",
        "type",
      ],
    });

    autocomplete.bindTo("bounds", map);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    const infowindow = new window.google.maps.InfoWindow();
    const marker = new window.google.maps.Marker({ map: map });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });

    autocomplete.addListener("place_changed", () => {
      infowindow.close();

      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location,
      });
      marker.setVisible(true);

      let content = document.createElement("div");

      let countryIndex = place.address_components.length - 2;
      let country = place.address_components[countryIndex].long_name;
      console.log(country);

      if (place.photos) {
        for (let i = 0; i < place.photos.length; i++) {
          let url = place.photos[i].getUrl({ maxWidth: 460, maxHeight: 270 }).replaceAll('"', '');
          Object.assign(place.photos[i], { imgUrl: url });
        }
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
        this.addPlaceToDestination(place, country);
      });
      content.appendChild(likeBtn);

      infowindow.setContent(content);
      infowindow.open(map, marker);
    });
  }

  addPlaceToDestination(place, country) {
    this.setState(prevState => {
      const newState = {
        places: [...prevState.places, { ...place, country: country }]
      };
      console.log("New state after adding place:", newState);
      return newState;
    });
  }

  async saveList() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
  
    if (this.state.places.length === 0) {
      return;
    }
  
    // Mapper les données récupérées de l'API Google Maps aux champs de ton modèle Mongoose
    const mappedPlaces = this.state.places.map((place) => ({
      name: place.name,
      formatted_address: place.formatted_address, // Mapping de formatted_address à address
      user_ratings_total: place.user_ratings_total,
      rating: place.rating,
      openingHours: place.opening_hours ? place.opening_hours.weekday_text.join(', ') : '',
      photo: place.photos && place.photos.length > 0 ? place.photos[0].imgUrl : '',
      website: place.website,
      types: place.types,
      placeId: place.place_id,
      address_components: place.address_components,
      reviews: place.reviews ? place.reviews.map(review => ({
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        profile_photo_url: review.profile_photo_url
      })) : [] // Vérification de l'existence de reviews
    }));
  
    const country = this.state.places[0].country;
    this.setState({ country: country }, async () => {
      if (!this.state.destinationId) {
        try {
          // Création d'une nouvelle destination
          const response = await axios.post(
            'http://localhost:3000/api/destination/',
            {
              userId: userId,
              country: this.state.country,
            },
            {
              headers: {
                Authorization: `Bearer ${token.slice(1, -1)}`,
                'Content-Type': 'application/json',
              },
            }
          );
          this.setState({ destinationId: response.data._id }, async () => {
            // Ajout des lieux à la destination créée
            try {
              await axios.post(
                `http://localhost:3000/api/destination/${this.state.destinationId}/add-places/`,
                {
                  places: mappedPlaces, // Utilisation des lieux mappés
                },
                {
                  headers: {
                    Authorization: `Bearer ${token.slice(1, -1)}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
              this.setState({ shouldRedirect: true });
            } catch (error) {
              console.error("Error adding places to destination:", error);
            }
          });
        } catch (error) {
          console.error("Error creating destination:", error);
        }
      }
    });
  }
  
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  addDestination: (payload) => dispatch({ type: "ADD_DESTINATION", payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DifferentForm);
