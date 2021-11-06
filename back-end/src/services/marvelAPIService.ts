import axios from 'axios';
require('dotenv').config();

import md5 from 'md5';
import { Identity } from '../config/buildingBlocks/identity';
import { MarvelAPIService } from '../config/container';
import { Character, Comic } from '../graphql/generated/types';

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

// interface CharacterResult {
//   id: string;
//   name: string;
//   image: {
//     url: string;
//     extension: string;
//   };
//   comics: {
//     appearances: number;
//     items: ComicResult[];
//   };
//   description?: string;
// }

function toCharacter(characterData: any): Character {
  return {
    id: characterData.id!,
    name: characterData.name!,
    image: {
      url: characterData.thumbnail.path!,
      extension: characterData.thumbnail.extension!
    },
    comics: {
      appearances: characterData.comics?.available,
      items: characterData.comics?.items?.map(toComic) ?? []
    },
    description: characterData.description
  };
}

// interface ComicResult {
//   id: string;
//   title: string;
// }

function toComic(comicData: any): Comic {
  console.log(comicData);
  return {
    name: comicData.name!
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

export default function marvelAPIService(): MarvelAPIService {
  return {
    getCharacters: async (offset = 99, limit = 20): Promise<Character[]> => {
      const url = buildUrl(MarvelSlugs.characters, buildPayload());
      const res = await axios
        .get(`${url}&offset=${offset}&limit=${limit}`)
        .catch((error) => {
          console.log(error);
          throw error;
        });

      const results = res.data!.data!.results;
      const characters: Character[] = results.map(toCharacter);
      console.log(characters);
      return characters;
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
      console.log('getCharacterRes', res);
      const result = res.data!.data!.results[0];

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
