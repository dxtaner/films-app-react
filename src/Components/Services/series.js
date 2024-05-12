import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const APIKEY = process.env.REACT_APP_APIKEY;

export const getSeriesPopular = () => {
  return axios
    .get(`${BASE_URL}/tv/popular?api_key=${APIKEY}&language=tr&page=1`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Hata oluştu:");
      console.error(err);
    });
};

export const getSeriesTop = (page) => {
  return axios
    .get(`${BASE_URL}/tv/top_rated`, {
      params: {
        api_key: APIKEY,
        language: "tr",
        page: page,
      },
    })
    .then((res) => {
      // Successful request, return the data
      return res.data;
    })
    .catch((err) => {
      console.error("An error occurred:");
      console.error(err);
      throw err;
    });
};
