import { doubleCsrf } from 'csrf-csrf';

export const doubleCsrfUtilities = doubleCsrf({
  getSecret: () => "Secret",
  getSessionIdentifier: (req) => "",
  cookieName: "localhost.x-csrf-token",
  cookieOptions: {
    secure: false,
    domain: 'localhost',
    maxAge: 24 * 60 * 60 * 1000,
  },
  size: 64,
  ignoredMethods: ["HEAD", "OPTIONS"],
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});
