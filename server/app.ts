import express from 'express';
import { router as urlsRouter } from './routes/urls.js';
import cors from 'cors'; // Import the cors package
import rateLimit from 'express-rate-limit';
export const app = express();
import helmet from 'helmet';

// Set security  HTTP headers
app.use(helmet());

//100 requests from the same ip in 1 hour.
const limiter = rateLimit({
  limit: 5,
  windowMs: 1000,
  message: 'Too many requests from this IP. Please try again Later.',
});
app.use('/urls', limiter);

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use('/urls', urlsRouter);
