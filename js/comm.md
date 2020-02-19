# JSでのサーバーとの通信あれこれ

## Keywords

- HTTP
- XHR
- Fetch API
- Ajax
- Axios
- Websocket
- Socket.io
- jQuery

## Duplex
- full-duplex (FDX)
    - Both parties can communicate with each other SIMULTANEOUSLY
    - eg. Telephone
- half-duplex (HDX)
    - Both parties can communicate with each other, but NOT SIMULTANEOUSLY
    - eg. Walkie-Talkie: You can transmit your voice while you push the button, but you can't hear the remote voice during that
- Simplex
    - One side always talk, another side always listen

## WebSocket

- Realtime Web Communication
    - Gaming
    - Chat / SNS
- WebSocket & HTTP
    - Both are on Layer 7 of OSI-Model
    - Both use TCP
    - With HTTP, every time you request the resource (HTML file, CSS file, image 1, image 2..), you need new connection
    - With WebSocket, you can send & receive multiple files over the single connection
- Full-duplex
- Established on single TCP connection
- `ws://` is not secure, `wss://` is secure


## Socket.io

- **Socket.io is NOT the implementation of WebSocket**
    - Socket.io may use WebSocket if possible, but it's not always required

- Check "network" tab of Google Chrome Developer's Tool
    - Type: Websocket
    - Request URL: ws://localhost:3000/socket.io

### Methods

```php
socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid

io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender

socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server

io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.
```
