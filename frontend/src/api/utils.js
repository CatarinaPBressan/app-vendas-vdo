import axios from "axios";

export const getHeaders = (token) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const v0Api = (token = null) => {
  let headers = {};
  if (token) {
    headers = getHeaders(token);
  }
  return axios.create({
    baseURL: "/api/v0/",
    headers,
  });
};
