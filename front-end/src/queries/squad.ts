import { gql } from "@apollo/client";

const getSquad = gql`
  query getSquad {
    characters {
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
