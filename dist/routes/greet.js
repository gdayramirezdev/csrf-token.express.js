"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const greet = (0, express_1.Router)();
greet.get('/hello', (req, res) => {
    console.log(req.csrfToken());
    req.session.views = (req.session.views || 0) + 1;
    res.send(req.session);
});
exports.default = greet;
