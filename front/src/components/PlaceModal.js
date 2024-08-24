import React, { Component } from 'react';
import "../style/PlaceModal.css";
import cross_icon from "../assets/cross_grey_light_icon.png";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import des styles du carrousel

class PlaceModal extends Component {
    // Fonction pour vérifier si le lieu est ouvert maintenant
    isOpenNow(openingHours) {
        if (!openingHours) return false;

        const weekdays = openingHours.split(', ');
        const now = new Date();
        const currentDay = now.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Convertit l'heure actuelle en minutes

        for (const dayhours of weekdays) {
            const [day, hours] = dayhours.split(': ');

            if (day.toLowerCase() === currentDay) {
                if (hours.toLowerCase() === 'fermé') {
                    return false;
                }

                const [open, close] = hours.split('–').map(time => {
                    const [h, m] = time.trim().split(':').map(Number);
                    return h === 0 && m === 0 ? 24 * 60 : h * 60 + m; // 00:00 devient 24 * 60
                });

                if (close === 24 * 60) {
                    return currentTime >= open && currentTime <= 23 * 60 + 59; // Jusqu'à 23:59
                }

                return currentTime >= open && currentTime <= close;
            }
        }

        return false;
    }

    render() {
        const { name, description, comments, photos, rating, openingHours, totalUserRating, reviews, address, closeBtn } = this.props;

        // Détermine si le lieu est ouvert
        const isOpen = this.isOpenNow(openingHours);

        // Séparer les horaires d'ouverture en un tableau en utilisant la virgule comme séparateur
        const weekday = openingHours ? openingHours.split(', ') : [];

        return (
            <div className='PlaceModal'>
                <button className='CloseModalBtn' onClick={closeBtn}>
                    <img src={cross_icon} alt="Icône pour fermer la modale" className='Cross'/>
                </button>
                {/* Partie Carousel de photos */}
                {photos && photos.length > 0 && (
                    <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
                        {photos.map((photo, index) => (
                            <div key={index}>
                                <img style={{borderTopRightRadius: "10px", borderTopLeftRadius: "10px", height: "400px"}} src={photo} alt={`Lieu ${name} - Photo ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                )}
                {/* Partie Titre & Rating & isOpen */}
                <div className='Content'>
                    <div className='MainTitle'>
                        <p>{name}</p>
                        <p className='Rating'>{rating}/5 ⭐</p>
                        {isOpen ? <p className='IsOpen'>Ouvert 🟢</p> : <p className='IsOpen'>Fermé 🚫</p>}
                    </div>
                    {description ? <p className='Summary'>{description}</p> : <p className='Summary'>Aucune description.</p>}
                    <div className='CommentsAndAddress'>
                        {/* Partie Commentaires & Avis */}
                        <div>                        
                            <p className='Titre'>Mes commentaires</p>
                            {comments ? <p>{comments}</p> : <p>Pas de commentaire.</p>}
                            <p className='Titre'>Avis ({totalUserRating})</p>
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
                        {/* Partie Adresse & Horaires d'ouverture */}
                        <div>
                            <p className='Titre'>Adresse</p>
                            {address ? (
                                <p>{address}</p>
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
                </div>              
            </div>
        );
    }
}

export default PlaceModal;
