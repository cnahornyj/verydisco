import React, { Component } from 'react';
import "../style/PlaceModal.css";
import cross_icon from "../assets/cross_grey_light_icon.png";

class PlaceModal extends Component {
    render() {
        return (
            <div className='PlaceModal'>
                {/* TODO: ajouter le Carousel */}
                <button className='CloseModalBtn' onClick={this.props.closeBtn}><img src={cross_icon} alt="Icône pour fermer la modale" className='Cross'/></button>
                <div>
                    <div className='MainTitle'>
                        <p>{this.props.name}</p>
                        <p className='Rating'>{this.props.rating}/5 ⭐</p>
                        {this.props.isOpen ? <p className='IsOpen'>Ouvert 🟢</p> : <p className='IsOpen'>Fermé 🚫</p>}
                    </div>
                    {/* <p>{this.props.editorial_summary}</p> */}
                    <p className='Summary'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam iste porro saepe qui quibusdam nostrum est distinctio cupiditate! Consequatur est fugit recusandae deserunt voluptatibus. Unde dignissimos facere labore mollitia dolores.</p>
                    <p className='Titre'>Avis ({this.props.user_ratings_total})</p>
                    {/* TODO: Rajouter une vérification sur la longueur du tableau et boucler sur tous les avis pour ne pas avoir à passer les indexs en dur */}
                    {this.props.reviews.map(review => {
                        return (
                        <div className='Reviews'>
                            <table>
                                <tr>
                                    <td><img src={review[0].profile_photo_url} alt="Profil de l'utilisateur de l'avis" className='UserReviewImg'/></td>
                                    <td className='TextReview'>{review[0].text}</td>
                                </tr>
                            </table>
                        </div>
                        );
                    })}
                </div>
                <div>
                    <p className='Titre'>Adresse</p>
                    {/* TODO: rajouter une vérification de la longueur du tableau length varie selon le lieu */}
                    {this.props.address_components.map(addressElement => {
                        return (
                        <div className='OpenHours'>
                            <p>{addressElement[0].long_name} {addressElement[1].long_name}</p>
                            <p>{addressElement[2].long_name} {addressElement[4].long_name}</p>
                        </div>
                        );
                    })}
                    <p className='Titre'>Horaires d'ouverture</p>
                    {/* TODO: Rajouter une vérification sur la longueur du tableau et boucler sur tous les items pour ne pas avoir à passer les indexs en dur */}
                    {this.props.weekday.map(dayhours => {
                        return (
                        <div className='OpenHours'>
                            <p>{dayhours[0]}</p>
                            <p>{dayhours[1]}</p>
                            <p>{dayhours[2]}</p>
                            <p>{dayhours[3]}</p>
                            <p>{dayhours[4]}</p>
                            <p>{dayhours[5]}</p>
                            <p>{dayhours[6]}</p>
                        </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default PlaceModal;