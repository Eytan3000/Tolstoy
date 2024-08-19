import axios from 'axios';
import * as cheerio from 'cheerio';

export function scraper(body: any) {
  const obj = {
    title: 'title.title',
    description: 'desc.desc',
    image: 'image.image',
  };
  return obj;
}

interface Metadata {
  title: string;
  description: string;
  image: string;
}
// mimic a browser request by setting headers
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
};

export async function getHtml(urls: string[]) {
  const metadataArray: Metadata[] = [];

  for (let url of urls) {
    try {
      const { data: html } = await axios.get(url, {
        headers,
      });

      const $ = cheerio.load(html);

      // Extract metadata
      const title =
        $('meta[property="og:title"]').attr('content') || $('title').text();
      const description =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content');
      const image =
        $('meta[property="og:image"]').attr('content') || $('img').attr('src');

      metadataArray.push({
        title: title || 'No Title Found',
        description: description || 'No Description Found',
        image: image || '',
      });
    } catch (error) {
      console.log(error);
    }
  }
  return metadataArray;
}
