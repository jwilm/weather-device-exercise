#!/usr/bin/env node

var net = require('net');
var Buffer = require('buffer').Buffer;

var phase = 0;
var socket = net.connect(3490, 'localhost', function (conn) {
  socket.on('data', function (buf) {
    switch (phase) {
      case 0:
        if (buf[0] === parseInt('de', 16) && buf[1] == parseInt('ad', 16)) {
          // Send response
          buf[0] = parseInt('be', 16);
          buf[1] = parseInt('ef', 16);
          socket.write(buf);

          // Query status
          var query = new Buffer(2);
          query[0] = parseInt('fe', 16);
          query[1] = parseInt('ed', 16);
          socket.write(query);
        }
        break;
      case 1:
        // got query response
        var temp = (buf[0] - 13) / 2;
        var hum = buf[1];
        var wind = buf[2];
        console.log('temperature', temp);
        console.log('humidity', hum);
        console.log('wind', wind);

        var quit = new Buffer(2);
        quit[0] = parseInt('ca', 16);
        quit[1] = parseInt('fe', 16);
        socket.write(quit);
        socket.end();
    }

    phase++;
  });
});
