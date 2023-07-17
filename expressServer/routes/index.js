const express = require("express");
const { readFile, writeToFile } = require("../../js/tasks");
const router = express.Router();


router.get("/", (req, res) => {
  res.status(200).json({ msg: "index 3000 work" })
})
router.post("/read/readMultipleFiles", async (req, res) => {debugger
  if (!req.body.arr) {
    res.status(400).json({ msg: "you have to send arr with pethes" })
  }
  let allFilesText = []; debugger
  for (let index = 0; index < req.body.arr.length; index++) {
    debugger
    const currentFilePath = req.body.arr[index];
    allFilesText[index] = (await readFile(currentFilePath));

  }
  res.status(200).json({ msg: allFilesText })
})
router.get("/read/:filePath([\\w \\W]+)", async (req, res) => {
  debugger
  let filePath = req.params.filePath;
  console.log(filePath);
  let fileText = await readFile(filePath);
  res.status(200).json({ msg: fileText })
})

router.post("/write/:filePath([\\w \\W]+)", async (req, res) => {
  debugger
  let filePath = req.params.filePath;
  let content = req.body.content;
  const path = 'C:/Users/Shira/Documents/nodeProject/expressServer/public/';
//  const path = process.env.EXSPRESS_SERVER_URL || "http://localhost:3000/public";
  let resFileText = await writeToFile(path+filePath, content);
  console.log(resFileText);
  resFileText && res.status(200).json({ msg: resFileText })
  res.status(400).json({ msg: "file already exist!" })
})
module.exports = router;