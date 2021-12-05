/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCharacters
// ====================================================

export interface getCharacters_characters_characters_image {
  __typename: "ImageResult";
  url: string;
  extension: string;
}

export interface getCharacters_characters_characters {
  __typename: "Character";
  id: string;
  name: string;
  image: getCharacters_characters_characters_image;
}

export interface getCharacters_characters {
  __typename: "CharactersResponse";
  hasMore: boolean;
  marvelMessage: string | null;
  characters: getCharacters_characters_characters[];
}

export interface getCharacters {
  characters: getCharacters_characters;
}

export interface getCharactersVariables {
  offset: number;
  limit: number;
  name?: string | null;
}
