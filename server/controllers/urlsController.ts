import { NextFunction, Request, Response } from 'express';
import { getHtml, scraper } from '../utils/scraper';
import { next } from 'cheerio/dist/commonjs/api/traversing';
import xss from 'xss';

const cleanBody = (req: Request, res: Response, next: NextFunction) => {
  const { urls } = req.body;
  const cleanUrls = [];
  for (let url of urls) {
    const clean = xss(url);
    cleanUrls.push(clean);
  }
  req.body = { urls: cleanUrls };
  next();
};

const getData = async (req: Request, res: Response) => {
  const { urls } = req.body;

  try {
    const result = await getHtml(urls);

    res.status(200).json({
      status: 'sucess',
      message: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
};

export default {
  cleanBody,
  getData,
};
