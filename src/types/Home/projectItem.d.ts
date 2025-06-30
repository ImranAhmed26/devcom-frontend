export type ProjectItem = projectItem & {
  title: string;
  type: string;
  subTitle: string;
  description: string;
  imagePrimary: StaticImageData;
  imageSecondary: StaticImageData;
  color: string;
  link: string;
};
