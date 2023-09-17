import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import {
  getAutheticationToken,
  createSessionToken,
  authenticateUser,
} from "../Services/auth.js";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const token = sessionStorage.getItem("session_id");

  return (
    <>
      {token && <Navigate replace to="/" />}
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = "Kullanıcı adı gereklidir.";
          }
          if (!values.password) {
            errors.password = "Şifre gereklidir.";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          try {
            const { request_token } = await getAutheticationToken();
            values.request_token = request_token;
            const session = await createSessionToken(values);
            const { session_id } = await authenticateUser({
              request_token: session.request_token,
            });
            sessionStorage.setItem("session_id", session_id);
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <Flex justifyContent="center" alignItems="center" height="90vh">
            <VStack spacing={5} padding="5" boxShadow="lg">
              <Heading size="lg">Giriş Ekranı</Heading>
              <Text fontSize="md">
                Oturum açmak için bir TMDB hesabınızın olması gereklidir.
              </Text>
              <FormControl isInvalid={errors.username}>
                <FormLabel>Kullanıcı Adı</FormLabel>
                <Input
                  name="username"
                  value={values.username}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel>Şifre</FormLabel>
                <Input
                  name="password"
                  value={values.password}
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Button
                bg="blue.400"
                color="white"
                _hover={{ bg: "blue.500" }}
                onClick={handleSubmit}>
                Giriş Yap
              </Button>
              <Text fontSize="md">
                Şifreni mi unuttun?{" "}
                <Link
                  to="https://www.themoviedb.org/reset-password"
                  isExternal
                  color="blue.400">
                  Şifremi Sıfırla
                </Link>
              </Text>
            </VStack>
          </Flex>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
