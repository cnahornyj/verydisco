import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from '../components/Navbar';
import PlaceModal from '../components/PlaceModal';
import "../style/DestinationPage.css";
//import Carousel from '../components/Carousel';

class DestinationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            destination: null,
        }
    }
    render() {
        return (    
        <div className='DestinationPage'>
        <Navbar/>    
        {this.state.destination != null ? (
            <div className='InformationsCity'>
                <h1>{this.state.destination.city.toUpperCase()}</h1>
                <div className='Country'>
                    <img src={`https://flagsapi.com/${this.state.destination.places[0].address_components[this.state.destination.places[0].address_components.length-2].short_name}/flat/64.png`} alt="Drapeau" className="Flag"/>
                </div>
                <div className='PlacesList'>
                {this.state.destination.places.map((place) => (
                    <div className='Place'>

                        {/* Pour récupérer toutes les photos du lieu */}
                        {/* {place.photos.map((photo) =>
                            <img src={`${photo.imgUrl}`} alt="" srcset="" />
                        )} */}

                        {place.photos.length > 0 ? <img src={`${place.photos[0].imgUrl}`} alt="" srcset="" /> : null}
                
                        <div className='InformationsPlace'>
                            <h3>{place.name}</h3>
                            <p>{place.vicinity}</p>
                            <p>{place.rating}/5 ✨</p>
                            <p>Nombre d'avis : {place.user_ratings_total}</p>
                            <a href={`${place.website}`} target="_blank" rel="noreferrer">Site web</a>
                        </div>
                    </div>
                ))}
                </div>
                <PlaceModal name="Nom du lieu" rating="4" isOpen="true" user_ratings_total="1256" formatted_address="3 rue Jules Ferry 69800 SAINT PRIEST" hours="LUNDI 12:00 - 18:00"/>
            </div>
        ) : null}
        </div>
        );
    }

    //* Récupérer l'index dans le tableau d'objet correspondant à la ville
    findIndexByKeyValue(destination, key, valuetosearch) {
        for (let i = 0; i < destination.length; i++) {
            if (destination[i][key] === valuetosearch) {
                return i;
            }
        }
        return null;
    }

    //* Récupérer l'url de la page et la ville pour trouver l'index correspondant
    componentDidMount() {
        const destinations = this.props.destinations;
        // console.log(destinations);
        const url = window.location.href;
        const lastSlash = url.lastIndexOf("/");
        const city = url.substring(lastSlash + 1);
        const index = this.findIndexByKeyValue(destinations, "city", city);
        const destination = destinations[index];
        this.setState({
          destination: destination,
        });
        setTimeout(() => {
            // console.log(this.state.destination.places);
            for (let i = 0; i < this.state.destination.places.length; i++) {
                // console.log(this.state.destination.places[i].photos.length);
            }
        }, 200);
        //TODO: faire appel à la fonction getPhotos de Places Photos
    }
}

const mapStateToProps = (state) => {
    return {
      destinations: state.destinations,
    };
  };
  
export default connect(mapStateToProps, null)(DestinationPage);