/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCharacters
// ====================================================

export interface getCharacters_characters_image {
  __typename: "ImageResult";
  url: string;
  extension: string;
}

export interface getCharacters_characters {
  __typename: "Character";
  id: string;
  name: string;
  image: getCharacters_characters_image;
}

export interface getCharacters {
  characters: getCharacters_characters[];
}
