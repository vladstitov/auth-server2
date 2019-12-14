"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function initExtraData(app) {
    app.route('/api/public/get-squadrons')
        .get(function (req, resp) {
        const filepath = path.join(__dirname, '../../public/mocks/squadrons.json');
        resp.sendFile(filepath);
    });
}
exports.initExtraData = initExtraData;
