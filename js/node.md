# Node.js とはなにか

## Major Commands

- `npm install`
  - Install from both `dependencies` & `devDependencies`
- `npm install --production`
  - Install from `dependencies` list in the package.json
  - Does NOT install from `devDependencies`
- `npm install --save PACKAGE`
  - `--save`オプションは省略できるっぽい
  - Will be added to `dependencies` section in the package.json
- `npm install --save-dev PACKAGE`
  - Will be added to `devDependencies` section in the package.json
  - Packages which will be used for dev only (testing, logging, mock server, etc.)
- `npm update`
- `npm run BLAHBLAH`
  - BLAHBLAH の部分は、package.json で定義されたオプションを書く
- `npm init`

## Minor Commands

- `node server`
- `node --version`
  - Node.js と npm のバージョンを混同しないようにする。両者は当然別物なので
- `npm list -g --depth 0`
  - Show the globally installed npm packages
  - `--depth` option to omit the detailed dependencies of the each package
- `npm update PACKAGE_NAME`
  - Update the specified package

## `require('http')`

- Node.js のサーバー起動のコアとなるパッケージ
- 当然 Express.js でも使う
- 以下(app.js や server.js という名前にすることが多い)を`node app.js`すればサーバーが起動する

```js
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

// Instantiate the server
// createServer()のcallback関数は「request handler」と呼ばれる
// このサーバーにrequestがやってくるたびに、request handlerが実行される
// できあがったserver objectは、「EventEmitter object」である
const server = http.createServer((req, res) => {
  res.statusCode = 200; // 200 OK
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

// Listen to the request
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

```js
const http = require("http");

http
  .createServer((request, response) => {
    // requestから情報を取り出す
    // methodはGET, POSTとか
    // headersはobject literalになっている
    const { headers, method, url } = request;

    let body = [];

    // .on()というのはserver.on(), request.on()などあっちこちででてくる
    // これはEventEmitterクラスのメソッド
    // つまり、requestもserverもEventEmitter class
    // emitter.on(eventName, listener)の書式
    request
      .on("error", err => {
        console.error(err);
      })
      .on("data", chunk => {
        // "data" event
        body.push(chunk);
      })
      .on("end", () => {
        // "end" event
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        response.on("error", err => {
          // "error" event
          console.error(err);
        });

        // Note: the 2 lines below could be replaced with this next one:
        // response.writeHead(200, {'Content-Type': 'application/json'})
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");

        const responseBody = { headers, method, url, body };

        // Note: the 2 lines below could be replaced with this next one:
        // response.end(JSON.stringify(responseBody))
        response.write(JSON.stringify(responseBody));
        response.end();
      });
  })
  .listen(8080);
```

- server にイベントリスナーをくっつける
- これに限らず、on はイベントリスナーをくっつける際にどこでも使われるっぽい
  - server.on
  - request.on

```js
server.on("request", (request, response) => {
  // the same kind of magic happens here!
});
```

## `Event`

- `require("http")`すると、その内部でEventが使われている
- Event Emitterは特定のタイミングでイベントをemitする
  - Event emitter `net.Server` emits 
  - Event emitter `fs.ReadStream` emits when the file is opend
  - Event emitter `stream` emits when the data is ready to be read
- Event Listenerは紐付けられたEventがemitされると実行される

```js
const EventEmitter = require('events');

// All the Event Emitters inherit EventEmitter class
class MyEmitter extends EventEmitter {} 

// Instantiate event emitter
const myEmitter = new MyEmitter();

// Define Event name & Event listener
myEmitter.on('event', (a, b) => {
  console.log("Event occured! ", a, b, this); // a b {}
});

// Emit the event with args
myEmitter.emit('event', 'a', 'b');

```



### `require('cookie-parser')`

## Node.js 管理のための packages

### nodemon

### node-check-updates

### nvm

## Keywords

- npm
- yarn
- package.json
  - インストールされているパッケージの一覧
  - dependencies
- package-lock.json
- Node Docker Official Image
