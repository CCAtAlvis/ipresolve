const http = require('http');
const WebSocket = require('ws');

const hostname = '127.0.0.1';
const port = 80;

let socket;

const httpServer = (req, res) => {
  console.log("Incomming request");

  const keys = [
// "readable",
// "socket",
// "connection",
"httpVersionMajor",
"httpVersionMinor",
"httpVersion",
"complete",
"headers",
"rawHeaders",
"trailers",
"rawTrailers",
"aborted",
"upgrade",
"url",
"method",
"statusCode",
"statusMessage",
// "client",
  ];

  let request = {};
  for (let i in keys) {
    const key = keys[i];

    request[key] = res[key];
  }

  socket.send(JSON.stringify(request));

  socket.on('message', (msg) => {
    res.end(msg);
  });
};

const server = http.createServer(httpServer);
const wss = new WebSocket.Server({'server': server});

wss.on('connection', (ws) => {
  socket = ws;
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});