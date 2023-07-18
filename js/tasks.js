const fs = require('fs')



const file1 = "C:/Users/Shira/Documents/nodeProject/assets/fileTextExam1.txt";
const file2 = "C:/Users/Shira/Documents/nodeProject/assets/fileTextExam2.txt";

const isEven = (num) => {
    return num % 2 == 0;
}

const is2numeEven = (_x, _y) => {
    return isEven(_x) && isEven(_y);
}
const is2numeEvenOneCom = (_x, _y) => {
    is2numeEven(_x, _y);
}
exports.readFile = async (_path) => {
    return await fs.readFile(_path, { encoding: 'utf-8' });
};
exports.writeToFile = async (_path, _content) => {
    // if(fs.existsSync(_path))
    // return null;TODO
    try {
        await fs.writeFileSync(_path, _content, { encoding: 'utf8', flag: 'w', overwrite: false });
        return _path;
    } catch (error) {
        return null;
    }
};

const readFileWithoutAwait = async (_fileRef) => {
    return await readFile(_fileRef);
}
const readFileWithoutAsynch = async (_fileRef) => {
    return await readFile(_fileRef);
}
const append2Files = async (_fileRef1, _fileRef2) => {
    let textFile1 = await readFile(_fileRef1);
    let textFile2 = await readFile(_fileRef2);
    return textFile1 + "/n" + textFile2;
}



const init = async () => {

    console.log("1:", is2numeEven(2, 4));
    console.log("2:", is2numeEvenOneCom(1, 2));
    console.log("3:", await readFile(file1));
    console.log("4:", await readFileWithoutAwait(file1));
    console.log("5:", await readFileWithoutAsynch(file2));
    console.log("6:", await append2Files(file1, file2));
}

// init();

//console.log(readFile(file1))

// module.exports = { readFile };
// module.exports = { writeToFile };