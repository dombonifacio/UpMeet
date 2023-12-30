"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = require("dotenv");
// allows our project to read environment variables
dotenv.config();
// creates an instance of Express application. Sets up a basic Express web server
const app = (0, express_1.default)();
// const port = process.env.PORT;
const port = 5000;
app.get("/", (req, res) => {
    res.send("Express and Typescript Server");
});
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
