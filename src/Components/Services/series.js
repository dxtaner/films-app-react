import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const APIKEY = process.env.REACT_APP_APIKEY;

export const getSeriesPopular = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: APIKEY,
        language: "tr",
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred:");
    console.error(error);
    throw error;
  }
};

export const getSeriesTop = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/top_rated`, {
      params: {
        api_key: APIKEY,
        language: "tr",
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred:");
    console.error(error);
    throw error;
  }
};
