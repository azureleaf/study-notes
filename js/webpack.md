# Webpackとは

## What's Webpack?

- バンドラである
    - 複数のJSファイルを一つにまとめる
    - CSSや画像もまとめる
- バンドラの必要性
    - 通信時のファイル取得高速化
    - 豊富なプラグインにより、トランスパイラやCSS系ツールなどと連携し自動化
    - 使用環境別にいろいろな出力ができる
- vue-cliは既に内部でwebpackを使用している
- 2020年１月だとversion 4

## plugins

- vue-loader
    - Convert .vue file into vanilla JS as "build.js"
- babel-loader
- sass-loader

## Keywords

### Module Bundler / Build Tool
- Webpack
- Browserify

### Transpiler
- Babel

### CSS Pre-processor
- sass
- scss
- less
- Stylus

### CSS Post-processor
- postcss
    - CSS Post-processorのデファクトスタンダード

### Others
- autoplexier
- gulp
- grunt
- bower
