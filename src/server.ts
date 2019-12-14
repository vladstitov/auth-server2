import * as path from 'path';
import * as express from 'express';
import * as _ from 'lodash';
import * as fs from 'fs';
const http = require('http');
const https = require('https');
// const debug = require('debug')('auth-server:server');

import {serverConfig} from './server-config';

const logger = require('morgan');

import {Application, Request, Response, NextFunction} from 'express';

const bodyParser: any = require('body-parser');
import {router as authRouter}  from './login/login-api';
import {testMysql} from './connectors/mysql-front';

const app: Application = express();
const server = http.createServer(app);

if(serverConfig.morgan.log) app.use(logger(serverConfig.morgan.log));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

testMysql();

///////////////////////////// ROUTES /////////////////////////////////
app.get('/index', function (req, res) {
  let p = path.join(__dirname, '../public', 'index.html');
//  console.log(p);
  res.sendFile(p);
});


app.get('/api-info', function (req, resp) {

  let out = [];
  app._router.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      out.push(r.route.path);
    }
  });
//   console.log(authRouter.stack);
  authRouter.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      out.push(Object.keys(r.route.methods) + ':  /auth-client' + r.route.path);
    }
  });
  out.sort();
  resp.json(out)
});

app.get('/auth-client/api/get-config/:ver', function (req, resp) {
  const ver = Number(req.params.ver);
  const file = path.join(__dirname, '../etc/app-config.json');
  fs.readFile(file,'utf8', function (err, data) {
    if(err) resp.json({error:'no-file'});
    else {
      try{
        const cfg = JSON.parse(data);
        //if(cfg.ver > ver)
          resp.json(cfg);
        //else resp.json({success:'success', message: 'YOU_ARE_GOOD'})
      } catch (e) {
        resp.json({error:'parse-error', data:e})
      }
    }
  });
});

app.use('/auth-client', authRouter);

//////////////////////////// end of ROUTES ///////////////////////////////////////////


var port = normalizePort(process.env.PORT || serverConfig.port);

server.listen(port, function () {
  console.log('Server now running on port: ' + server.address().port);
});

server.on('error', onError);
// server.on('listening', onListening);


//////////////////////////////// UTILS /////////////////////////////////////////////

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
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

  // handle specific listen errors with friendly messages
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

/**
 * Event listener for HTTP server "listening" event.
 */


/*function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
   debug('Listening on ' + bind);
}*/
