# JS でのサーバーとの通信あれこれ

## ToC

1. [HTTP](#HTTP)
1. [Fetch](#Fetch)
1. [Axios](#Axios)
1. [XHR & Ajax](#XHR%20and%20AJAX)
1. [WebSocket](#WebSocket)
1. [Socket IO](#Socket%20IO)

## HTTP

- stateless

## Fetch

### What's fetch?

- As the name implied, `fetch()` API is used to get some resources
- Fetch is based on HTTP
- Fetch is based on Promise: fetch returns Promise
- Fetch is better version of XHR mechanism; fetch() can work with Service Worker

### Fetch vs Axios

- Both do the same thing; make the request & retrieve the response from the server
- Fetch uses `body` property to send data, while Axios uses `data` property
- JSON response in fetch is stringified
- URL: You write URL as the 1st arg in fetch, while you write URL in the object in Axios

### Fetch Example: Retrive JSON (simple)

- Syntax: `fetch(URI, REQUEST_OPTIONS)` (Options can be omitted)
- つまり、fetch()は受動的にデータをもらうだけではなく、**オプションを通じてこちらから POST request を送りその結果を受け取ることもできる**

```js
fetch("examples/example.json")
  .then(response => {
    return response.json(); // does this return Promise???
  })
  .then(data => {
    console.log("JSON fetched:", data);
  })
  .catch(error => {
    // Promise will NOT be rejected on HTTP error (e.g. 404, 500)
    // Promise will be rejected by network error, or user-defined error
    console.log("Looks like there was a problem: \n", error);
  });
```

### Fetch Example: Retrieve JSON (with so many request options)

- クイズへの回答を送信し、それに対するレスポンスをコールバック関数で`fetch()`で受け取る

```js
// Define the function
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

// Actually run the function
postData("https://example.com/answer", { answer: 42 }).then(data => {
  console.log(data); // JSON data parsed by `response.json()` call
});
```

### Access to resolved values of the fetch Promise

- response.body
  - A simple getter exposing a ReadableStream of the body contents
- response.bodyUsed
  - Stores a Boolean that declares whether the body has been used in a response yet
- response.headers
- response.ok
  - A Boolean indicating whether the response was successful or not
- response.redirected
  - Indicates whether or not the response is the result of a redirect
- response.status
- response.statusText
- response.type
- response.url
- response.json()
- response.text()
- response.formData()
- response.blob()
- response.arrayBuffer()

## Axios

- Basic Syntax

```js
// Create the instance
const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});
```

```js
// GET
axios
  .get("examples/example.json")
  .then(response => {
    // handle success
    console.log(response);
  })
  .catch(error => {
    // handle error
    console.log(error);
  });
```

```js
// POST
Axios.post("exampls.com", { text: "Success!" });
```

- Axios with request options:

```js
const options = {
  url: "http://localhost/test.htm",
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  },
  data: {
    a: 10,
    b: 20
  }
};

axios(options).then(response => {
  console.log(response.status);
});
```

## XHR and AJAX

- XML Http Request / Asynchronous JavaScript And XML
- XHR オブジェクトを使ってサーバーと通信する技術が Ajax
- 名前とは裏腹に、XHR で扱えるデータは XML に限らず JSON や HTML もいける
- Ajax は Google Map で導入されたときに話題となった。ページ全体を遷移することなく地図の部分のみ情報を更新していけるから

```js
// Instantiate the XHR Object
var xhr = new XMLHttpRequest();

// Register the handler
xhr.onreadystatechange = function() {
  switch (xhr.readyState) {
    case 0:
      // 未初期化状態.
      console.log("uninitialized!");
      break;
    case 1: // データ送信中.
      console.log("loading...");
      break;
    case 2: // 応答待ち.
      console.log("loaded.");
      break;
    case 3: // データ受信中.
      console.log("interactive... " + xhr.responseText.length + " bytes.");
      break;
    case 4: // データ受信完了.
      if (xhr.status == 200 || xhr.status == 304) {
        var data = xhr.responseText; // responseXML もあり
        console.log("COMPLETE! :" + data);
      } else {
        console.log("Failed. HttpStatus: " + xhr.statusText);
      }
      break;
  }
};
```

- Using the request

```js
xhr.open("POST", "http://{送信先URL}/post.php", false);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // Add header
xhr.send("hoge=piyo&moge=fuga"); // Send request to the server
xhr.abort(); // Cancel the request
```

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

## WebSocket

- HTTP と同様に Communication Protocol
- HTTP と違って Bidirectional であり、Full Duplex
- The server can't push data to the client with HTTP, while it's possible with WebSocket
- Therefore, when the server has some information update (e.g. The server got message for you from other client), you can't know that until you make a request to the server, while you can get update immediately with WebSocket
- HTTP は毎回 connection を作る（たぶん）のに対して、WebSocket は単一の TCP 接続を使いまわす
- Starting WebSocket
  |Client|Server|
  |--|--|
  |HTTP: Let's start websocket. Here's Sec-WebSocket-Key|||
  ||HTTP: OK|
  |WebSocket: 0x00 PAYLOAD 0xff||
  ||WebSocket: 0x00 PAYLOAD 0xff|
- When the client want to establish the WebSocket, the client add the header `Sec-WebSocket-Key`
  - This key just control the caching, not for security
- WebSocket

## Socket IO

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
