export type BannerRes = {
  _id: string;
  title: string;
  image: {
    url: string;
    publicId: string;
  };
  link?: string;
  status: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
};
