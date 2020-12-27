import axios from "axios";

export const makeAuthHeader = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const v0Api = (token = null) => {
  let headers = {};
  if (token) {
    headers = makeAuthHeader(token);
  }

  return axios.create({
    baseURL: "/api/v0/",
    headers,
  });
};
