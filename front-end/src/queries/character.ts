import { gql } from "@apollo/client";

const getCharacters = gql`
  query getCharacters($offset: Int!, $limit: Int!, $name: String) {
    characters(offset: $offset, limit: $limit, name: $name) {
      hasMore
      marvelMessage
      characters {
        id
        name
        image {
          url
          extension
        }
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
