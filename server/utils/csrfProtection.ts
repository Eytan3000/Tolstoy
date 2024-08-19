import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// CSRF protection middleware
const generateCsrfToken = () => uuidv4();

export const csrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'GET') {
    console.log('GET');

    // Generate CSRF token and set it as a cookie
    const csrfToken = generateCsrfToken();
    console.log('csrfToken(in middleware): ', csrfToken); //removeEytan

    // res.cookie('csrfToken', csrfToken, {
    //   httpOnly: true,
    //   sameSite: 'strict',
    //   secure: false,
    // }); // Set secure to true in production

    // session({
    //   secret: 'your_secret_key', // Replace with a strong secret
    //   resave: false,
    //   saveUninitialized: true,
    // })
  } else if (
    req.method === 'POST' ||
    req.method === 'PUT' ||
    req.method === 'DELETE'
  ) {
    console.log('POST');
    const csrfToken = req.cookies.csrfToken;
    console.log('csrfToken: ', csrfToken); // Check if token is set
    const csrfHeader = req.headers['x-csrf-token'] as string;
    console.log('csrfHeader: ', csrfHeader); // Check if token is received
    if (!csrfToken || csrfToken !== csrfHeader) {
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }
  }

  next();
};
