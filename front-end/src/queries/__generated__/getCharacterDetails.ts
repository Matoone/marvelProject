/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCharacterDetails
// ====================================================

export interface getCharacterDetails_character_image {
  __typename: "ImageResult";
  url: string;
  extension: string;
}

export interface getCharacterDetails_character_comics_items {
  __typename: "Comic";
  name: string;
}

export interface getCharacterDetails_character_comics {
  __typename: "ComicsData";
  appearances: number | null;
  items: getCharacterDetails_character_comics_items[] | null;
}

export interface getCharacterDetails_character {
  __typename: "Character";
  id: string;
  name: string;
  image: getCharacterDetails_character_image;
  description: string | null;
  comics: getCharacterDetails_character_comics | null;
}

export interface getCharacterDetails {
  character: getCharacterDetails_character;
}

export interface getCharacterDetailsVariables {
  id: string;
}
