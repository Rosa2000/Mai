import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import authService from "../services/auth.service";
export const register = (phoneNum, password, role, fullName) => (dispatch) => {
  return authService.register(phoneNum, password, fullName, role).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.msg,
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error.response.data.msg);
      let message = error.toString();
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.msg
      ) {
        message = error.response.data.msg;
      }
      dispatch({
        type: REGISTER_FAIL,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
export const login = (phone, password) => (dispatch) => {
  return authService.login(phone, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      return Promise.resolve();
    },
    (error) => {
      let message = error.toString();
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.msg
      ) {
        message = error.response.data.msg;
      }
      dispatch({
        type: LOGIN_FAIL,
      });
      console.log("LOGIN FAIL");
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
export const logout = () => (dispatch) => {
  authService.logout();
  dispatch({
    type: LOGOUT,
  });
};
