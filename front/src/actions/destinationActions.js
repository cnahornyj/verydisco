// actions/destinationActions.js
import axios from 'axios';

export const ADD_DESTINATION_REQUEST = 'ADD_DESTINATION_REQUEST';
export const ADD_DESTINATION_SUCCESS = 'ADD_DESTINATION_SUCCESS';
export const ADD_DESTINATION_FAILURE = 'ADD_DESTINATION_FAILURE';

export const FETCH_DESTINATIONS_REQUEST = 'FETCH_DESTINATIONS_REQUEST';
export const FETCH_DESTINATIONS_SUCCESS = 'FETCH_DESTINATIONS_SUCCESS';
export const FETCH_DESTINATIONS_FAILURE = 'FETCH_DESTINATIONS_FAILURE';

// Actions pour ajouter une destination
export const addDestinationRequest = () => ({
  type: ADD_DESTINATION_REQUEST,
});

export const addDestinationSuccess = (destination) => ({
  type: ADD_DESTINATION_SUCCESS,
  payload: destination,
});

export const addDestinationFailure = (error) => ({
  type: ADD_DESTINATION_FAILURE,
  payload: error,
});

export const addDestination = (destination) => {
  return (dispatch, getState) => {
    dispatch(addDestinationRequest());

    const token = getState().auth.token;

    axios.post('http://localhost:3000/api/destination', destination, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      dispatch(addDestinationSuccess(response.data));
    })
    .catch(error => {
      dispatch(addDestinationFailure(error.message));
    });
  };
};

// Actions pour récupérer les destinations
export const fetchDestinationsRequest = () => ({
  type: FETCH_DESTINATIONS_REQUEST,
});

export const fetchDestinationsSuccess = (destinations) => ({
  type: FETCH_DESTINATIONS_SUCCESS,
  payload: destinations,
});

export const fetchDestinationsFailure = (error) => ({
  type: FETCH_DESTINATIONS_FAILURE,
  payload: error,
});

export const fetchDestinations = () => {
  return (dispatch, getState) => {
    dispatch(fetchDestinationsRequest());

    let token = getState().auth.token;
    if (!token) {
      token = localStorage.getItem('token');
    }

    if (!token) {
      console.error("Token non trouvé");
      return dispatch(fetchDestinationsFailure("Token non trouvé"));
    }

    // console.log("Token utilisé dans la requête:", token);

    axios.get('http://localhost:3000/api/destination', {
      headers: {
        'Authorization': `Bearer ${token.slice(1, -1)}`,
      }
    })
    .then(response => {
      dispatch(fetchDestinationsSuccess(response.data));
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des destinations:", error.response);
      dispatch(fetchDestinationsFailure(error.message));
    });
  };
};
