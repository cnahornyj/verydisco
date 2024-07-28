import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import DestinationsList from "../components/DestinationsList";
import EmptyList from "../components/EmptyList";
import { fetchDestinations } from '../actions/destinationActions';

class Home extends Component {
  
    componentDidMount() {
        this.props.fetchDestinations();  // Déclencher l'action pour récupérer les destinations
    }

    render() {
        return (
            <div>
                <Navbar/>
                {this.props.destinations.length > 0 ? (<DestinationsList/>) : (<EmptyList/>)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      destinations: state.destinations.destinations || []  // Accéder correctement aux destinations
    }
}

const mapDispatchToProps = {
    fetchDestinations  // Inclure l'action dans les props
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
