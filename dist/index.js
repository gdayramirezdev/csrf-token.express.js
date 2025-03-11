"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const greet_1 = __importDefault(require("./routes/greet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const csrf_csrf_1 = require("csrf-csrf");
const app = (0, express_1.default)();
const doubleCsrfUtilities = (0, csrf_csrf_1.doubleCsrf)({
    getSecret: () => "Secret", // A function that optionally takes the request and returns a secret
    getSessionIdentifier: (req) => "", // A function that should return the session identifier for a given request
    cookieName: "localhost.x-csrf-token", // The name of the cookie to be used, recommend using Host prefix.
    cookieOptions: {
        secure: false,
        domain: 'localhost',
    },
    size: 64, // The size of the generated tokens in bits
    ignoredMethods: ["HEAD", "OPTIONS"], // A list of request methods that will not be protected.
    getTokenFromRequest: (req) => req.headers["x-csrf-token"], // A function that returns the token from the request
});
app.use((0, cookie_parser_1.default)());
app.use((0, cookie_session_1.default)({
    secret: 'this-is-my-secret',
    maxAge: 24 * 60 * 60 * 1000
}));
/**
 * Middlewares
 */
const myRoute = (req, res) => {
    const csrfToken = doubleCsrfUtilities.generateToken(req, res);
    res.json({ csrfToken }).status(200);
};
app.get("/csrf-token", myRoute);
app.use(doubleCsrfUtilities.doubleCsrfProtection);
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
app.use('/greet', greet_1.default);
/**
 * Start Server
 */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
