"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const greet = (0, express_1.Router)();
greet.get('/hello', (_, res) => {
    res.send({ message: 'Hello there!' });
});
exports.default = greet;
