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
      description
      comics {
        appearances
        items {
          name
        }
      }
    }
  }
`;

export { getCharacters, getCharacterDetails };
