// reducers/destinationReducer.js
const initialState = {
  destinations: [],
  loading: false,
  error: '',
};

const destinationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_DESTINATION_REQUEST':
    case 'FETCH_DESTINATIONS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'ADD_DESTINATION_SUCCESS':
      return {
        ...state,
        loading: false,
        destinations: [...state.destinations, action.payload],
        error: '',
      };
    case 'FETCH_DESTINATIONS_SUCCESS':
      return {
        ...state,
        loading: false,
        destinations: action.payload,
        error: '',
      };
    case 'ADD_DESTINATION_FAILURE':
    case 'FETCH_DESTINATIONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default destinationReducer;
