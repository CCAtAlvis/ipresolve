const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const MESSAGE = Buffer.from('Some byte');
const DEST_PORT = 41234;
const DEST_HOST = 'ipresolver.eastus.cloudapp.azure.com';
const SOUR_PORT = 9999;

socket.bind(SOUR_PORT, () => {
  socket.send(MESSAGE, DEST_PORT, DEST_HOST, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('message sent');
    }
  });
});

socket.on('listening', () => {
  console.log('listening for in comming messages');
});

socket.on('message', (msg, rinfo) => {
  console.log(`I got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  // socket.send(MESSAGE, DEST_PORT, DEST_HOST, (err) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log('PING SENT');
  //   }
  // });
});

// payload = payload.toString('hex');
// const ihl = parseInt(payload[1], 16);
// let packet = {
//     version : payload[0],
//     ihl : payload[1],
//     dscp_and_ecn : payload.substring(2,4),
//     length : payload.substring(4,8),
//     identification : payload.substring(8,12),
//     flags_and_offset : payload.substring(12,16),
//     ttl : payload.substring(16,18),
//     protocol : payload.substring(18,20),
//     header_checksum : payload.substring(20,24),
//     sourceIP : payload.substring(24, 32),
//     destinationIP : payload.substring(32, 40),
//     options : payload.substring(40, ihl*8),
//     data : payload.substring(ihl*8)
// }
