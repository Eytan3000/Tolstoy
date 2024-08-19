export interface Metadata {
  title: string;
  description: string;
  image: string;
}

export type Status = 'success' | 'error';

export type GetUrlsMetadataResponse = {
  status: Status;
  message: Metadata[];
};
