const http = require('http');
const WebSocket = require('ws');

const port = 8080;

let socket;
let requestId = 0;

let responses = {};

const httpServer = (req, _res) => {
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
  responses[requestId] = _res;
  requestId++;

  // console.log({ request });

  socket.send(JSON.stringify(request));

  socket.on('message', (msg) => {
    try {
      const incomingRes = JSON.parse(msg);
      const res = responses[incomingRes.reqId];
      // console.log({ incomingRes });
      // console.log({ res });
      if (incomingRes.type === 'headers') {
        res.statusCode = incomingRes.statusCode;
        res.statusMessage = incomingRes.statusMessage;

        for (let k in incomingRes.headers) {
          // console.log(k, incomingRes.headers[k]);
          res.setHeader(k, incomingRes.headers[k]);
        }
      } else if (incomingRes.type === 'body') {
        res.write(incomingRes.data);
      } else if (incomingRes.type === 'end') {
        res.end();
      }
    } catch (err) {
      console.log(err);
      res.end('hi');
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
});


server.listen(port, () => { console.log('server started'); });
