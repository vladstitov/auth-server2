"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const fs = require("fs");
const http = require('http');
const https = require('https');
const debug = require('debug')('auth-server:server');
const server_config_1 = require("../etc/server-config");
const logger = require('morgan');
const bodyParser = require('body-parser');
const login_api_1 = require("./login/login-api");
const mysql_front_1 = require("./connectors/mysql-front");
const app = express();
const server = http.createServer(app);
if (server_config_1.serverConfig.morgan.log)
    app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.get('/index', function (req, res) {
    let p = path.join(__dirname, '../public', 'index.html');
    res.sendFile(p);
});
app.get('/api-info', function (req, resp) {
    let out = [];
    app._router.stack.forEach(function (r) {
        out.push(r.route.path);
    });
    out.sort();
    resp.json(out);
});
app.get('/auth-client/api/get-config/:ver', function (req, resp) {
    const ver = Number(req.params.ver);
    const file = path.join(__dirname, '../etc/app-config.json');
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
mysql_front_1.testMysql();
app.use('/auth-client', login_api_1.router);
var port = normalizePort(process.env.PORT || server_config_1.serverConfig.port);
server.listen(port, function () {
    console.log('Server now running on port: ' + server.address().port);
});
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
}
function apiErrorHandler(err, req, res, next) {
    console.error("API error handler triggered", err);
    res.status(500).json({ errorCode: 'ERR-001-Vlad',
        message: 'Internal Server Error' });
}
