import axios from "axios";
import { showErrorMessage } from "../Alerts.js";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_APIKEY;

const getSessionId = () =>
  sessionStorage.getItem("session_id")
    ? sessionStorage.getItem("session_id")
    : null;

export const getAutheticationToken = () => {
  return axios
    .get(`${BASE_URL}/authentication/token/new?api_key=${API_KEY}`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const createSessionToken = (values) => {
  return axios
    .post(
      `${BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`,
      values
    )
    .then((res) => res.data)
    .catch((error) => showErrorMessage(error.response.data.status_message));
};

export const authenticateUser = (request_token) => {
  return axios
    .post(
      `${BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
      request_token
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const getAccountDetails = () => {
  return axios
    .get(`${BASE_URL}/account?api_key=${API_KEY}&session_id=${getSessionId()}`)
    .then((res) => {
      const data = res.data;
      // console.log("Account Details:", data); // Log the data
      // console.log("Account Details:", getSessionId); // Log the data
      return data;
    })
    .catch((error) => {
      console.log("Error:", error);
      throw error;
    });
};
