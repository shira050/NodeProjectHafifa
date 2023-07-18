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

if (intervalId) {
  clearInterval(intervalId);
}
intervalId = setInterval(async () => {
  debugger
  await readAllFolderText();
}, 10000);

//let isProcessing = false; // Flag to track if readAllFolderText() is currently running

// async function intervalFunction() {
//   if (!isProcessing) {
//     isProcessing = true;
//     try {
//       debugger;
//       await readAllFolderText();
//     } catch (error) {
//       // Handle any errors that occur during readAllFolderText()
//     } finally {
//       isProcessing = false;
//     }
//   }
// }

//  intervalId = setInterval(intervalFunction, 10000);



const readAllFolderText = async () => {

  debugger
  try {
    fs.readdirSync(pathFolder).forEach(async file => {
      let extension = file.substring(file.lastIndexOf("."));
      console.log(extension);
      if (extension != ".copied") {
        debugger
        let text = await fsPromise.readFile(pathFolder + file.toString(), { encoding: 'utf-8' });
        // let resWriteFile =
         await doApiMethod(pathServerWriteFunction + 'write/' + file, 'POST', { "content": text });
      //   console.log(resWriteFile);
      //  if(resWriteFile){
        let copiedName = file + ".copied";
        await fs.renameSync(pathFolder + file, pathFolder + copiedName);
        console.log(file);
      //  }
      }
    });
  }
  catch (err) {
    console.log(err + "axios error- file already exist");
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
    // return err
    // console.error(err);
    throw err
  }
};
router.get("/readFolderFiles", (req, res) => {
  readAllFolderText(req, res);
})
module.exports = router;