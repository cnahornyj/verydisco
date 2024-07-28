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



