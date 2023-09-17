import React from "react";
import { Text } from "@chakra-ui/react";

function AboutText() {
  return (
    <Text
      fontSize="lg"
      mb={4}
      color="gray.700" // Metin rengi
      lineHeight="1.6" // Satır aralığı
      textAlign="center" // Metin ortalanmış olarak
    >
      Bu sayfa, sitemizde yer alan filmler hakkında bilgileri içermektedir.
      Sitemizde en yeni ve en popüler filmleri bulabilir, inceleyebilir ve
      hakkında daha fazla bilgi alabilirsiniz. Ayrıca, filmlerin türleri ve daha
      fazlası hakkında detayları bu sayfada bulabilirsiniz. Film dünyasının en
      güncel gelişmelerini takip etmek için bu sayfayı ziyaret edebilirsiniz.
    </Text>
  );
}

export default AboutText;
