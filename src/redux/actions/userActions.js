import { 
  SET_USER
} from "../actionTypes/userActionTypes";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});