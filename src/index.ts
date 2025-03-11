import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

import { doubleCsrfUtilities } from "./routes/csrf-token";
import greet from "./routes/greet";

/**
 * Initialize app express
 */
const app = express();

/**
 * Use cookie parser and cookie session
 */
app.use(cookieParser());
app.use(
  cookieSession({
    secret: "this-is-my-secret",
    maxAge: 24 * 60 * 60 * 1000,
  })
);

/**
 * CSRF-TOKEN
 */
app.get("/csrf-token", (req: Request, res: Response) => {
  const csrfToken = doubleCsrfUtilities.generateToken(req, res);
  res.json({ csrfToken }).status(200);
});

app.use(doubleCsrfUtilities.doubleCsrfProtection);

/**
 * Protected middlewares
 */
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.use("/greet", greet);

/**
 * Start Server
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
