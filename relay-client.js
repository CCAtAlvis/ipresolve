const http = require('http');
const WebSocket = require('ws');

const wsHost = "wss://ipresolve.herokuapp.com";
const ws = new WebSocket(wsHost);

ws.on('open', () => {
  console.log('websocket is now open');
});

ws.on('message', (msg) => {
  const req = JSON.parse(msg);

  http.get("http://127.0.0.1:3000", (msg) => {
    let data = '';

    msg.on('data', (chunk) => {
      data += chunk;
    });

    msg.on('end', () => {
      ws.send(data);
    });

  });
});

// REQUEST OBJECT PROPERTIES
// _readableState
// readable
// _events
// _eventsCount
// _maxListeners
// socket
// connection
// httpVersionMajor
// httpVersionMinor
// httpVersion
// complete
// headers
// rawHeaders
// trailers
// rawTrailers
// aborted
// upgrade
// url
// method
// statusCode
// statusMessage
// client
// _consuming
// _dumped


// RESPONSE OBJECT PROPERTIES
// _readableState
// readable
// _events
// _eventsCount
// _maxListeners
// socket
// connection
// httpVersionMajor
// httpVersionMinor
// httpVersion
// complete
// headers
// rawHeaders
// trailers
// rawTrailers
// aborted
// upgrade
// url
// method
// statusCode
// statusMessage
// client
// _consuming
// _dumped
// req
