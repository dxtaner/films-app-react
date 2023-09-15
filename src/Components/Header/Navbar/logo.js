import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <Box cursor="pointer" onClick={() => navigate("/")}>
      <Text fontSize="lg" fontWeight="bold">
        Films
      </Text>
    </Box>
  );
};
