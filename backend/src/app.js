"use strict";
// src/app.ts
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("./Database/db");
var app = (0, express_1.default)();
var PORT = 3000;
// Connect to the database
(0, db_1.default)();
app.get('/', function (req, res) {
    res.send('Server is running and connected to the database!');
});
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server is listening on port ".concat(PORT));
});
