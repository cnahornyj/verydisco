import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from '../components/Navbar';
import PlaceModal from '../components/PlaceModal';
import "../style/DestinationPage.css";
import informations_icon from "../assets/informations_grey_light_icon.png";

class DestinationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destination: null,
            isModalOpen: false,
            activePlace: null
        };
        this.openModalWithPlace = this.openModalWithPlace.bind(this);
    }

    componentDidMount() {
        const { destinations } = this.props;
        console.log('Destinations from Redux:', destinations); // Debug log
    
        const url = window.location.href;
        const lastSlash = url.lastIndexOf("/");
        const country = url.substring(lastSlash + 1);
    
        const destination = destinations.find(dest => dest.country.toLowerCase() === country.toLowerCase()); // Ensure case-insensitive comparison
    
        if (destination) {
            this.setState({ destination });
        } else {
            console.error('Destination not found');
        }
    }

    openModalWithPlace(placeId) {
        const { destination } = this.state;

        if (!destination || !destination.places) {
            console.error("Destination or places not defined");
            return;
        }

        const place = destination.places.find(p => p._id === placeId);
        console.log('Selected Place:', place);
        this.setState({ activePlace: place, isModalOpen: true });

        if (place) {
            this.setState({ activePlace: place, isModalOpen: true });
        } else {
            console.error("Place not found");
        }
    }

    closeModal = () => {
        this.setState({ isModalOpen: false, activePlace: null });
    };

    render() {
        const { destination, isModalOpen, activePlace } = this.state;

        return (
            <div className='DestinationPage'>
                <Navbar/>
                {destination ? (
                    <div className='InformationsCity'>
                        <h1>{destination.country.toUpperCase()}</h1>
                        <div className='Country'>
                            {destination.places.length > 0 && destination.places[0].address_components ? (
                                <img
                                    src={`https://via.placeholder.com/64`}
                                    alt="Drapeau"
                                    className="Flag"
                                />
                            ) : (
                                <img
                                    src="https://via.placeholder.com/64"
                                    alt="Drapeau"
                                    className="Flag"
                                />
                            )}
                        </div>
                        <div className={`PlacesList ${isModalOpen ? 'BlurSaturation' : ''}`}>
                            {destination.places.length > 0 ? (
                                destination.places.map((place) => (
                                    <div className='Place' key={place._id}>
                                        {place.photos ? (
                                            <img src={place.photos[0]} alt={place.name} />
                                        ) : (
                                            <img src="https://via.placeholder.com/150" alt="Placeholder" />
                                        )}
                                        <div className='InformationsPlace'>
                                            <h3>{place.name}</h3>
                                            {place.description ? (
                                              <p className='EditorialSummary'>{place.description}</p>
                                            ) : (
                                              <p className='EditorialSummary'>Aucune description.</p>
                                            )}
                                            <a href={place.website} target="_blank" rel="noreferrer">Site web</a>
                                            <button onClick={() => this.openModalWithPlace(place._id)}>
                                                <img src={informations_icon} alt="Informations icon" className='InfosIcon'/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Aucun lieu trouvé.</p>
                            )}
                        </div>
                        {isModalOpen && activePlace && (
                            <PlaceModal
                                name={activePlace.name}
                                description={activePlace.description}
                                comments={activePlace.comments}
                                photos={activePlace.photos}
                                rating={activePlace.rating}
                                openingHours={activePlace.openingHours}
                                totalUserRating={activePlace.user_ratings_total}
                                reviews={activePlace.reviews}
                                address={activePlace.formatted_address}
                                weekday={activePlace.opening_hours?.weekday_text}
                                closeBtn={this.closeModal}
                            />
                        )}
                    </div>
                ) : (
                    <div>Destination non trouvée</div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        destinations: state.destinations.destinations, 
    };
};

export default connect(mapStateToProps, null)(DestinationPage);
