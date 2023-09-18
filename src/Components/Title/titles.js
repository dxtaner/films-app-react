import { Box, Heading } from "@chakra-ui/react";

const Title = ({ text, children }) => {
  return (
    <Box textAlign="center" fontSize={["sm", "md", "lg", "xl"]}>
      <Heading color="blue.800">{text}</Heading>
      {children}
    </Box>
  );
};
export default Title;
