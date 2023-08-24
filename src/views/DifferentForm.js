import React, { Component } from "react";
import "../style/DifferentForm.css";

class DifferentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="DifferentForm">
        <div className="PlacesList">
          {/* Ajouter le map sur les lieux sélectionnés par l'utilisateur  */}
          <div className="Title">
            <h1>Votre sélection</h1>
            <button>Enregistrer</button>
          </div>
        </div>
        <div className="Map">
          <div id="map"></div>
          <input
            id="pac-input"
            class="controls"
            type="text"
            placeholder="Entrez un lieu, une adresse.."
          />
          <div id="infowindow-content">
            <span id="place-name" class="title"></span>
            <br />
            <br />
            <span id="place-address"></span>
          </div>
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

      // Set the position of the marker using the place ID and location.
      // @ts-ignore This should be in @typings/googlemaps.
      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location,
      });
      marker.setVisible(true);
      console.log(place);
      infowindowContent.children.namedItem("place-name").textContent =
        place.name;
      infowindowContent.children.namedItem("place-address").textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });
  }

}

export default DifferentForm;
