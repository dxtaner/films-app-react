import React from "react";
import { Flex, Icon, Link, Text, Tooltip } from "@chakra-ui/react";
import {
  FaFacebook,
  FaImdb,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWikipediaW,
  FaYoutube,
} from "react-icons/fa";

const SocialIdentityLinks = ({ externalIds }) => {
  const socialLinks = [
    {
      name: "IMDB",
      icon: FaImdb,
      id: "imdb_id",
      url: `https://www.imdb.com/name/${externalIds?.imdb_id}`,
      color: "#F5C518",
    },
    {
      name: "WikiData",
      icon: FaWikipediaW,
      id: "wikidata_id",
      url: `https://www.wikidata.org/wiki/${externalIds?.wikidata_id}`,
      color: "#FFFFFF",
    },
    {
      name: "Facebook",
      icon: FaFacebook,
      id: "facebook_id",
      url: `https://www.facebook.com/${externalIds?.facebook_id}`,
      color: "#1877F2",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      id: "twitter_id",
      url: `https://twitter.com/${externalIds?.twitter_id}`,
      color: "#1DA1F2",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      id: "instagram_id",
      url: `https://www.instagram.com/${externalIds?.instagram_id}`,
      color: "#E4405F",
    },
    {
      name: "TikTok",
      icon: FaTiktok,
      id: "tiktok_id",
      url: `https://www.tiktok.com/@${externalIds?.tiktok_id}`,
      color: "#FE2C55",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      id: "youtube_id",
      url: `https://www.youtube.com/${externalIds?.youtube_id}`,
      color: "#FF0000",
    },
  ];

  const hasSocialLinks = socialLinks.some(
    (link) => externalIds && externalIds[link.id],
  );

  if (!hasSocialLinks) {
    return (
      <Text fontSize="xs" color="gray.500">
        Sosyal medya hesabı bulunamadı.
      </Text>
    );
  }

  return (
    <Flex align="center" gap={3} flexWrap="wrap">
      {socialLinks.map(
        (link) =>
          externalIds?.[link.id] && (
            <Tooltip key={link.id} label={link.name} hasArrow bg="gray.900">
              <Link
                href={link.url}
                isExternal
                fontSize="xl"
                color="gray.400"
                _hover={{ color: link.color, transform: "scale(1.15)" }}
                transition="all 0.2s"
              >
                <Icon as={link.icon} boxSize={6} />
              </Link>
            </Tooltip>
          ),
      )}
    </Flex>
  );
};

export default SocialIdentityLinks;
