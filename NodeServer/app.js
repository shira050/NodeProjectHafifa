const express = require("express");
const path = require("path");
const http = require("http");
const { routesInit } = require("./routes/config_routes")
// const fs = require("fs");
// require("dotenv").config;
// const axios = require("axios");
// const fsPromise = require('fs/promises')

const app = express();
app.use(express.json());


// הגדרת תקיית הפאבליק כתקייה ראשית
app.use(express.static(path.join(__dirname, "public")))

routesInit(app);

const server = http.createServer(app);

let port = process.env.NODE_PORT || 3001
server.listen(port);

// intervalId = setInterval(() => {
//     debugger
//     readAllFolderText();
// }, 100000);

// const readAllFolderText = async () => {
//     debugger
//     const pathFolder = process.env.FOLDER_URL || "C:/Users/Shira/Documents/nodeProject/NodeServer/public/";
//     const pathServerWriteFunction = process.env.EXSPRESS_SERVER_URL || "http://localhost:3000/";
//     fs.readdirSync(pathFolder).forEach(async file => {
//         let text = await fsPromise.readFile(pathFolder + file.toString(), { encoding: 'utf-8' });
//         let result = await doApiMethod(pathServerWriteFunction + 'write/C:/Users/Shira/Documents/nodeProject/expressServer/public/' + file, 'POST', { "content": text });
//         console.log(result);
//     });
// }
// const doApiMethod = async (_url, _method, _body = {}) => {
//     try {
//       let resp = await axios({
//         url: _url,
//         method: _method,
//         data: _body,
//       });
//       debugger
//       return resp;
//     } catch (err) {
//       throw err;
//     }
//   };
