// components/SocialIdentityLinks.js

import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import {
  FaFacebook,
  FaImdb,
  FaInstagram,
  FaTwitter,
  FaWikipediaW,
} from "react-icons/fa";

const SocialIdentityLinks = ({ externalIds }) => {
  return (
    <Flex alignItems="center" mt={2} mb={2}>
      <strong>Sosyal Kimlik Bilgileri:</strong>
      <ul
        style={{
          listStyleType: "none",
          paddingInlineStart: 0,
          display: "flex",
          gap: "10px",
          margin: "5px",
        }}>
        {externalIds && externalIds.imdb_id && (
          <li>
            <a
              href={`https://www.imdb.com/name/${externalIds.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#333" }}>
              <Icon as={FaImdb} boxSize={5} /> IMDB
            </a>
          </li>
        )}
        {externalIds && externalIds.wikidata_id && (
          <li>
            <a
              href={`https://www.wikidata.org/wiki/${externalIds.wikidata_id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#333" }}>
              <Icon as={FaWikipediaW} boxSize={5} /> WikiData
            </a>
          </li>
        )}
        {externalIds && externalIds.facebook_id && (
          <li>
            <a
              href={`https://www.facebook.com/${externalIds.facebook_id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#333" }}>
              <Icon as={FaFacebook} boxSize={5} /> Facebook
            </a>
          </li>
        )}
        {externalIds && externalIds.twitter_id && (
          <li>
            <a
              href={`https://twitter.com/${externalIds.twitter_id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#333" }}>
              <Icon as={FaTwitter} boxSize={5} /> Twitter
            </a>
          </li>
        )}
        {externalIds && externalIds.instagram_id && (
          <li>
            <a
              href={`https://www.instagram.com/${externalIds.instagram_id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#333" }}>
              <Icon as={FaInstagram} boxSize={5} /> Instagram
            </a>
          </li>
        )}
      </ul>
    </Flex>
  );
};
export default SocialIdentityLinks;
