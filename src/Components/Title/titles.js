import { Box, Heading } from "@chakra-ui/react";

const Title = ({ text, children }) => {
  return (
    <Box textAlign="center" fontSize={["sm", "md", "lg", "xl"]}>
      <Heading color="red.600">{text}</Heading>
      {children}
    </Box>
  );
};
export default Title;
