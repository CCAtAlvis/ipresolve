const dgram = require('dgram');
const message = Buffer.from('Some byte fgfksbdgkfhvk akffskd fsfjk bsfsbdfs bsjdvfb skcb');
const client = dgram.createSocket('udp4');

const PORT = 41234;
const HOST = 'ipresolver.eastus.cloudapp.azure.com';

client.send(message, PORT, HOST, (err) => {
  client.close();
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
