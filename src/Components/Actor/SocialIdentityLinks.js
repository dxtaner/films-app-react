import React from "react";
import { Flex, Icon, Link, Tooltip } from "@chakra-ui/react";
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

  return (
    <Flex as="section" alignItems="center" mt={4} mb={2}>
      <strong>Sosyal Kimlik Bilgileri:</strong>
      <Flex ml={4} wrap="wrap" justify="flex-start">
        {socialLinks.map((link, index) => (
          <Tooltip key={index} label={link.name} aria-label={link.name}>
            <Link
              key={index}
              href={link.url}
              isExternal
              textDecoration="none"
              fontSize="xl"
              color="gray.600"
              _hover={{ color: "blue.500", transform: "scale(1.1)" }}
              mr={4}>
              <Icon as={link.icon} boxSize={8} />
            </Link>
          </Tooltip>
        ))}
      </Flex>
    </Flex>
  );
};

export default SocialIdentityLinks;
