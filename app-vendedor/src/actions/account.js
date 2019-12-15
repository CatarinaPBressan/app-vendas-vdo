import { createAction } from "@reduxjs/toolkit";

import UserAPI from "../api/userAPI";

export const setUser = createAction("account/user/set");

export const fetchUser = (username, password) => {
  return dispatch => {
    return UserAPI.fetchUser(username, password).then(user => {
      dispatch(setUser(user));
    });
  };
};
