import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from '../components/Navbar';
import PlaceInfosModal from '../components/PlaceInfosModal';
import EditPlaceModal from '../components/EditPlaceModal';
import "../style/DestinationPage.css";
import informations_icon from "../assets/informations_grey_light_icon.png";
import delete_icon from "../assets/trash_grey_light_icon.png";
import pencil_icon from "../assets/pencil_icon.png";

class DestinationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destination: null,
            isModalOpen: false,
            isEditModalOpen: false,
            activePlace: null
        };
        this.openModalWithPlace = this.openModalWithPlace.bind(this);
        this.openEditModalWithPlace = this.openEditModalWithPlace.bind(this);
        this.removePlace = this.removePlace.bind(this);
    }

    componentDidMount() {
        const { destinations } = this.props;
        const url = window.location.href;
        const lastSlash = url.lastIndexOf("/");
        const country = url.substring(lastSlash + 1);

        const destination = destinations.find(dest => dest.country.toLowerCase() === country.toLowerCase());
        console.log(destination);
    
        if (destination) {
            this.setState({ destination });
            console.log(destination);
        } else {
            console.error('Destination not found');
        }
    }

    openModalWithPlace(placeId) {
        const { destination } = this.state;

        const place = destination.places.find(p => p._id === placeId);
        this.setState({ activePlace: place, isModalOpen: true });
    }
    
    closeModal = () => {
        this.setState({ isModalOpen: false, activePlace: null });
    };

    openEditModalWithPlace(placeId) {
        const { destination } = this.state;

        const place = destination.places.find(p => p._id === placeId);
        this.setState({ activePlace: place, isEditModalOpen: true });
    }

    closeEditModal = () => {
        this.setState({ isEditModalOpen: false, activePlace: null });
    };

    async removePlace(placeId) {
        const { destination } = this.state;

        if (!destination) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/destination/${destination._id}/delete-place/${placeId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token.slice(1, -1)}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedDestination = await response.json();
                this.setState({ destination: updatedDestination });
            } else {
                console.error('Failed to delete place:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting place:', error);
        }
    }

    addPlacesToDestination(destinationId){
        console.log(destinationId);
    }

    render() {
        const { destination, isModalOpen, isEditModalOpen, activePlace } = this.state;

        return (
            <div className='DestinationPage'>
                <Navbar />
                {destination ? (
                    <div className='InformationsCity'>
                        <Link to={`/add-places/${destination._id}`}>
                        <button className='AddPlacesBtn'>Ajouter des lieux</button>
                        </Link>
                        <h1>{destination.country.toUpperCase()}</h1>
                        <div className='Country'>
                            <img src={`https://via.placeholder.com/64`} alt="Drapeau" className="Flag" />
                        </div>
                        <div className={`PlacesList ${isModalOpen ? 'BlurSaturation' : ''}`}>
                            {destination.places.length > 0 ? (
                                destination.places.map((place) => (
                                    <div className='Place' key={place._id}>
                                        <img src={place.photos ? place.photos[0] : "https://via.placeholder.com/150"} alt={place.name} />
                                        <div className='InformationsPlace'>
                                            <div className='NameAndInfos'>
                                                <h3>{place.name}</h3>
                                                <button onClick={() => this.openModalWithPlace(place._id)} style={{paddingRight: '10px'}}>
                                                    <img src={informations_icon} alt="Informations icon" className='InfosIcon' />
                                                </button>
                                            </div>                                            
                                            <p className='EditorialSummary'>{place.description || "Aucune description."}</p>
                                            <a href={place.website} target="_blank" rel="noreferrer">Site web</a>
                                            <button onClick={() => this.openEditModalWithPlace(place._id)}>
                                                <img src={pencil_icon} alt="Pencil icon" className='PencilIcon' />
                                            </button>
                                            <button onClick={() => this.removePlace(place._id)}>
                                                <img src={delete_icon} alt="Delete icon" className='DeleteIcon' />
                                            </button>                                            
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Aucun lieu trouvé.</p>
                            )}
                        </div>
                        {isModalOpen && activePlace && (
                            <PlaceInfosModal
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
                        {isEditModalOpen && activePlace && (
                            <EditPlaceModal
                            name={activePlace.name}
                            description={activePlace.description}
                            comments={activePlace.comments}
                            closeBtn={this.closeEditModal} />
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
