# Node.jsとはなにか

## Major Commands

- `npm install`
- `npm install --production`
- `npm install --save`
- `npm install --save-dev`
- `npm update`
- `npm run BLAHBLAH`
    - BLAHBLAHの部分は、package.jsonで定義されたオプションを書く

## Minor Commands

- `node server`
- `node --version`
    - Node.jsとnpmのバージョンを混同しないようにする。両者は当然別物なので
- `npm list -g --depth 0`
    - Show the globally installed npm packages
    - `--depth` option to omit the detailed dependencies of the each package
- `npm update PACKAGE_NAME`
    - Update the specified package

## Node.js自体に関係が深いライブラリ

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