import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "../Alerts.js";

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
    .catch((error) => {
      showErrorMessage("Authentication token couldn't be retrieved.");
      throw error;
    });
};

export const createSessionToken = (values) => {
  return axios
    .post(
      `${BASE_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`,
      values
    )
    .then((res) => res.data)
    .catch((error) => {
      showErrorMessage(error.response.data.status_message);
      throw error;
    });
};

export const authenticateUser = (request_token) => {
  return axios
    .post(
      `${BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
      request_token
    )
    .then((res) => {
      showSuccessMessage("User authenticated successfully.");
      return res.data;
    })
    .catch((error) => {
      showErrorMessage("User authentication failed.");
      throw error;
    });
};

export const getAccountDetails = () => {
  return axios
    .get(`${BASE_URL}/account?api_key=${API_KEY}&session_id=${getSessionId()}`)
    .then((res) => {
      const data = res.data;
      return data;
    })
    .catch((error) => {
      showErrorMessage("Failed to fetch account details.");
      throw error;
    });
};
