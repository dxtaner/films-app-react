import axios from "axios";
// import { showErrorMessage } from "../Alerts.js";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_APIKEY;

export const getPopularPersons = () => {
  return axios
    .get(`${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getPersonInfo = (id) => {
  const requestURL = `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`;

  // console.log("Person ID:", id); // Kişi kimliğini konsola yazdır
  // console.log("Request URL:", requestURL); // İstek URL'sini konsola yazdır

  return axios
    .get(requestURL)
    .then((response) => {
      console.log("Response Data:", response.data); // API yanıtını konsola yazdır
      return response.data;
    })
    .catch((error) => {
      console.error(`Kişi bilgileri alınamadı (ID: ${id}): `, error);
      throw error;
    });
};

export const getPersonMovieCredits = (personId) => {
  return axios
    .get(
      `${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}&language=en-US`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Kişi film kredileri alınamadı: ", error);
      throw error;
    });
};

export const getPersonExternalIds = (personId) => {
  return axios
    .get(
      `${BASE_URL}/person/${personId}/external_ids?api_key=${API_KEY}&language=en-US`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Kişi dış kimlikleri alınamadı: ", error);
      throw error;
    });
};
