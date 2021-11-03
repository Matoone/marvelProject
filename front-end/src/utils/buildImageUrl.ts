export enum ImageResolutions {
  sm = "portrait_small",
  md = "portrait_medium",
  l = "portrait_xlarge",
  xl = "portrait_fantastic",
  xxl = "portrait_uncanny",
  xxxl = "portrait_incredible",
}

export interface CharacterImageData {
  url: string;
  extension: string;
}

export const buildImageUrl = (
  imageData: CharacterImageData,
  quality: ImageResolutions = ImageResolutions.md
): string => {
  return `${imageData.url}/${quality}.${imageData.extension}`;
};
