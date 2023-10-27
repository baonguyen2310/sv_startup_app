import { 
    LOGIN_SUCCESS, 
    LOGOUT_SUCCESS 
} from "../actionTypes/loginActionTypes";

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
