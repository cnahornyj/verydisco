// import { createStore } from "redux";
// const reduxDevtools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// // state initial
// const initialState = {
//   destinations: []
// };

// // actions creator
// // export const addCity = (payload) => ({ type: "ADD_CITY" });
// // export const prependPlace = (payload) => ({ type: "PREPEND_PLACE" });
// // export const deletePlace = (payload) => ({ type: "DELETE_PLACE" });
// // export const addDestinationAndDetails = (payload) => ({type: "ADD_DESTINATIONS" });
// export const addDestination = (payload) => ({type: "ADD_DESTINATION" });

// // reducer
// function placeReducer(state = initialState, action) {
//     switch (action.type) {
//       // case "ADD_CITY":
//       //       return {
//       //         ...state,
//       //         city: action.payload
//       //       };
//       // case "PREPEND_PLACE":
//       //   return {
//       //     ...state,
//       //     places: [...state.places, action.payload]
//       //   };
//       // case "DELETE_PLACE":
//       //   return {
//       //     ...state,
//       //     places: state.places.filter(place => place.id !== action.payload)
//       //   };
//       // case "ADD_DESTINATIONS":
//       //   return {
//       //     ...state,
//       //     //* Ici cela marche mais cela ne fonctionne pas lorsqu'on essaye avec payload il y a une nuance avec payload il ne semble pas récupérer la data
//       //     destinations: [...state.destinations, {
//       //       city: state.city,
//       //       places: state.places
//       //     }],
//       //     city: null,
//       //     places: []
//       //   };
//       case "ADD_DESTINATION":
//         return {
//           ...state,
//           destinations: [...state.destinations, action.payload]
//         }
//       default:
//         return state;
//     }
// }

// export const store = createStore(placeReducer, reduxDevtools);

// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk'; // Change default import to named import
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import destinationReducer from './reducers/destinationReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  destinations: destinationReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Adjust thunk usage
);

export { store };



