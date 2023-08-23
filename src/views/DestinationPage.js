import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from '../components/Navbar';
//import Carousel from '../components/Carousel';

class DestinationPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            destination: null,
        }
    }
    render() {
        return (    
        <div className='DestinationPage'>
        <Navbar/>    
        {this.state.destination != null ? (
            <div className='InformationsCity'>
            <h2>{this.state.destination.city.toUpperCase()}</h2>
            <p>{this.state.destination.places[0].address_components[5].long_name}</p>
            <img src={`https://flagsapi.com/${this.state.destination.places[0].address_components[5].short_name}/flat/64.png`} alt="Drapeau" className="Flag"/>
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
        console.log(destinations);
        const url = window.location.href;
        const lastSlash = url.lastIndexOf("/");
        const city = url.substring(lastSlash + 1);
        const index = this.findIndexByKeyValue(destinations, "city", city);
        const destination = destinations[index];
        this.setState({
          destination: destination,
        });
        setTimeout(() => {
            console.log(this.state.destination);
        }, 200);
    }
}

const mapStateToProps = (state) => {
    return {
      destinations: state.destinations,
    };
  };
  
export default connect(mapStateToProps, null)(DestinationPage);