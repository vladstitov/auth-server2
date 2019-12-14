"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
async function moveFiles(files) {
    return await files.map(function (item) {
        return moveFile(item.path, item.newPath);
    });
}
exports.moveFiles = moveFiles;
async function moveFile(oldPath, newPath) {
    return new Promise(function (resolve, reject) {
        fs.move(oldPath, newPath, err => {
            if (err) {
                reject(err);
            }
            else
                resolve(newPath);
        });
    });
}
exports.moveFile = moveFile;
