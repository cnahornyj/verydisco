import React, { Component } from 'react';
import "../style/PlaceModal.css";

class PlaceModal extends Component {
    render() {
        return (
            <div className='PlaceModal'>
                {/* TODO: ajouter le Carousel */}
                <div>
                    <div className='MainTitle'>
                        <p className='Titre'>{this.props.name}</p>
                        <p className='Rating'>{this.props.rating}/5 ⭐</p>
                        {this.props.isOpen ? <p className='IsOpen'>Ouvert 🟢</p> : <p className='IsOpen'>Fermé 🚫</p>}
                    </div>
                    {/* <p>{this.props.editorial_summary}</p> */}
                    <p className='Summary'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam iste porro saepe qui quibusdam nostrum est distinctio cupiditate! Consequatur est fugit recusandae deserunt voluptatibus. Unde dignissimos facere labore mollitia dolores.</p>
                    <p className='Advice'>Avis ({this.props.user_ratings_total})</p>
                    {/* TODO: map sur les reviews : rating + text */}
                </div>
                <div>
                    <p className='Titre'>Adresse</p>
                    <p>{this.props.formatted_address}</p>
                    <p className='Titre'>Horaires d'ouverture</p>
                    <p>{this.props.hours}</p>
                    {/* TODO: map sur weekday_text */}
                </div>

            </div>
        );
    }
}

export default PlaceModal;