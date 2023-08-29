import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from '../components/Navbar';
import PlaceModal from '../components/PlaceModal';
import "../style/DestinationPage.css";
import informations_icon from "../assets/informations_grey_light_icon.png";
//import Carousel from '../components/Carousel';

class DestinationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            destination: null,
            isModalOpen: false,
            activePlace: null
        }
        this.openModalWithPlace = this.openModalWithPlace.bind(this);
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
                    <div className='Place' key={place.place_id}>

                        {/* Pour récupérer toutes les photos du lieu */}
                        {/* {place.photos.map((photo) =>
                            <img src={`${photo.imgUrl}`} alt="" srcset="" />
                        )} */}

                        {place.photos.length > 0 ? <img src={`${place.photos[0].imgUrl}`} alt="" /> : null}
                
                        <div className='InformationsPlace'>
                            <h3>{place.name}</h3>
                            {/* <p>{place.vicinity}</p>
                            <p>{place.rating}/5 ✨</p>
                            <p>Nombre d'avis : {place.user_ratings_total}</p> */}
                            <p className='EditorialSummary'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam eius autem nihil maxime, deleniti sapiente nulla ipsa.</p>
                            <a href={`${place.website}`} target="_blank" rel="noreferrer">Site web</a>
                            <button onClick={() => {this.openModalWithPlace(place.place_id)}}><img src={informations_icon} alt="Informations icon" className='InfosIcon'/></button>
                        </div>
                    </div>
                ))}
                </div>
                {/* <PlaceModal name="Nom du lieu" rating="4" isOpen="true" user_ratings_total="1256" formatted_address="3 rue Jules Ferry 69800 SAINT PRIEST" hours="Lundi 12:00 - 18:00"/> */}
                {this.state.isModalOpen ? <PlaceModal name={this.state.activePlace.name} rating={this.state.activePlace.rating} isOpen={this.state.activePlace.opening_hours.open_now} user_ratings_total={this.state.activePlace.user_ratings_total} reviews={[this.state.activePlace.reviews]} address_components= {[this.state.activePlace.address_components]} weekday={[this.state.activePlace.opening_hours.weekday_text]}/> : null}
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

    openModalWithPlace(placeId) {
        this.setState({ isModalOpen: true });
        let place = this.state.destination.places.find(function(element){
            return element.place_id === placeId;
        });
        console.log("Lieu clic sur infos "+place.address_components[0].long_name);
        this.setState({ activePlace: place});
        setTimeout(() => {
            console.log(this.state.activePlace);
            console.log(this.state.activePlace.name);
            console.log(this.state.activePlace.rating);
            console.log(this.state.activePlace.opening_hours.open_now);
            console.log(this.state.activePlace.user_ratings_total);
            console.log(this.state.activePlace.reviews[0].text);
            console.log(this.state.activePlace.address_components);
            console.log(this.state.activePlace.opening_hours.weekday_text);

        }, 1000);
        //TODO: push place into activePlace and pass informations to PlaceModal props
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
        this.setState({ activePlace : null});
    };
}

const mapStateToProps = (state) => {
    return {
      destinations: state.destinations,
    };
  };
  
export default connect(mapStateToProps, null)(DestinationPage);