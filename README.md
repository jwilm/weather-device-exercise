Socket Bytes Challenge
======================

Aimed at beginner programmers needing to learn about byte manipulation and
sockets programming, this service emulates a weather device with a simple
protocol.

## Usage
Clone the project and run make. The code will build and run. Solve the puzzle
in your favorite language. The server will be available on port 3490.

## Protocol
Upon connection, the server will send the number `0xDEAD`. Any client wishing
to communicate further must reply with `0xBEEF` or the service will terminate
the connection. At this point, the server will enter a receive-send loop. Valid
commands are now `0xCAFE` to end the session cleanly and `0xFEED` to get the
"device status".

The device status is a 3 byte structure specifying the temperature, humidity,
and wind speed. The temperature is stored in the first byte as `(temp * 2) +
13`. Humidity is stored in the second byte to be interpreted as a percentage,
and the wind speed is in the third byte as integer mph.

## Credits
Thanks to Beej for his invaluable [networking guide][networking_guide].
Whenever starting a C project needing a simple TCP server I start with the
guide's `server.c` example to cover all the boilerplate.

[networking_guide]: http://beej.us/guide/bgnet/output/html/singlepage/bgnet.html
