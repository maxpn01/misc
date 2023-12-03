const fs = require("fs");
const crypto = require("node:crypto");
const files = fs.readdirSync("files");

const filesData = files.map(file => {
    try {
        const data = fs.readFileSync(`files/${file}`);
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
    
});

const sha3_256 = (s) => crypto.createHash('sha3-256').update(s).digest("hex");
const hashedFiles = filesData.map(file => sha3_256(file));
const sortedHashedFiles = hashedFiles.sort();
const joinedSortedHashes = sortedHashedFiles.join("");
const concatenatedStrings = joinedSortedHashes + "maxim.padalkin.p@gmail.com";
const result = sha3_256(concatenatedStrings);

console.log(result);