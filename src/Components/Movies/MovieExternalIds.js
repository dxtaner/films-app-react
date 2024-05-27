import React, { useEffect } from "react";
import { Box, Link, Icon, Tooltip, Wrap, WrapItem } from "@chakra-ui/react";
import {
  FaImdb,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWikipediaW,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMovieExternalIds,
  selectMovieExternalIds,
} from "../../app/features/movies/details/movieExternalIdsSlice";

const MovieExternalIds = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movieExternalIds = useSelector(selectMovieExternalIds);

  useEffect(() => {
    dispatch(fetchMovieExternalIds(id));
  }, [dispatch, id]);

  if (!movieExternalIds) {
    return null;
  }

  const { imdb_id, wikidata_id, facebook_id, twitter_id, instagram_id } =
    movieExternalIds;

  return (
    <Box
      p={3}
      boxShadow="lg"
      borderRadius="lg"
      mx="auto"
      border="none"
      textAlign="center">
      <Wrap justify="center" spacing={4}>
        {imdb_id && (
          <WrapItem>
            <Tooltip label="IMDb" hasArrow>
              <Link
                href={`https://www.imdb.com/title/${imdb_id}`}
                target="_blank"
                rel="noopener noreferrer">
                <Icon as={FaImdb} fontSize="3xl" color="yellow.400" />
              </Link>
            </Tooltip>
          </WrapItem>
        )}

        {wikidata_id && (
          <WrapItem>
            <Tooltip label="WikiData" hasArrow>
              <Link
                href={`https://www.wikidata.org/wiki/${wikidata_id}`}
                target="_blank"
                rel="noopener noreferrer">
                <Icon as={FaWikipediaW} fontSize="3xl" color="black" />
              </Link>
            </Tooltip>
          </WrapItem>
        )}

        {facebook_id && (
          <WrapItem>
            <Tooltip label="Facebook" hasArrow>
              <Link
                href={`https://www.facebook.com/${facebook_id}`}
                target="_blank"
                rel="noopener noreferrer">
                <Icon as={FaFacebook} fontSize="3xl" color="blue.600" />
              </Link>
            </Tooltip>
          </WrapItem>
        )}

        {twitter_id && (
          <WrapItem>
            <Tooltip label="Twitter" hasArrow>
              <Link
                href={`https://www.twitter.com/${twitter_id}`}
                target="_blank"
                rel="noopener noreferrer">
                <Icon as={FaTwitter} fontSize="3xl" color="blue.400" />
              </Link>
            </Tooltip>
          </WrapItem>
        )}

        {instagram_id && (
          <WrapItem>
            <Tooltip label="Instagram" hasArrow>
              <Link
                href={`https://www.instagram.com/${instagram_id}`}
                target="_blank"
                rel="noopener noreferrer">
                <Icon as={FaInstagram} fontSize="3xl" color="pink.400" />
              </Link>
            </Tooltip>
          </WrapItem>
        )}
      </Wrap>
    </Box>
  );
};

export default MovieExternalIds;
