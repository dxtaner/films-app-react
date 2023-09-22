import axios from "axios";
import { showSuccessMessage } from "../Alerts.js";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_APIKEY;
const language = "tr-US";
const region = "tr";

const getSessionId = () =>
  sessionStorage.getItem("session_id")
    ? sessionStorage.getItem("session_id")
    : null;

export const getPopularMovies = () => {
  return axios
    .get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${language}&page=1&region=${region}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getTopRatedMovies = () => {
  return axios
    .get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${language}&page=1&region=${region}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getUpcomingMovies = () => {
  return axios
    .get(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${language}&page=1&region=${region}`
    )
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const getMoviesDetails = (id) => {
  // console.log(id);
  const requestURL = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`;

  // console.log("Request URL:", requestURL); // URL'yi konsola yazdır

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

export const addToMovieRatings = async (movie_id, rating) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/movie/${movie_id}/rating`,
      {
        value: rating,
      },
      {
        params: {
          api_key: API_KEY,
          session_id: getSessionId(),
        },
      }
    );

    if (response.status === 201) {
      const data = response.data;
      if (data.status_message === "Success") {
        showSuccessMessage("Film başarıyla derecelendirildi");
      }
    } else {
      console.error("Film Derecelendirilemedi.");
    }
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};

export const addMovieToWatchList = (account_id, values) => {
  return axios
    .post(
      `${BASE_URL}/account/${account_id}/watchlist?api_key=${API_KEY}&session_id=${getSessionId()}`,
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
      `${BASE_URL}/account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${getSessionId()}&language=${language}&sort_by=created_at.asc&page=1`
    )
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const getRatedMovies = async (account_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/account/${account_id}/rated/movies`,
      {
        params: {
          api_key: API_KEY,
          session_id: getSessionId(),
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      if (data.results) {
        // console.log("Gelen Derecelendirilmiş Filmler:", data.results);
        return data.results;
      } else {
        console.error("Derecelendirilmiş filmler alınamadı.");
        return [];
      }
    } else {
      console.error("Derecelendirilmiş filmler alınamadı.");
      return [];
    }
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};

export const getWatchListMovies = (account_id) => {
  return axios
    .get(
      `${BASE_URL}/account/${account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${getSessionId()}&language=${language}&sort_by=created_at.asc&page=1`
    )
    .then((res) => {
      const data = res.data.results;
      // console.log("Watch List Movies Data:", data); // Veriyi logla
      return data;
    })
    .catch((error) => {
      console.error("getWatchListMovies Hatası:", error);
      throw error;
    });
};

export const getMoviesCredit = (id) => {
  return axios
    .get(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${language}`
    )
    .then((res) => {
      // console.log("Response Data:", res.data); // Response verisini logla
      return res.data;
    })
    .catch((error) => {
      console.error("Error:", error); // Hata durumunda hata mesajını logla
    });
};

export const getMovieExternalIds = (movieId) => {
  return axios
    .get(
      `${BASE_URL}/movie/${movieId}/external_ids?api_key=${API_KEY}&language=${language}`
    )
    .then((response) => {
      // console.log("Response Data:", response.data); // Response verisini logla
      return response.data;
    })
    .catch((error) => {
      console.error("Film dış kimlikleri alınamadı: ", error);
      throw error;
    });
};

export const getSimilarMovies = (movieId) => {
  return axios
    .get(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=${language}`
    )
    .then((response) => {
      // console.log("Similar Movies Data:", response.data); // Gelen veriyi logla
      return response.data;
    })
    .catch((error) => {
      console.error("Hata:", error);
      throw error;
    });
};

export const searchMovies = async (query) => {
  try {
    const apiUrl = `https://api.themoviedb.org/3/search/movie`;
    const response = await axios.get(apiUrl, {
      params: {
        query: query,
        api_key: API_KEY,
        language: "tr-US",
      },
    });

    if (response.status !== 200) {
      throw new Error("API isteği başarısız oldu.");
    }

    return response.data.results;
  } catch (error) {
    console.error("Hata:", error);
    throw error;
  }
};

export const discoverMovies = async (queryParams) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: API_KEY,
          page: queryParams.page,
          ...queryParams, // Diğer sorgu parametreleri buradan eklenir
        },
      }
    );

    if (response.status === 200) {
      const data = response.data;
      console.error("data:madı.", data);
      if (data.results) {
        return data.results;
      } else {
        console.error("Filmler alınamadı.");
        return [];
      }
    } else {
      console.error("API isteği başarısız oldu. Durum Kodu:", response.status);
      return [];
    }
  } catch (error) {
    console.error("Hata:", error);
    throw new Error("Filmler alınamadı.");
  }
};
