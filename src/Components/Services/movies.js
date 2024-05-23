import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "../Alerts.js";

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

export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        language: language,
        page: page,
        region: region,
      },
    });

    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching top rated movies:");
    console.error(error);
    throw error;
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: language,
        page: page,
        region: region,
      },
    });

    return response.data;
  } catch (error) {
    console.error("An error occurred while fetching upcoming movies:");
    console.error(error);
    throw error;
  }
};

export const getMoviesDetails = (id) => {
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

export const addToMovieRatings = async (movieId, rating) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/movie/${movieId}/rating`,
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
    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      if (data.status_message === "The item/record was updated successfully.") {
        showSuccessMessage("Film başarıyla derecelendirildi");
      } else {
        showErrorMessage("Film derecelendirme işlemi tamamlanamadı.");
      }
    } else {
      showErrorMessage("Film Derecelendirilemedi.");
    }
  } catch (error) {
    console.error("Hata:", error);
    showErrorMessage("Hata: Film derecelendirilemedi.");
    throw error;
  }
};

export const removeFromMovieRatings = async (movie_id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/movie/${movie_id}/rating`,
      {
        params: {
          api_key: API_KEY,
          session_id: getSessionId(),
        },
      }
    );

    if (response.status === 200 || response.status === 204) {
      showSuccessMessage("Film derecelendirme başarıyla kaldırıldı");
    } else {
      showErrorMessage("Film derecelendirme kaldırılamadı.");
    }
  } catch (error) {
    console.error("Hata:", error);
    showErrorMessage("Hata: Film derecelendirme kaldırılamadı.");
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
      if (res.data.success) {
        showSuccessMessage(res.data.status_message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getFavoritesMovies = (account_id, page = 1) => {
  return axios
    .get(
      `${BASE_URL}/account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${getSessionId()}&language=${language}&sort_by=created_at.asc&page=${page}`
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};

export const getWatchListMovies = (account_id, page = 1) => {
  return axios
    .get(
      `${BASE_URL}/account/${account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${getSessionId()}&language=${language}&sort_by=created_at.asc&page=${page}`
    )
    .then((res) => {
      return res.data;
    })
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

export const getMoviesCredit = (id) => {
  return axios
    .get(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${language}`
    )
    .then((res) => {
      // console.log("Response Data:", res.data);
      return res.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getMovieExternalIds = (movieId) => {
  return axios
    .get(
      `${BASE_URL}/movie/${movieId}/external_ids?api_key=${API_KEY}&language=${language}`
    )
    .then((response) => {
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
      return response.data;
    })
    .catch((error) => {
      console.error("Hata:", error);
      throw error;
    });
};

export const searchMovies = async (query) => {
  try {
    const apiUrl = `${BASE_URL}/search/movie`;

    const response = await axios.get(apiUrl, {
      params: {
        query: query,
        api_key: API_KEY,
        language: language,
        region: region,
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
    const language = queryParams.language;
    const region = queryParams.region;
    const apiUrl = `${BASE_URL}/discover/movie`;

    const genres = Array.isArray(queryParams.with_genres)
      ? queryParams.with_genres
      : [queryParams.with_genres];

    const response = await axios.get(apiUrl, {
      params: {
        api_key: API_KEY,
        ...queryParams,
        language: language,
        region: region,
        with_genres: genres.join(","),
      },
    });

    if (response.status === 200) {
      const data = response.data;

      if (data.results) {
        return data;
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

export const fetchMovieCollection = async (collection_id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/collection/${collection_id}?api_key=${API_KEY}&language=${language}&region=${region}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie collection");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie collection:", error);
    throw error;
  }
};

export const fetchCollectionImages = async (collectionId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/collection/${collectionId}/images`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching collection images:", error);
    throw error;
  }
};
