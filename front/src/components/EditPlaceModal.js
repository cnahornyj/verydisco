import React, { Component } from "react";
import cross_icon from "../assets/cross_grey_light_icon.png";
import "../style/EditPlaceModal.css";

class EditPlaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "",
      description: this.props.description || "",
      comments: this.props.comments || ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    // Envoyer les données mises à jour au backend ou gérer localement
    const updatedPlace = { ...this.state };
    this.props.onSave(updatedPlace);
  };

  render() {
    const { name, description, comments, closeBtn } = this.props;

    return (
      <div className="EditPlaceModal">        
        <button className="CloseModalBtn" onClick={closeBtn}>
          <img
            src={cross_icon}
            alt="Icône pour fermer la modale"
            className="Cross"
          />
        </button>
        <div className="Cont">
        <h2>Modifier le lieu : <br /> {name}</h2>
          <form action="">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              placeholder={name}
              onChange={this.handleChange}
            />
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            <label>Commentaires</label>
            <textarea
              name="comments"
              value={comments}
              onChange={this.handleChange}
            />
            {/* Ajoutez d'autres champs de formulaire si nécessaire */}
          </form>
          <button onClick={this.handleSubmit} className='SaveBtn'>Enregistrer</button>
        </div>
      </div>
    );
  }
}

export default EditPlaceModal;
