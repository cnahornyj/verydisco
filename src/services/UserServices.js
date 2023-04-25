import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '50%',
  height: '500px',
  margin: 'auto'
};

const center = {
  lat: 45.763,
  lng: 4.835
};

//TODO: Utiliser un composant de classe
//TODO: Utiliser dotenv pour la gestion du stockage des données sensibles

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  const [map, setMap] = React.useState(null);
  //const [places, setPlaces] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(center);
    console.log(bounds);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  //TODO: Créer une fonction findPlaceIds et une fonction findPlacesDetails

  /*const findPlacesDetails = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 45.763, lng: 4.835 },
      zoom: 17,
    });

    const request = {
      placeId: "ChIJUXR07v7q9EcRb36T44_nghc",
      fields: ["name", "formatted_address", "opening_hours", "website", "price_level", "rating" , "photos", "reviews", "geometry"],
    };

    const service = new window.google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        console.log("Nom : "+place.name, "Adresse : "+place.formatted_address, "Horaires d'ouverture : "+place.opening_hours.weekday_text, "Site web : "+place.website, "Niveau de prix : "+place.price_level, "Note générale du lieu : "+place.rating, place.geometry, place.location);
        console.log(place.opening_hours);
        console.log(place.reviews);
        console.log(place.photos);
      }
    });

  }*/

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent);