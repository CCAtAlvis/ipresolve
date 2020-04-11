const http = require('http');
const WebSocket = require('ws');

const hostname = 'localhost';
const port = 8080;

let socket;
let requestId = 0;

const httpServer = (req, res) => {
  console.log("Incomming request");

  const keys = [
    // "readable",
    // "socket",
    // "connection",
    // "httpVersionMajor",
    // "httpVersionMinor",
    // "httpVersion",
    // "complete",
    "headers",
    // "rawHeaders",
    // "trailers",
    // "rawTrailers",
    // "aborted",
    // "upgrade",
    "url",
    "method",
    // "statusCode",
    // "statusMessage",
    // "client",
  ];

  let request = {};
  for (let i in keys) {
    const key = keys[i];

    request[key] = req[key];
    // console.log(key, ":", req[key]);
  }
  request.type = 'request';
  request.reqId = requestId;
  requestId++;
  // console.log({ request });

  socket.send(JSON.stringify(request));

  socket.on('message', (msg) => {
    try {
      const incomingRes = JSON.parse(msg);
      console.log(incomingRes);
      if (msg.type === 'headers') {
        res.statusCode = incomingRes.statusCode;
        res.statusMessage = incomingRes.statusMessage;

        for (let k in incomingRes.headers) {
          // console.log(k, incomingRes.headers[k]);
          res.setHeader(k, incomingRes.headers[k]);
        }
      } else {
        res.write(incomingRes.data);
        res.end();
      }
    } catch (err) {
      console.log(err);
    }
  });
};

const server = http.createServer(httpServer);
const wss = new WebSocket.Server({ 'server': server });

let clientId = 0;

wss.on('connection', (ws) => {
  console.log('client connected');
  socket = ws;

  ws.send(JSON.stringify({ clientId: clientId }));
  clientId++;

  // ws.on('message', (msg) => console.log(msg));
});


server.listen(port, () => {
  console.log('server started');
});
