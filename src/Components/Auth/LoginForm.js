import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  getAutheticationToken,
  createSessionToken,
  authenticateUser,
} from "../Services/auth.js";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const token = sessionStorage.getItem("session_id");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {token && <Navigate replace to="/" />}
      <Flex
        minH="80vh"
        align="center"
        justify="center"
        px={4}
        py={12}
        bg="gray.950"
      >
        <Container maxW="md">
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
            onSubmit={async (values, { setSubmitting }) => {
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
                console.error("Giriş hatası:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Box
                as="form"
                onSubmit={handleSubmit}
                bg="gray.900"
                p={{ base: 6, sm: 8 }}
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.800"
                boxShadow="2xl"
                w="100%"
              >
                <VStack spacing={6} align="stretch">
                  <VStack spacing={2} textAlign="center">
                    <Heading size="lg" color="white" fontWeight="extrabold">
                      Giriş Yap
                    </Heading>
                    <Text fontSize="sm" color="gray.400">
                      Oturum açmak için TMDB hesabınızı kullanın.
                    </Text>
                  </VStack>

                  {/* Kullanıcı Adı */}
                  <FormControl isInvalid={errors.username && touched.username}>
                    <FormLabel color="gray.300" fontSize="sm">
                      Kullanıcı Adı
                    </FormLabel>
                    <Input
                      name="username"
                      value={values.username}
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      bg="gray.800"
                      color="white"
                      borderColor="gray.700"
                      borderRadius="lg"
                      _hover={{ borderColor: "gray.600" }}
                      _focus={{
                        borderColor: "red.500",
                        boxShadow: "0 0 0 1px #E53E3E",
                      }}
                    />
                    <FormErrorMessage color="red.400">
                      {errors.username}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Şifre */}
                  <FormControl isInvalid={errors.password && touched.password}>
                    <FormLabel color="gray.300" fontSize="sm">
                      Şifre
                    </FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        value={values.password}
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        bg="gray.800"
                        color="white"
                        borderColor="gray.700"
                        borderRadius="lg"
                        _hover={{ borderColor: "gray.600" }}
                        _focus={{
                          borderColor: "red.500",
                          boxShadow: "0 0 0 1px #E53E3E",
                        }}
                      />
                      <InputRightElement h="full">
                        <IconButton
                          variant="ghost"
                          size="sm"
                          color="gray.400"
                          _hover={{ color: "white", bg: "transparent" }}
                          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Şifreyi Göster/Gizle"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage color="red.400">
                      {errors.password}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Submit Butonu */}
                  <Button
                    type="submit"
                    colorScheme="red"
                    bg="red.600"
                    size="lg"
                    fontSize="md"
                    borderRadius="lg"
                    isLoading={isSubmitting}
                    loadingText="Giriş Yapılıyor..."
                    _hover={{ bg: "red.500" }}
                    _active={{ bg: "red.700" }}
                    w="100%"
                    mt={2}
                  >
                    Giriş Yap
                  </Button>

                  <Text fontSize="xs" color="gray.400" textAlign="center">
                    Şifrenizi mi unuttunuz?{" "}
                    <Link
                      href="https://www.themoviedb.org/reset-password"
                      isExternal
                      color="red.400"
                      fontWeight="semibold"
                      _hover={{ textDecoration: "underline", color: "red.300" }}
                    >
                      Şifremi Sıfırla
                    </Link>
                  </Text>
                </VStack>
              </Box>
            )}
          </Formik>
        </Container>
      </Flex>
    </>
  );
};

export default LoginForm;
