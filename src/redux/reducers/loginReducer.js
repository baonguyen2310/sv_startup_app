import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../actionTypes/loginActionTypes'

const initialState = {
  isLoggedIn: false,
  user: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};

export default loginReducer;
