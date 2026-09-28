import { useState, useEffect } from "react";
import axios from "axios";

const YOUR_API_KEY = process.env.REACT_APP_APIKEY;
let genreCache = null;

export const useGenres = () => {
  const [genres, setGenres] = useState(genreCache || {});

  useEffect(() => {
    if (genreCache) return;

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/tv/list",
          {
            params: {
              api_key: YOUR_API_KEY,
              language: "tr-TR",
            },
          },
        );
        const genreMap = {};
        response.data.genres.forEach((genre) => {
          genreMap[genre.id] = genre.name;
        });
        genreCache = genreMap;
        setGenres(genreMap);
      } catch (error) {
        console.error("Genre fetch error:", error);
      }
    };

    fetchGenres();
  }, []);

  return genres;
};
