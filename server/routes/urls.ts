import express, { Express, Request, Response } from 'express';
import urlsController from '../controllers/urlsController';

export const router = express.Router();

router
  .route('/')
  .post(urlsController.cleanBody, urlsController.getData)
  .get(urlsController.getCsrfToken);
