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
    limit?: number
  ) => Promise<CharactersResponse>;
  getCharacter: (id: string) => Promise<Character>;
}

enum MarvelSlugs {
  characters = 'characters',
  character = 'characters/:characterId',
  characterComics = 'characters/:characterId/comics'
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

const buildUrl = (slug: string, payload: MarvelPayload): string => {
  const { ts, publicKey, hash } = payload;
  return `${baseUrl}/${slug}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
};

export default function marvelAPIService(): MarvelAPIService {
  return {
    getCharacters: async (
      offset = 0,
      limit = 20
    ): Promise<CharactersResponse> => {
      const url = buildUrl(MarvelSlugs.characters, buildPayload());
      const res = await axios
        .get(`${url}&offset=${offset}&limit=${limit}`)
        .catch((error) => {
          console.log(error);
          throw error;
        });
      console.log(res);
      if (!res.data?.data?.results ?? !res.data?.data?.total) {
        throw new Error(
          'Un problème est survenu. Merci de réessayer ultérieurement.'
        );
      }
      const { results, total } = res.data.data as GetCharactersApiResponse;

      const characters: Character[] = results.map(toCharacter);
      const hasMore = offset + limit < total;

      return { characters, hasMore };
    },

    getCharacter: async (id: string): Promise<Character> => {
      const url = buildUrl(
        MarvelSlugs.character.replace(':characterId', id),
        buildPayload()
      );
      const res = await axios.get(`${url}`).catch((error) => {
        console.log(error);
        throw error;
      });
      if (!res.data?.data?.results) {
        throw new Error(
          'Un problème est survenu. Merci de réessayer ultérieurement.'
        );
      }
      console.log('res getCharacter', res.data?.data);
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
