import React from "react";
import { Flex, Icon, Link, Text, Tooltip } from "@chakra-ui/react";
import {
  FaFacebook,
  FaImdb,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWikipediaW,
  FaYoutubeSquare,
} from "react-icons/fa";

const SocialIdentityLinks = ({ externalIds }) => {
  const socialLinks = [
    {
      name: "IMDB",
      icon: FaImdb,
      id: "imdb_id",
      url: `https://www.imdb.com/name/${externalIds?.imdb_id}`,
    },
    {
      name: "WikiData",
      icon: FaWikipediaW,
      id: "wikidata_id",
      url: `https://www.wikidata.org/wiki/${externalIds?.wikidata_id}`,
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      id: "facebook_id",
      url: `https://www.facebook.com/${externalIds?.facebook_id}`,
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      id: "twitter_id",
      url: `https://twitter.com/${externalIds?.twitter_id}`,
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      id: "instagram_id",
      url: `https://www.instagram.com/${externalIds?.instagram_id}`,
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      id: "tiktok_id",
      url: `https://www.tiktok.com/${externalIds?.tiktok_id}`,
    },
    {
      name: "YouTube",
      icon: FaYoutubeSquare,
      id: "youtube_id",
      url: `https://www.youtube.com/${externalIds?.youtube_id}`,
    },
  ];

  const hasSocialLinks = socialLinks.some(
    (link) => externalIds && externalIds[link.id]
  );

  return (
    <Flex
      as="section"
      alignItems="center"
      p={2}
      mt={4}
      wrap={"wrap"}
      bg={hasSocialLinks ? "gray.50" : "transparent"}
      mb={2}
      borderRadius={hasSocialLinks ? "md" : "none"}>
      {hasSocialLinks ? (
        <>
          {socialLinks.map(
            (link, index) =>
              externalIds[link.id] && (
                <Tooltip
                  key={index}
                  label={link.name}
                  aria-label={link.name}
                  placement="top">
                  <Link
                    key={index}
                    href={link.url}
                    isExternal
                    textDecoration="none"
                    fontSize="xl"
                    color="gray.600"
                    _hover={{ color: "blue.500" }}
                    mx={2}>
                    <Icon as={link.icon} boxSize={8} />
                  </Link>
                </Tooltip>
              )
          )}
        </>
      ) : (
        <Text fontSize="lg" color="gray.600">
          Sosyal kimlik bilgileri bulunamadı.
        </Text>
      )}
    </Flex>
  );
};

export default SocialIdentityLinks;
