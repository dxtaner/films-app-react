import React, { useEffect, useState } from "react";
import { VStack, Button, Text, Flex, Box } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import MovieImage from "./MovieImage";
import MovieGenres from "./MovieGenres";
import MovieOverview from "./MovieOverview";
import MovieExternalIds from "./MovieExternalIds";
import StarRating from "./StarRating";
import nullImage from "../NullImage/null.png";

const MovieDetails = ({
  movieDetails,
  isAuth,
  handleFavoriteClick,
  handleWatchListClick,
  movieExternalIds,
  ratedMoives,
}) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Her film değiştiğinde, yeni filmi değerlendirmek için başlangıç ​​değerini sıfırla
    setRating(0);
    // ratedMoives dizisini döngüye alarak eşleşen filmleri kontrol et
    ratedMoives.forEach((ratedMovie) => {
      if (ratedMovie.id === movieDetails.id) {
        // Eşleşen bir film bulundu
        // console.log("Eşleşen film bulundu:", ratedMovie);
        // console.log("Eşleşen film bulundu:", ratedMovie.rating);
        // Eşleşen filmdeki rating değerini alarak rating'i güncelle
        setRating(ratedMovie.rating);
      }
    });
  }, [ratedMoives, movieDetails.id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  if (!movieExternalIds) {
    return (
      <Box p={6} borderWidth={2} borderColor="gray.300">
        <Text>No external IDs available for this movie.</Text>
      </Box>
    );
  }

  if (!movieDetails) {
    return (
      <VStack
        p={[4, 4, 6, 6]}
        fontSize={["md", "lg", "xl", "2xl"]}
        textAlign="center"
        maxW="1800px"
        mx="auto"
        alignItems="stretch">
        <Text fontSize="xl">Film bilgileri yükleniyor...</Text>
      </VStack>
    );
  }

  const { backdrop_path, original_title, genres } = movieDetails;
  let backdropImageUrl = "";

  if (backdrop_path && backdrop_path !== "null") {
    backdropImageUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`;
  } else {
    // Eğer backdrop_path boş, null veya "null" ise varsayılan bir URL veya başka bir işlem yapabiliriz
    backdropImageUrl = nullImage;
  }

  return (
    <VStack
      p={[4, 4, 6, 6]}
      fontSize={["md", "lg", "xl", "2xl"]}
      textAlign="center"
      maxW="1820px"
      mx="auto"
      alignItems="stretch">
      <MovieImage imageUrl={backdropImageUrl} altText={original_title} />
      <Flex justifyContent="space-between" alignItems="center">
        <MovieGenres genres={genres} />
        {isAuth && (
          <Box>
            <StarRating
              value={rating}
              movieDetailsId={movieDetails.id}
              onRatingChange={handleRatingChange}
            />
            <div style={{ float: "right" }}>
              <Text>
                Puanım{" "}
                {rating > 0 ? (
                  <>
                    {[...Array(rating)].map((_, index) => (
                      <span
                        key={index}
                        style={{ color: "gold", fontSize: "1.5rem" }}>
                        ★
                      </span>
                    ))}
                  </>
                ) : (
                  ": Henüz derecelendirmem yok"
                )}
              </Text>
            </div>
          </Box>
        )}
      </Flex>

      <MovieOverview title={original_title} movieDetails={movieDetails} />
      <MovieExternalIds movieExternalIds={movieExternalIds} />
      {isAuth && (
        <>
          <Button
            leftIcon={<AiOutlineHeart />}
            colorScheme="red"
            size="lg"
            onClick={handleFavoriteClick}
            width="100%"
            borderRadius="md"
            _hover={{
              bgColor: "red.600",
              color: "white",
            }}
            mb={4}>
            Favori Filmlere Ekle
          </Button>

          <Button
            leftIcon={<MdPlaylistAdd />}
            colorScheme="blue"
            size="lg"
            onClick={handleWatchListClick}
            width="100%"
            borderRadius="md"
            _hover={{
              bgColor: "blue.600",
              color: "white",
            }}>
            İzleme Listeme Ekle
          </Button>
        </>
      )}
    </VStack>
  );
};

export default MovieDetails;
