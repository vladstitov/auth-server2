"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const login_api_1 = require("../login/login-api");
const fs = require("fs");
function initCommon(app) {
    app.get('/index', function (req, res) {
        let p = path.join(__dirname, '../../public', 'index.html');
        res.sendFile(p);
    });
    app.get('/api-info', function (req, resp) {
        let out = [];
        app._router.stack.forEach(function (r) {
            if (r.route && r.route.path) {
                out.push(r.route.path);
            }
        });
        login_api_1.router.stack.forEach(function (r) {
            if (r.route && r.route.path) {
                out.push(Object.keys(r.route.methods) + ':  /auth-client' + r.route.path);
            }
        });
        out.sort();
        resp.json(out);
    });
    app.get('/auth-client/api/get-config/:ver', function (req, resp) {
        const ver = Number(req.params.ver);
        const file = path.join(__dirname, '../../etc/app-config.json');
        fs.readFile(file, 'utf8', function (err, data) {
            if (err)
                resp.json({ error: 'no-file' });
            else {
                try {
                    const cfg = JSON.parse(data);
                    resp.json(cfg);
                }
                catch (e) {
                    resp.json({ error: 'parse-error', data: e });
                }
            }
        });
    });
}
exports.initCommon = initCommon;
