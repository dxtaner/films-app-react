import { Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MovieCard = ({ movie }) => {
  const MotionBox = motion.div;

  const navigate = useNavigate();

  const showDetails = () => {
    navigate(`/details/${movie.id}`, { state: movie });
  };

  return (
    <Box
      cursor="pointer"
      width={[300, 200, 200]}
      padding={[2, 2, 4, 4]}
      onClick={showDetails}>
      <MotionBox whileHover={{ scale: 1.1 }}>
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        />
      </MotionBox>
    </Box>
  );
};
export default MovieCard;

// <Box
//     maxW={[300, 400, 500]}
//     boxShadow='dark-lg'
// >
//     <Image src={imagen} fallbackSrc='/Images/1920x1080.png' />
//     <VStack
//         alignItems='start'
//         divider={<StackDivider borderColor='black' />}
//         p={[2, 4, 4, 4]}
//         spacing={4}
//     >
//         <Box
//             fontSize={['sm', 'md', 'md', 'lg']}
//         >
//             <Text fontWeight='bold'>{titulo}</Text>
//             <Text noOfLines={[1, 2, 2]}>{descripcion}</Text>
//         </Box>

//         <Box>
//             <Button
//                 leftIcon={<BiDetail />}
//                 colorScheme='red'
//                 variant='solid'
//                 onClick={() => showDetails(movie)}>
//                 Detalles
//             </Button>
//         </Box>

//     </VStack>
// </Box>
