# Pug

- Pug is HTML template engine
- You can reduce the length of HTML
- You can dynamically generate the HTML
- Its former name is "Jade"
- Alternatives for pug:
  - Mustache
  - EJS
  - Jinja: for Python
  - Blade: for Laravel

## Pug + Vue.js

- You can use Pug in the `<template>` part of the `.vue`
- You don't have to learn most of the Pug features, because directives of Vue.js also do the same thing as Pug

## Installation

1. `npm install pug-cli -g`
  - This automatically install Pug itself as a dependency
1. `npm install`
1. `pug MY_FILE_NAME.pug`

## Basic

```pug
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript')
  body
    h1 Pug - node template engine
    #container.col
    div.
      Pug is a terse and simple templating language with a
      strong focus on performance and powerful features.


```
