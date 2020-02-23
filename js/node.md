# Node.jsとはなにか

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
    - BLAHBLAHの部分は、package.jsonで定義されたオプションを書く
- `npm init`

## Minor Commands

- `node server`
- `node --version`
    - Node.jsとnpmのバージョンを混同しないようにする。両者は当然別物なので
- `npm list -g --depth 0`
    - Show the globally installed npm packages
    - `--depth` option to omit the detailed dependencies of the each package
- `npm update PACKAGE_NAME`
    - Update the specified package

## Node.jsにデフォルトで付属するpackages

### `require('http')`


## Node.jsデフォルトではないが、一般的によく使われるpackages

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