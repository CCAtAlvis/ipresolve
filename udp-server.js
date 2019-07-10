const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const MESSAGE = Buffer.from('PONG');
const SOUR_PORT = 41234;
let DEST_PORT = 0;
let DEST_HOST = '';

socket.bind(SOUR_PORT);

socket.on('listening', () => {
  console.log('listening for incoming messages...');
});

socket.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  DEST_PORT = rinfo.port;
  DEST_HOST = rinfo.address;

  socket.send(MESSAGE, DEST_PORT, DEST_HOST, (err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('PONG SENT');
    }
  })
});
