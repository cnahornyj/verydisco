import React, { Component } from 'react';

class DestinationsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            destinationsList: []
        }
    }

    componentDidMount(){
        //TODO: faire un getItem sur le localStorage, convertir la donnée et MAJ l'état destinationsList avec ce qui est retourné
        var places = localStorage.getItem('places');
    }

    render() {
        return (
            <div className='DestinationsList'>
                <h1>Liste des destinations</h1>
            </div>
        );
    }
}

export default DestinationsList;