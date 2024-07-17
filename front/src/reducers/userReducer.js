// reducers/userReducer.js
import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
  } from '../actions/userActions';
  
  const initialState = {
    loading: false,
    user: null,
    error: '',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_REQUEST:
        console.log('Fetching user...');
        return {
          ...state,
          loading: true,
        };
      case FETCH_USER_SUCCESS:
        console.log('User fetched successfully:', action.payload);
        return {
          ...state,
          loading: false,
          user: action.payload,
          error: '',
        };
      case FETCH_USER_FAILURE:
        console.log('Failed to fetch user:', action.payload);
        return {
          ...state,
          loading: false,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  