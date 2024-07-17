import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import '../style/DestinationsList.css';

class DestinationsList extends Component {
  render() {
    const { destinations } = this.props;

    return (
      <div className="DestinationsList">
        <div className="HeaderDestinationList">
          <h1>Vos destinations</h1>
          <Link to="/differentform" className="redirection">
            + Créer une destination
          </Link>
        </div>
        <div className="List">
          {destinations && destinations.length > 0 ? (
            destinations.map((destination) => (
              <div className="Destination" key={destination.city}>
                {/* Affichage de la première image récupérée */}
                {/* ⚠️ La valeur en BDD est address il faudra récupérer le pays dans celle-ci en conséquence */}
                {destination.places.length > 0 && destination.places[0].address_components ? (
                  <img
                    src={`https://flagsapi.com/${destination.places[0].address_components[destination.places[0].address_components.length - 2].short_name}/flat/64.png`}
                    alt="Drapeau"
                    className="Flag"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/64"
                    alt="Placeholder"
                    className="Flag"
                  />
                )}
                <p>{destination.city.toUpperCase()}</p>
                <Link to={`/destination/${destination.city}`}>i</Link>
              </div>
            ))
          ) : (
            <p>Aucune destination trouvée.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    destinations: state.destinations.destinations || [], // Assurez-vous que 'destinations' est défini
  };
};

export default connect(mapStateToProps, null)(DestinationsList);
