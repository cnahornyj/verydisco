// actions/destinationActions.js
import axios from 'axios';

export const FETCH_DESTINATIONS_REQUEST = 'FETCH_DESTINATIONS_REQUEST';
export const FETCH_DESTINATIONS_SUCCESS = 'FETCH_DESTINATIONS_SUCCESS';
export const FETCH_DESTINATIONS_FAILURE = 'FETCH_DESTINATIONS_FAILURE';

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
  return (dispatch) => {
    dispatch(fetchDestinationsRequest());
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get('http://localhost:3000/api/destination', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const destinations = response.data;
        dispatch(fetchDestinationsSuccess(destinations));
      })
      .catch((error) => {
        dispatch(fetchDestinationsFailure(error.message));
      });
  };
};
