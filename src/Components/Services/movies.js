import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "../Alerts.js";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_APIKEY;
const language = "tr-US";
const region = "tr";

const getSessionId = () => {
  return sessionStorage.getItem("session_id") || null;
};

const fetchData = async (endpoint, method = "get", params = {}) => {
  try {
    const config = {
      method: method,
      url: `${BASE_URL}${endpoint}`,
      params: {
        api_key: API_KEY,
        language: language,
        region: region,
        ...params,
      },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`An error occurred while fetching ${endpoint}:`, error);
    throw error;
  }
};

export const getPopularMovies = async (page = 1) => {
  return fetchData("/movie/popular", "get", { page });
};

export const getTopRatedMovies = async (page = 1) => {
  return fetchData("/movie/top_rated", "get", { page });
};

export const getUpcomingMovies = async (page = 1) => {
  return fetchData("/movie/upcoming", "get", { page });
};

export const getMoviesDetails = async (id) => {
  return fetchData(`/movie/${id}`);
};

export const getMoviesTrailer = async (id) => {
  return fetchData(`/movie/${id}/videos`, "get", { language: "en-US" });
};

export const addMovieToFavorite = async (account_id, values) => {
  const response = await axios.post(
    `${BASE_URL}/account/${account_id}/favorite`,
    values,
    {
      params: {
        api_key: API_KEY,
        session_id: getSessionId(),
      },
    }
  );
  if (response.data.success) {
    showSuccessMessage(response.data.status_message);
  }
};

export const addToMovieRatings = async (movieId, rating) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/movie/${movieId}/rating`,
      { value: rating },
      {
        params: {
          api_key: API_KEY,
          session_id: getSessionId(),
        },
      }
    );
    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      if (data.success && (data.status_code === 1 || data.status_code === 12)) {
        showSuccessMessage("Film başarıyla derecelendirildi");
      } else {
        showErrorMessage("Film derecelendirme işlemi tamamlanamadı.");
      }
    } else {
      showErrorMessage("Film derecelendirilemedi.");
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

export const addMovieToWatchList = async (account_id, values) => {
  const response = await axios.post(
    `${BASE_URL}/account/${account_id}/watchlist`,
    values,
    {
      params: {
        api_key: API_KEY,
        session_id: getSessionId(),
      },
    }
  );
  if (response.data.success) {
    showSuccessMessage(response.data.status_message);
  }
};

export const getFavoritesMovies = async (account_id, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/account/${account_id}/favorite/movies`,
      {
        params: {
          api_key: API_KEY,
          session_id: getSessionId(),
          language: language,
          sort_by: "created_at.asc",
          page: page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    throw error;
  }
};

export const getWatchListMovies = async (account_id, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/account/${account_id}/watchlist/movies`,
      {
        params: {
          api_key: API_KEY,
          session_id: getSessionId(),
          language: language,
          sort_by: "created_at.asc",
          page: page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist movies:", error);
    throw error;
  }
};

export const getRatedMovies = async (account_id, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/account/${account_id}/rated/movies`,
      {
        params: {
          api_key: API_KEY,
          session_id: getSessionId(),
          language: language,
          page: page,
        },
      }
    );
    if (response.status === 200) {
      const data = response.data;
      if (data) {
        return data;
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

export const getMoviesCredit = async (id) => {
  return fetchData(`/movie/${id}/credits`);
};

export const getMovieExternalIds = async (movieId) => {
  return fetchData(`/movie/${movieId}/external_ids`);
};

export const getSimilarMovies = async (movieId) => {
  return fetchData(`/movie/${movieId}/similar`);
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
  const genres = Array.isArray(queryParams.with_genres)
    ? queryParams.with_genres
    : [queryParams.with_genres];

  return fetchData("/discover/movie", "get", {
    ...queryParams,
    with_genres: genres.join(","),
  });
};

export const fetchMovieCollection = async (collection_id) => {
  const response = await fetch(
    `${BASE_URL}/collection/${collection_id}?api_key=${API_KEY}&language=${language}&region=${region}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movie collection");
  }
  return response.json();
};

export const fetchCollectionImages = async (collectionId) => {
  const response = await axios.get(
    `${BASE_URL}/collection/${collectionId}/images`,
    {
      params: {
        api_key: API_KEY,
      },
    }
  );
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie reviews");
    }

    const data = await response.json();

    const sortedData = data.results.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    return sortedData;
  } catch (error) {
    throw new Error("Failed to fetch movie reviews: " + error.message);
  }
};

export const getMovieKeywords = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/keywords?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching movie keywords: ${response.statusText}`);
    }
    const data = await response.json();

    return data.keywords;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMovieImages = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching movie images: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      backdrops: data.backdrops,
      logos: data.logos,
      posters: data.posters,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMovieProviders = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/watch/providers?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching movie providers: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return null;
  }
};
