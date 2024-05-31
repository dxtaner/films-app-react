import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_APIKEY;

export const getPopularPersons = () => {
  return axios
    .get(`${BASE_URL}/person/popular?api_key=${API_KEY}&language=tr-US&page=1`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getPersonInfo = (id) => {
  const requestURL = `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=tr-US`;

  return axios
    .get(requestURL)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`Kişi bilgileri alınamadı (ID: ${id}): `, error);
      throw error;
    });
};

export const getPersonMovieCredits = (personId) => {
  return axios
    .get(
      `${BASE_URL}/person/${personId}/movie_credits?api_key=${API_KEY}&language=tr-US`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Kişi film kredileri alınamadı: ", error);
      throw error;
    });
};

export const fetchTVCredits = (personId) => {
  return axios
    .get(
      `${BASE_URL}/person/${personId}/tv_credits?api_key=${API_KEY}&language=tr-US`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Kişi film kredileri alınamadı: ", error);
      throw error;
    });
};

export const getPersonExternalIds = (personId) => {
  return axios
    .get(
      `${BASE_URL}/person/${personId}/external_ids?api_key=${API_KEY}&language=tr-US`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Kişi dış kimlikleri alınamadı: ", error);
      throw error;
    });
};

export const searchPersons = (query) => {
  return axios
    .get(
      `${BASE_URL}/search/person?api_key=${API_KEY}&language=tr-US&query=${query}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("Kişi araması yapılamadı: ", error);
      throw error;
    });
};

export const fetchPersonImages = async (personId) => {
  const apiUrl = `${BASE_URL}/person/${personId}/images?api_key=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Bir hata oluştu, lütfen tekrar deneyin.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hata:", error.message);
    return null;
  }
};
