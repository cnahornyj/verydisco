import { createStore } from "redux";
const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// state initial
const initialState = {
  city: null,
  places: [],
};

// actions creator
export const addCity = (payload) => ({ type: "ADD_CITY" });
export const prependPlace = (payload) => ({ type: "PREPEND_PLACE" });
export const deletePlace = (payload) => ({ type: "DELETE_PLACE"});

// reducer
function placeReducer(state = initialState, action) {
    switch (action.type) {
      case "ADD_CITY":
            return {
              ...state,
              city: action.payload
            };
      case "PREPEND_PLACE":
        return {
          ...state,
          places: [...state.places, action.payload]
        };
      case "DELETE_PLACE":
        return {
          ...state,
          places: state.places.filter(place => place.id !== action.payload)
        };
      default:
        return state;
    }
}

export const store = createStore(placeReducer, reduxDevtools);
