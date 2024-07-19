import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "../style/DifferentForm.css";
import Navbar from "../components/Navbar";
import { connect } from "react-redux";

class DifferentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: null,
      places: [],
      shouldRedirect: null,
    };

    this.saveList = this.saveList.bind(this);
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="DifferentForm">
          <div className="SelectionsList">
            <div className="Title">
              <h1>Votre sélection</h1>
              <button onClick={this.saveList}>Enregistrer</button>
            </div>
            <ul>
              {this.state.places.map((place) => (
                <li key={place.placeId}>{place.name}</li>
              ))}
            </ul>
          </div>
          <div className="Map">
            <div id="map"></div>
            <input
              id="pac-input"
              class="controls"
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
    // Specify just the place data fields that you need.
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
    const infowindowContent = document.getElementById("infowindow-content");

    infowindow.setContent(infowindowContent);

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

      //* Set the position of the marker using the place ID and location.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location,
      });
      marker.setVisible(true);
      console.log(place);

      let content = document.createElement("div");

      console.log("Pays du lieu:");
      console.log(place.address_components[place.address_components.length-2].long_name);
      console.log("Type name :"+ typeof place.name);
      console.log(place.name);
      console.log("Type user ratings total :"+ typeof place.user_ratings_total);
      console.log(place.user_ratings_total);
      console.log("Type rating :"+ typeof place.rating);
      console.log(place.rating);
      console.log("Type adresse formattée :"+ typeof place.formatted_address);
      console.log(place.formatted_address);
      console.log("Type horaires d'ouverture :"+ typeof place.opening_hours.weekday_text);
      console.log(place.opening_hours.weekday_text);
      console.log("Type site web :"+ typeof place.website);
      console.log(place.website);
      console.log("Type des types de lieux :"+ typeof place.types);   
      console.log(place.types);

      if (place.photos) {
        let placeImg = document.createElement("img");
        placeImg.src = place.photos[0].getUrl({
          maxWidth: 230,
          maxHeight: 135,
        });
        placeImg.classList.add("ImgMarker");
        content.appendChild(placeImg);

        //* On stocke l'URL des images du lieu
        for (let i = 0; i < place.photos.length; i++) {
          let url = place.photos[i].getUrl({ maxWidth: 460, maxHeight: 270 }).replaceAll('"','');
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
        this.setState({ places: [...this.state.places, place] });
        setTimeout(() => {
          console.log(this.state.places);
        }, 2000);
      });
      content.appendChild(likeBtn);

      infowindow.setContent(content);
      infowindow.open(map, marker);
    });
  }

  saveList() {
    //* Parcourir l'état places
    let places = this.state.places;

    //* On vérifie si la clé valeur ville est la même pour tous les objets
    //* Si ça n'est pas le cas on maj l'état city avec le pays si c'est OK on maj l'état city avec la ville
    //! Non opérationnel selon la ville, le continent...
    // let isSameCity = places.every(place => place.address_components[5].long_name === places[0].address_components[5].long_name);
    // isSameCity ? this.setState({ city: places[0].address_components[6].long_name }) : this.setState({ city: places[0].address_components[5].long_name });

    let countryIndex = places[0].address_components.length - 2;
    this.setState({
      city: places[0].address_components[countryIndex].long_name,
    });

    let city = this.state.city;
    if (places.length > 0 && city != null) {
      let destination = {
        city: this.state.city,
        places: this.state.places,
      };
      console.log(destination);
      this.props.addDestination(destination);
      this.setState({ shouldRedirect: true });
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDestination: (payload) => dispatch({ type: "ADD_DESTINATION", payload }),
  };
};

export default connect(null, mapDispatchToProps)(DifferentForm);
