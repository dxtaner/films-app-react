import axios from "axios";
import { showSuccessMessage } from "../Alerts.js";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_APIKEY;

const getSessionId = () =>
  sessionStorage.getItem("session_id")
    ? sessionStorage.getItem("session_id")
    : null;

export const getPopularMovies = () => {
  return axios
    .get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getTopRatedMovies = () => {
  return axios
    .get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getUpcomingMovies = () => {
  return axios
    .get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getMoviesDetails = (id) => {
  console.log(id);
  const requestURL = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;

  console.log("Request URL:", requestURL); // URL'yi konsola yazdır

  return axios
    .get(requestURL)
    .then((res) => {
      // console.log("Response Data:", res.data); // Veriyi konsola yazdır
      return res.data; // Veriyi geri döndür
    })
    .catch((err) => {
      console.error("Error:", err);
      throw err;
    });
};

export const getMoviesTrailer = (id) => {
  return axios
    .get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const addMovieToFavorite = (account_id, values) => {
  return axios
    .post(
      `${BASE_URL}/account/${account_id}/favorite?api_key=${API_KEY}&session_id=${getSessionId()}`,
      values
    )
    .then((res) => {
      res.data.success && showSuccessMessage(res.data.status_message);
    })
    .catch((error) => console.log(error));
};

export const getFavoritesMovies = (account_id) => {
  return axios
    .get(
      `${BASE_URL}/account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${getSessionId()}&language=en-US&sort_by=created_at.asc&page=1`
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const getMoviesCredit = (id) => {
  return axios
    .get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then((res) => {
      // console.log("Response Data:", res.data); // Response verisini logla
      return res.data;
    })
    .catch((error) => {
      console.error("Error:", error); // Hata durumunda hata mesajını logla
    });
};
