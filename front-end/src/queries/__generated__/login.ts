/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_signin {
  __typename: "UserWithToken";
  email: string;
  token: string;
}

export interface login {
  signin: login_signin;
}

export interface loginVariables {
  email: string;
  password: string;
}
