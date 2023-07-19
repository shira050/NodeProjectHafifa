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
const maxBadRequest = process.env.MAX_SENDING || 10;

//create interval for rotate
if (intervalId) {
  clearInterval(intervalId);
}
intervalId = setInterval(async () => {
  await readAllFolderText();
}, 10000);

//function to algorithm
const isNum = (extentionStr) => {
  return /^\d+$/.test(extentionStr);
}

const getLastExeption = (file) => {
  return file.substring((file.lastIndexOf(".") + 1));
}

const renameFileByBadReqest = async (file) => {
  const lastExtension = getLastExeption(file);
  let countBadSend = 0;
  let newFileName = "";
  if (isNum(lastExtension&&lastExtension)) {
    countBadSend = (Number(lastExtension) + 1);
    newFileName = file.replace("." + lastExtension, "." + countBadSend);
  }
  else {
    countBadSend = 1;
    newFileName = file + "." + (countBadSend.toString());
  }
  await fs.renameSync(pathFolder + file, pathFolder + newFileName);
}
const renameFileDeleteCountReqest =  (file,lastExtension) => {
  if (isNum(lastExtension)) {
    return nameWithoutLastExtention = file.substring(0, (file.lastIndexOf(".")));  
  }
  return file;
}

const renameFileByCopy = async (file) => {
  let fileNameWithoutCount=renameFileDeleteCountReqest(file,getLastExeption(file))
  let text = await fsPromise.readFile(pathFolder + file.toString(), { encoding: 'utf-8' });
  let res = await axios.post(`${pathServerWriteFunction}write/${fileNameWithoutCount}`, { "content": text });
  console.log(res);
  if (res && res.status == 200) {
    copiedName = file.replace( getLastExeption(file), "copied");
    await fs.renameSync(pathFolder + file, pathFolder + copiedName);
  } else {
    console.log("copy error");
  }
}

const checkMaxRequestLimit = (file) => {
  const lastExtension = getLastExeption(file);
  if (isNum(lastExtension)) {
    console.log("num reqest: ", lastExtension, "from ", maxBadRequest);
    return Number(lastExtension) < maxBadRequest;
  }
  return true;
}
//main algorithm
const readAllFolderText = async () => {
  let currentFile;
  var files = await fs.readdirSync(pathFolder);
  const onlyFiles = files.filter(de => !de.isDirectory()).map(de => `${dirPath}/${de.name}`);
  await Promise.all(onlyFiles.map(async (file) => {
    try {
      currentFile = file;
      let extension = getLastExeption(file);
      if (extension != "copied" && checkMaxRequestLimit(file)) {
        await renameFileByCopy(file);
      }
    } catch (err) {
      console.log(err);
      await renameFileByBadReqest(currentFile);
    }
  }));
}

//router function-the same like main algorithm just 1 time
router.get("/readFolderFiles", (req, res) => {
  readAllFolderText(req, res);
})

module.exports = router;