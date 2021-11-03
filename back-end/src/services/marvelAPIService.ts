import axios from 'axios';
require('dotenv').config();

import md5 from 'md5';
import { Identity } from '../config/buildingBlocks/identity';

enum MarvelSlugs {
  characters = 'characters',
  character = 'characters/:characterId',
  characterComics = 'characters/:characterId/comics'
}

interface Payload {
  ts: string;
  publicKey: string;
  hash: string;
}

interface CharacterResult {
  id: string;
  name: string;
  image: {
    url: string;
    extension: string;
  };
  description?: string;
}

function toCharacter(characterData: any): CharacterResult {
  return {
    id: characterData.id!,
    name: characterData.name!,
    image: {
      url: characterData.thumbnail.path!,
      extension: characterData.thumbnail.extension!
    },
    description: characterData.description
  };
}

interface ComicResult {
  id: string;
  title: string;
}

function toComic(comicData: any): ComicResult {
  return {
    id: comicData.id!,
    title: comicData.title!
  };
}

const baseUrl = 'https://gateway.marvel.com:443/v1/public';

const buildPayload = (): Payload => {
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

const buildUrl = (slug: string, payload: Payload): string => {
  const { ts, publicKey, hash } = payload;
  return `${baseUrl}/${slug}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
};

export default function marvelAPIService() {
  return {
    getCharacters: async (
      offset = 99,
      limit = 20
    ): Promise<CharacterResult[]> => {
      const url = buildUrl(MarvelSlugs.characters, buildPayload());
      const res = await axios
        .get(`${url}&offset=${offset}&limit=${limit}`)
        .catch((error) => {
          console.log(error);
          throw error;
        });

      const results = res.data!.data!.results;
      const characters: CharacterResult[] = results.map(toCharacter);
      console.log(characters);
      return characters;
    },

    getCharacter: async (id: string): Promise<CharacterResult> => {
      const url = buildUrl(
        MarvelSlugs.character.replace(':characterId', id),
        buildPayload()
      );
      const res = await axios.get(`${url}`).catch((error) => {
        console.log(error);
        throw error;
      });
      console.log('getCharacterRes', res);
      const result = res.data!.data!.results[0];

      return toCharacter(result);
    },

    getComics: async (
      characterId: string,
      limit = 3
    ): Promise<ComicResult[]> => {
      const url = buildUrl(
        MarvelSlugs.characterComics.replace(':characterId', characterId),
        buildPayload()
      );
      const res = await axios.get(`${url}&limit=${limit}`).catch((error) => {
        console.log(error);
        throw error;
      });
      console.log('getComicsRes', res);

      const results = res.data!.data!.results;
      const comics: ComicResult[] = results.map(toComic);

      return comics;
    }
  };
}
