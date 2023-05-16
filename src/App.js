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
    //TODO: La variable doit être placée à un niveau supérieur pour être utilisée dans les deux fonctions suivantes
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

    //TODO: La variable doit être placée à un niveau supérieur pour être utilisée dans les deux fonctions suivantes
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //TODO: La variable doit être placée à un niveau supérieur pour être utilisée dans les deux fonctions suivantes
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(
      { location: mapOptions.center, radius: radius, type: type},
      (results, status, pagination) => {
        console.log(status,results);
        if (status !== "OK" || !results){
        } else {
          var arrPlaces = [];
          for(let i = 0; i < results.length; i++){
            var placeId = results[i].place_id;
            arrPlaces.push(placeId);
          }
          console.log("Tableau des ID de lieux : ");
          console.table(arrPlaces);

          var data = JSON.stringify(arrPlaces);
          localStorage.setItem('placesId', data);

          //TODO: Add markers on map and a like button on every marker if click event on push placeId in localStorage
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

    //TODO: pour chaque placeId faire les requêtes
    setTimeout(() => {
      findInformationsPlace(); 
    }, 1000);

  })
  .catch(e => {
    // do something
  });
}

  function findInformationsPlace(){
    loader
    .load()
    .then((google) => {
      //! Les variables mapOptions & map ne seront pas utilisées à ce niveau à terme, ici elles sont utilisées pour un test préalable (test OK)
      var mapOptions = {
        center: {
          lat: 45.765,
          lng: 4.832
        },
        zoom: 17
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var service = new google.maps.places.PlacesService(map);
      var ids = localStorage.getItem("placesId");
      var placesId = ids.replace('[','').replace(']','').replaceAll('"','').split(',');

      for(let i = 0; i < placesId.length; i++){
        var request = {
          placeId: placesId[i]
        };
        service.getDetails(request, function(place, status) {
          // console.log("Statut de la requête:"+status)
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            //TODO: A voir quelles informations on veut récupérer par rapport au lieu & quoi en faire
            console.log(place);
  
          }
        });
      }


    })
    .catch(e => {
      // do something
    });
  }


export default App;