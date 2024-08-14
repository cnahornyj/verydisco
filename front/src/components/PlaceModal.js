import React, { Component } from 'react';
import "../style/PlaceModal.css";
import cross_icon from "../assets/cross_grey_light_icon.png";

class PlaceModal extends Component {
    render() {
        const { name, rating, isOpen, user_ratings_total, reviews, address_components, weekday, closeBtn } = this.props;

        return (
            <div className='PlaceModal'>
                <button className='CloseModalBtn' onClick={closeBtn}><img src={cross_icon} alt="Icône pour fermer la modale" className='Cross'/></button>
                <div>
                    <div className='MainTitle'>
                        <p>{name}</p>
                        <p className='Rating'>{rating}/5 ⭐</p>
                        {isOpen ? <p className='IsOpen'>Ouvert 🟢</p> : <p className='IsOpen'>Fermé 🚫</p>}
                    </div>
                    <p className='Summary'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam iste porro saepe qui quibusdam nostrum est distinctio cupiditate! Consequatur est fugit recusandae deserunt voluptatibus. Unde dignissimos facere labore mollitia dolores.</p>
                    <p className='Titre'>Avis ({user_ratings_total})</p>
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div className='Reviews' key={index}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><img src={review.profile_photo_url} alt="Profil de l'utilisateur de l'avis" className='UserReviewImg'/></td>
                                            <td className='TextReview'>{review.text}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ))
                    ) : (
                        <p>Aucun avis disponible</p>
                    )}
                </div>
                <div>
                    <p className='Titre'>Adresse</p>
                    {address_components && address_components.length > 0 ? (
                        address_components.map((addressElement, index) => (
                            <div className='OpenHours' key={index}>
                                <p>{addressElement.long_name}</p>
                            </div>
                        ))
                    ) : (
                        <p>Aucune adresse disponible</p>
                    )}
                    <p className='Titre'>Horaires d'ouverture</p>
                    {weekday && weekday.length > 0 ? (
                        weekday.map((dayhours, index) => (
                            <div className='OpenHours' key={index}>
                                <p>{dayhours}</p>
                            </div>
                        ))
                    ) : (
                        <p>Aucun horaire disponible</p>
                    )}
                </div>
            </div>
        );
    }
}

export default PlaceModal;
