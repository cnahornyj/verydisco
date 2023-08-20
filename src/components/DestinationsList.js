import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import '../style/DestinationsList.css';

class DestinationsList extends Component {
  render() {
    return (
      <div className="DestinationsList">
        <div className="HeaderDestinationList">
          <h1>Vos destinations</h1>
          <Link to={"/form"} className="redirection">
            + Créer une destination
          </Link>
        </div>
        <div className="List">
        {this.props.destinations.map((destination) => (
          <div className="Destination">
            <p key={destination.city}>
              {destination.city.toUpperCase()},{" "}
              {destination.places[0].address_components[5].long_name}
            </p>
            <button>i</button>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    destinations: state.destinations,
  };
};

export default connect(mapStateToProps, null)(DestinationsList);
