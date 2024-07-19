import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
