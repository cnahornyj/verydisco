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
                {this.props.destinations.length > 0 ? (<DestinationsList/>) : (<EmptyList/>)}
            </div>
        );
    }

    componentDidMount(){
        console.log(this.props.destinations);
    }
}

const mapStateToProps = (state) => {
    return {
      destinations: state.destinations 
    }
  }

export default connect(mapStateToProps, null)(Home);
