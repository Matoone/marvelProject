import axios from 'axios';
require('dotenv').config();
import md5 from 'md5';

import { Character, CharactersResponse } from '../graphql/generated/types';
import {
  CharacterFromApiData,
  GetCharactersApiResponse,
  toCharacter
} from '../model';

export interface MarvelAPIService {
  getCharacters: (
    offset?: number,
    limit?: number,
    name?: string
  ) => Promise<CharactersResponse>;
  getCharacter: (id: string) => Promise<Character>;
}

enum MarvelSlugs {
  characters = 'characters',
  character = 'characters/:characterId',
  characterComics = 'characters/:characterId/comics'
}

interface GetCharactersArgs {
  offset?: number;
  limit?: number;
  nameStartsWith?: string;
}

interface MarvelPayload {
  ts: string;
  publicKey: string;
  hash: string;
}

const baseUrl = 'https://gateway.marvel.com:443/v1/public';

const buildPayload = (): MarvelPayload => {
  const ts = `${Date.now()}`;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  if (!privateKey || !publicKey) {
    throw new Error(
      'You have to fill your public key and private key to use the marvel API.'
    );
  }

  const hash = md5(`${ts}${privateKey}${publicKey}`);

  return {
    ts,
    publicKey,
    hash
  };
};

const buildUrl = (
  slug: string,
  payload: MarvelPayload,
  args: GetCharactersArgs
): string => {
  const { ts, publicKey, hash } = payload;

  return `${baseUrl}/${slug}?ts=${ts}&apikey=${publicKey}&hash=${hash}${Object.keys(
    args
  )
    .filter((key) => Boolean(args[key as keyof typeof args]))
    .map((key) => `&${key}=${args[key as keyof typeof args]}`)
    .join('')}`;
};

export default function marvelAPIService(): MarvelAPIService {
  return {
    getCharacters: async (
      offset = 0,
      limit = 20,
      name
    ): Promise<CharactersResponse> => {
      const url = buildUrl(MarvelSlugs.characters, buildPayload(), {
        offset,
        limit,
        nameStartsWith: name
      });
      const res = await axios.get(url).catch((error: Error) => {
        console.log(error);
        throw error;
      });
      console.log(res.data);
      if (!res.data?.data?.results ?? !res.data?.data?.total) {
        throw new Error(
          'Un probl??me est survenu. Merci de r??essayer ult??rieurement.'
        );
      }
      const { results, total } = res.data.data as GetCharactersApiResponse;

      const characters: Character[] = results.map(toCharacter);
      const hasMore = offset + limit < total;

      const { attributionText } = res.data;
      console.log('attributiobnText', attributionText);

      return {
        characters,
        hasMore,
        marvelMessage: attributionText ?? undefined
      };
    },

    getCharacter: async (id: string): Promise<Character> => {
      const url = buildUrl(
        MarvelSlugs.character.replace(':characterId', id),
        buildPayload(),
        {}
      );
      const res = await axios.get(`${url}`).catch((error: Error) => {
        console.log(error);
        throw error;
      });
      if (!res.data?.data?.results) {
        throw new Error(
          'Un probl??me est survenu. Merci de r??essayer ult??rieurement.'
        );
      }
      const result = res.data.data.results[0] as CharacterFromApiData;

      return toCharacter(result);
    }

    // getComics: async (characterId: string, limit = 3): Promise<Comic[]> => {
    //   const url = buildUrl(
    //     MarvelSlugs.characterComics.replace(':characterId', characterId),
    //     buildPayload()
    //   );
    //   const res = await axios.get(`${url}&limit=${limit}`).catch((error) => {
    //     console.log(error);
    //     throw error;
    //   });
    //   console.log('getComicsRes', res);

    //   const results = res.data!.data!.results;
    //   const comics: Comic[] = results.map(toComic);

    //   return comics;
    // }
  };
}
