import express from 'express';
import { router as urlsRouter } from './routes/urls.js';
import cors from 'cors'; // Import the cors package
import rateLimit from 'express-rate-limit';
export const app = express();
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { csrfProtection } from './utils/csrfProtection.js';

// Set security  HTTP headers
app.use(helmet());

app.use(cookieParser());
// CSRF protection middleware
app.use(csrfProtection);

//100 requests from the same ip in 1 hour.
const limiter = rateLimit({
  limit: 5,
  windowMs: 1000,
  message: 'Too many requests from this IP. Please try again Later.',
});
app.use('/urls', limiter);

// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(
  cors({
    origin: 'http://localhost:5173', // The client’s origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allows cookies to be sent with requests
  })
);

app.use(express.json());
app.use('/urls', urlsRouter);
app.use('/csrf-token', urlsRouter);

/*

import express from 'express';
import { router as urlsRouter } from './routes/urls.js';
import cors from 'cors'; // Import the cors package
import rateLimit from 'express-rate-limit';
export const app = express();
import helmet from 'helmet';
import session from 'express-session';
import csrf from 'csrf';

// Set security  HTTP headers
app.use(helmet());

// Session configuration
app.use(
  session({
    secret: 'your_secret_key', // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
  })
);

// CSRF protection
app.use(csrf({ cookie: true }));

//100 requests from the same ip in 1 hour.
const limiter = rateLimit({
  limit: 5,
  windowMs: 1000,
  message: 'Too many requests from this IP. Please try again Later.',
});
app.use('/urls', limiter);

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());
app.use('/urls', urlsRouter);
app.use('/csrf-token', urlsRouter);
*/
