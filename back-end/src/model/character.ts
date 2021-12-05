import { toComic } from '.';
import { Character, ComicsData } from '../graphql/generated/types';

export interface GetCharactersApiResponse {
  offset: number;
  limit: number;
  total: number;
  results: CharacterFromApiData[];
  attributionText?: string;
}

export interface CharacterFromApiData {
  id: string;
  name: string;
  description?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: {
    available: number;
    items: ComicsData[];
  };
}

export function toCharacter(characterData: CharacterFromApiData): Character {
  return {
    id: characterData.id,
    name: characterData.name,
    image: {
      url: characterData.thumbnail.path,
      extension: characterData.thumbnail.extension
    },
    comics: {
      appearances: characterData.comics?.available,
      items: characterData.comics?.items?.map(toComic) ?? []
    },
    description: characterData.description
  };
}
