import { gql } from "@apollo/client";

const signup = gql`
  mutation signup($email: String!, $password: String!) {
    signup(userInput: { email: $email, password: $password }) {
      email
      token
    }
  }
`;

const login = gql`
  mutation login($email: String!, $password: String!) {
    signin(userInput: { email: $email, password: $password }) {
      email
      token
    }
  }
`;

export { signup, login };
