import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const APIKEY = process.env.REACT_APP_APIKEY;

export const getSeriesPopular = () => {
  return axios
    .get(`${BASE_URL}/tv/popular?api_key=${APIKEY}&language=es&page=1`)
    .then((res) => {
      // console.log("Başarılı istek, veriler:");
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Hata oluştu:");
      console.error(err);
    });
};

export const getSeriesTop = () => {
  return axios
    .get(`${BASE_URL}/tv/top_rated?api_key=${APIKEY}&language=es&page=1`)
    .then((res) => {
      // console.log("Başarılı istek, veriler:");
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Hata oluştu:");
      console.error(err);
    });
};
