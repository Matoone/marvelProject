import { Comic } from '../graphql/generated/types';

// TODO: use better typing here: ComicsData['items'][0]
export function toComic(comicData: any): Comic {
  return {
    name: comicData.name
  };
}
