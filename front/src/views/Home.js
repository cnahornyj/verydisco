import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import DestinationsList from "../components/DestinationsList";
import EmptyList from "../components/EmptyList";
import { connect } from 'react-redux';

class Home extends Component {
  
    render() {
        return (
            <div>
                <Navbar/>
                {this.props.destinations.destinations.length > 0 ? (<DestinationsList/>) : (<EmptyList/>)}
                {/** ATTENTION LES DESTINATIONS NE SONT PLUS RECUPEREES EN BDD A LA CONNEXION DE L UTILISATEUR */}
            </div>
        );
    }

    componentDidMount(){
        //console.log(this.props.destinations.destinations.length);
        console.log(this.props.destinations.destinations);
    }
}

const mapStateToProps = (state) => {
    return {
      destinations: state.destinations 
    }
  }

export default connect(mapStateToProps, null)(Home);
