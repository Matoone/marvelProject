import { gql } from "@apollo/client";

const getCharacters = gql`
  query getCharacters {
    characters {
      id
      name
      image {
        url
        extension
      }
    }
  }
`;

const getCharacterDetails = gql`
  query getCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      image {
        url
        extension
      }
      comics {
        id
        title
      }
    }
  }
`;

export { getCharacters, getCharacterDetails };
