import { StaticImageData } from 'next/image';

export type projectItem = {
  title: string;
  subTitle: string;
  type: string;
  description: string;
  imagePrimary: StaticImageData;
  imageSecondary: StaticImageData;
  imageTertiary?: StaticImageData;
  link?: string;
  color: string;
};
