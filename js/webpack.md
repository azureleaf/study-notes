# Webpack

# ToC

- [Webpack](#webpack)
- [ToC](#toc)
- [What's Webpack?](#whats-webpack)
  - [Webpack is a bundler](#webpack-is-a-bundler)
  - [Why is a bundler necessary?](#why-is-a-bundler-necessary)
- [plugins](#plugins)
- [Tools Combinations](#tools-combinations)
  - [Module Bundler / Build Tool](#module-bundler--build-tool)
  - [Transpiler](#transpiler)
  - [CSS Pre-processor](#css-pre-processor)
  - [CSS Post-processor](#css-post-processor)
  - [Task Runner](#task-runner)

# What's Webpack?

## Webpack is a bundler

- 複数の JS ファイルを一つにまとめる
- CSS や画像もまとめる

## Why is a bundler necessary?

- 通信時のファイル取得高速化
- 豊富なプラグインにより、トランスパイラや CSS 系ツールなどと連携し自動化
- 使用環境別にいろいろな出力ができる
- Simpler HTML header
  - Without Webpack, you must list many `<script type="text/javascript" src="./node_modules/AAA/..."></script>`
  - With webpack, simply `<script type="text/javascript" src="./js/bundle.js"></script>`
- Webpack can do other things but bundling:
  - Start servers
- `vue-cli` internally uses Webpack
- version 4 is the latest as of Jan. 2020

# plugins

- vue-loader
  - Convert .vue file into vanilla JS as "build.js"
- babel-loader
- sass-loader

# Tools Combinations

Most commonly, use: Webpack + Gulp + Babel
- Gulp runs Webpack
- Webpack runs babel-loader

## Module Bundler / Build Tool

- Webpack
- Browserify

## Transpiler

- Babel

## CSS Pre-processor

- sass
- scss
- less
- Stylus

## CSS Post-processor

- postcss
  - de-facto standard for post-processor
- autoplexier

## Task Runner

- gulp
- grunt
