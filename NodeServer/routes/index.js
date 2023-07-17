const express = require("express");
const { readFile, writeToFile } = require("../../js/tasks");
const router = express.Router();
const fs = require("fs");
require("dotenv").config;
const axios = require("axios");
const fsPromise = require('fs/promises')


let intervalId;
const pathFolder = process.env.FOLDER_URL || "C:/Users/Shira/Documents/nodeProject/NodeServer/public/";
const pathServerWriteFunction = process.env.EXSPRESS_SERVER_URL || "http://localhost:3000/";
let existFileArr = [];
if (intervalId) {
  clearInterval(intervalId);
}
intervalId = setInterval(async () => {
  debugger
  await readAllFolderText();
}, 10000);


router.get("/readFolderFiles", (req, res) => {
  readAllFolderText(req, res);
})
fs.readdirSync(pathFolder).forEach(async file => {
 existFileArr.push(file);
});
const readAllFolderText = async () => {
  
  debugger
  try {
    fs.readdirSync(pathFolder).forEach(async file => {
      if()
      let text = await fsPromise.readFile(pathFolder + file.toString(), { encoding: 'utf-8' });
      let result = await doApiMethod(pathServerWriteFunction + 'write/' + file, 'POST', { "content": text });
      console.log(result);
    });
  }
  catch {

  }
}

const doApiMethod = async (_url, _method, _body = {}) => {
  try {
    let resp = await axios({
      url: _url,
      method: _method,
      data: _body,
    });
    debugger
    return resp;
  } catch (err) {
    throw err;
  }
};
module.exports = router;