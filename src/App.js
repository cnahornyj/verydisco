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
        </div>
      </main>
    );
  }
}

var loader = new Loader({
  //TODO: Place apiKey for testing and use dotenv for sensible data
  apiKey: "AIzaSyAannRQU8k0FVH3UOt6Z8mrh7bc3hmTtOw",
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
          /*console.log("Tableau des ID de lieux : ");
          console.table(arrPlaces);*/
          var data = JSON.stringify(arrPlaces);
          localStorage.setItem('placesId', data);
        }
      }
    );

    // For every placeId make the request
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
    //! Le centre correspond à la ville de Lyon (il faudra passer le centre selon la ville sélectionnée)
    var mapOptions = {
      center: {
        lat: 45.765,
        lng: 4.832
      },
      zoom: 17
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var infowindow = new google.maps.InfoWindow();
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
          //TODO: Add markers on map and a like button on every marker if click event on push placeId in localStorage
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            //TODO: Passer les infos relatives au lieu
            const content = document.createElement("div");

            const nameElement = document.createElement("h2");
            nameElement.textContent = place.name;
            content.appendChild(nameElement);

            const placeAddressElement = document.createElement("p");
            placeAddressElement.textContent = place.formatted_address;
            content.appendChild(placeAddressElement);

            if(place.website !== undefined) {
              const websiteElement = document.createElement("a");
              websiteElement.href = place.website;
              websiteElement.target = "_blank";
              websiteElement.textContent = "Site web";
              content.appendChild(websiteElement);
            }

            if(place.user_ratings_total > 0) {
              const placeRatingElement = document.createElement("p");
              placeRatingElement.textContent = place.rating + "/5 ⭐";
              content.appendChild(placeRatingElement);
              const nbOfRatings = document.createElement("p");
              nbOfRatings.textContent = place.user_ratings_total + " avis";
              content.appendChild(nbOfRatings);
            }

            const likeElement = document.createElement("button");
            likeElement.classList.add("likeBtn");
            likeElement.textContent = "❤";
            likeElement.addEventListener("click", function(){
              likeElement.classList.add("likeBtnLiked");
            })
            content.appendChild(likeElement);
             
            infowindow.setContent(content);
            infowindow.open(map, this);

          });
        }
      });
    }


  })
  .catch(e => {
    // do something
  });
}


export default App;