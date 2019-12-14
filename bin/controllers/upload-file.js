"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const moment = require("moment");
const path = require("path");
const user_files_model_1 = require("../seq-models/user-files-model");
const move_file_1 = require("../utils/move-file");
const app_utils_1 = require("../utils/app-utils");
const IncomingForm = require('formidable').IncomingForm;
async function moveAndInsert(files, userId, belongs) {
    const move = await move_file_1.moveFiles(files);
    const toInsert = files.map(function (item) {
        return {
            user_id: userId,
            belongs: belongs,
            status: 'uploded',
            path: item.newPath,
            filename: item.webPath,
            webPath: item.webPath
        };
    });
    return user_files_model_1.PersonFilesModel.bulkCreate(toInsert);
}
function savePersonalFiles(req, resp, userId, belongs) {
    const userFolder = 'users-files/' + userId;
    const uploadedFiles = [];
    const userFolderPath = path.join(__dirname, '../../public/' + userFolder);
    fs.ensureDir(userFolderPath, (err) => {
        if (err) {
            resp.json(err);
            return;
        }
        var form = new IncomingForm();
        form.on('file', (field, file) => {
            const newFilename = moment().valueOf() + '_' + file.name.substr(-10);
            uploadedFiles.push({
                path: file.path,
                webPath: userFolder + '/' + newFilename,
                newPath: path.join(userFolderPath + '/' + newFilename)
            });
        });
        form.on('end', () => {
            moveAndInsert(uploadedFiles, userId, belongs).then(res => {
                resp.json(res);
            }).catch(err => app_utils_1.onProcessError(req, resp, err));
        });
        form.parse(req);
    });
}
exports.savePersonalFiles = savePersonalFiles;
function initUploadFiles(app) {
    app.post('/api/private/staff/:userId/:belongs', function (req, resp) {
        const userId = Number(req.params.userId);
        const belongs = req.params.belongs;
        if (!userId || !belongs) {
            resp.json({ error: 'userid', message: 'user id should be a number and belongs string' });
            return;
        }
        savePersonalFiles(req, resp, userId, belongs);
    });
}
exports.initUploadFiles = initUploadFiles;
