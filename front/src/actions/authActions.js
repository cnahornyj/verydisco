import axios from 'axios';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Action Creators
export const loginSuccess = (token, userId) => ({
  type: LOGIN_SUCCESS,
  payload: { token, userId }
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

// Thunk for Login
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    const { token, userId } = response.data;
    dispatch(loginSuccess(token, userId));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
