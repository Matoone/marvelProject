/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSquad
// ====================================================

export interface getSquad_gameCharacters_image {
  __typename: "ImageResult";
  url: string;
  extension: string;
}

export interface getSquad_gameCharacters_stats {
  __typename: "Stats";
  xp: number;
  hp: number;
  tire: number;
}

export interface getSquad_gameCharacters {
  __typename: "GameCharacter";
  id: string;
  name: string;
  image: getSquad_gameCharacters_image;
  stats: getSquad_gameCharacters_stats;
}

export interface getSquad {
  gameCharacters: getSquad_gameCharacters[];
}

export interface getSquadVariables {
  userId: string;
}
