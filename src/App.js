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
export function findPlaces(type){
  loader
  .load()
  .then((google) => {
    var mapOptions = {
      //TODO: A voir pourquoi l'objet n'est pas récupéré via la fonction utilisée dans le composant Form
      center: {
        lat: 45.763,
        lng: 4.835
      },
      zoom: 17
    };

    /* console.log(center);
    console.log(type); */

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      { location: mapOptions.center, radius: 2000, type: type},
      (results, status, pagination) => {
        console.log(status,results);
        console.log(results);
          if (status !== "OK" || !results){
            return;
          } else {
            console.log("Something s wrong");
          }
      }
    );

    //TODO: Add markers on map

  })
  .catch(e => {
    // do something
  });
}

export default App;