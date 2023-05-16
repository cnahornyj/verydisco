import Navbar from './components/Navbar';
// import Block from './components/Block';
import Form from './components/Form';
import './App.css';
import { Loader } from "@googlemaps/js-api-loader";

import React, { Component } from 'react';

class App extends Component {

  render() {

    return (
      <main>
        <Navbar/>
        <Form/>
        <div id='map'> 
        {/* <div id='map' onLoad={findPlaces("night_club")}>  */}
        </div>
      </main>
    );
  }
}

var loader = new Loader({
  //TODO: Place apiKey for testing and use dotenv for sensible data
  apiKey: "",
  version: "weekly",
  libraries: ["places"]
});
   
//TODO: Use for retrieve place id and after place details
export function findPlaces(center, type){
  loader
  .load()
  .then((google) => {
    var mapOptions = {
      center: center,
      zoom: 17
    };

    var radius;
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
      case 'monalisa':
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

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      { location: mapOptions.center, radius: radius, type: type},
      (results, status, pagination) => {
        console.log(status,results);
        if (status !== "OK" || !results){
          //TODO: Add markers on map
          /*return;
          const infowindow = new google.maps.InfoWindow();
          const marker = new google.maps.Marker({
            map,
            position: results.geometry.location,
          });
          google.maps.event.addListener(marker, "click", () => {
            const content = document.createElement("div");
            const nameElement = document.createElement("h2");

            nameElement.textContent = results.name;
            content.appendChild(nameElement);

            infowindow.setContent(content);
            infowindow.open(map, marker);
          });*/
        }
      }
    );

  })
  .catch(e => {
    // do something
  });
}

export default App;