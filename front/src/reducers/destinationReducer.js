// reducers/destinationReducer.js
import {
  FETCH_DESTINATIONS_REQUEST,
  FETCH_DESTINATIONS_SUCCESS,
  FETCH_DESTINATIONS_FAILURE,
} from '../actions/destinationActions';

// Example of initial state in destinationReducer.js
const initialState = {
  loading: false,
  destinations: [],
  error: ''
};

// Reducer function
const destinationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DESTINATIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_DESTINATIONS_SUCCESS:
      return {
        loading: false,
        destinations: action.payload,
        error: ''
      };
    case FETCH_DESTINATIONS_FAILURE:
      return {
        loading: false,
        destinations: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default destinationReducer;

