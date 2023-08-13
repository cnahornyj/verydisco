import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import DestinationsList from "../components/DestinationsList";
import EmptyList from "../components/EmptyList";
// TODO: récupérer les informations dans le localStorage et afficher le composant DestinationsList OU le composant EmptyList

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDestinationsList: false
        }
    }
    
    componentDidMount(){
        //TODO: on vérifie si le localStorage a un item places et si oui on affiche la liste des destinations
        if(localStorage.getItem("placesId") !== null){
            this.setState({isDestinationsList:true});
        }
    }
        
    render() {
        return (
            <div>
                <Navbar/>
                {this.state.isDestinationsList ? (<DestinationsList/>) : (<EmptyList/>)}
            </div>
        );
    }
}

export default Home;