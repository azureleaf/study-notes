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
