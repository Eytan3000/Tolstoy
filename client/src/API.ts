import axios from 'axios';
import { GetUrlsMetadataResponse } from './types';

const API_URL = 'http://localhost:8000/';

export const getUrlsMetadata = async ({
  urls,
  csrfToken,
}: {
  urls: string[];
  csrfToken: string;
}): Promise<GetUrlsMetadataResponse> => {
  const response = await axios.post(
    API_URL + 'urls',
    {
      urls,
    },
    {
      headers: {
        'X-CSRF-Token': csrfToken, // Add CSRF token here
      },
      withCredentials: true, // Include cookies with the request
    }
  );
  return response.data;
};
// export const getUrlsMetadata = async ({
//   urls,
//   csrfToken,
// }: {
//   urls: string[];
//   csrfToken: string;
// }): Promise<GetUrlsMetadataResponse> => {

//   const response = await axios.post(API_URL + 'urls', {
//     urls,
//   });
//   return response.data;
// };

export const getCSRF = async (): Promise<string> => {
  const response = await axios.get(API_URL + 'csrf-token', {
    withCredentials: true,
  });
  return response.data;
};

// useEffect(() => {
//   // Fetch CSRF token from the server
//   axios
//     .get('http://localhost:3000/csrf-token', { withCredentials: true })
//     .then((response) => {
//       setCsrfToken(response.data.csrfToken);
//     })
//     .catch((error) => {
//       console.error('Error fetching CSRF token:', error);
//     });
// }, []);
