import axios from 'axios';
import { GetUrlsMetadataResponse } from './types';

const API_URL = 'http://localhost:8000/';

export const getUrlsMetadata = async (
  urls: string[]
): Promise<GetUrlsMetadataResponse> => {
  const response = await axios.post(API_URL + 'urls', {
    urls,
  });
  return response.data;
};
