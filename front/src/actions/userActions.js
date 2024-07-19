import axios from 'axios';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

export const fetchUser = (userId) => {
  return (dispatch, getState) => {
    dispatch(fetchUserRequest());

    const token = getState().auth.token;

    axios.get(`http://localhost:3000/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      const user = response.data;
      dispatch(fetchUserSuccess(user));
    })
    .catch(error => {
      dispatch(fetchUserFailure(error.message));
    });
  };
};
