"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(cors());
app.set('port', (process.env.PORT || 50000));
app.use(express.static(path.join(__dirname, '../pub')));
app.get('/get-config/:ver', function (req, resp) {
    const ver = Number(req.params.ver);
    const file = path.join(__dirname, '../etc/config.json');
    fs.readFile(file, 'utf8', function (err, data) {
        if (err)
            resp.json({ error: 'no-file' });
        else {
            try {
                const cfg = JSON.parse(data);
                if (cfg.ver > ver)
                    resp.json(cfg);
                else
                    resp.json({ success: 'success', message: 'YOU_ARE_GOOD' });
            }
            catch (e) {
                resp.json({ error: 'parse-error', data: e });
            }
        }
    });
});
app.listen(app.get('port'), function () {
    console.log('Server now running on port: ' + app.get('port'));
});
