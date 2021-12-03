import { gql } from "@apollo/client";

const getSquad = gql`
  query getSquad($userId: ID!) {
    gameCharacters(userId: $userId) {
      id
      name
      image {
        url
        extension
      }
      stats {
        xp
        hp
        tire
      }
    }
  }
`;

export { getSquad };
