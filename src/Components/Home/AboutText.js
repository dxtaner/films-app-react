import React from "react";
import { Text } from "@chakra-ui/react";

function AboutText() {
  return (
    <Text
      fontSize={{ base: "md", md: "lg" }}
      color="gray.300"
      lineHeight="relaxed"
      textAlign={{ base: "center", md: "left" }}
    >
      Sitemiz, sinema dünyasının kalbine giden kapınızdır. En yeni vizyon
      filmlerinden popüler dizilere ve kült yapımlara kadar geniş bir arşivde
      gezinebilir, türleri keşfedebilir ve favori içerikleriniz hakkında detaylı
      bilgilere ulaşabilirsiniz. Sinema tutkunuzu bizimle yaşayın.
    </Text>
  );
}

export default AboutText;
