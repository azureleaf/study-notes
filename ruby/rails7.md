# What's New with Rails 7

## Major Change

- ES6 is supported by most browsers.
- HTTP2.0
- Importmap for Rails

## Minor Changes


## Notable Gems

Major

- turbo-rails
- stimulus-rails
- sprockets-rails
- importmap-rails (dependencies)

Minor

- cssbuilding-rails (optional): Asset pipeline + CSS
- tailwindcss-rails: `rails new myapp -c tailwind`: tailwind, bootstrap, bulma
- foreman
- propshaft (optional): Alternative for sprockets-rails gem: `rails new myapp -a propshaft`
- jsbuilding-rails (optional?): `rails new myapp -j esbuild`: esbuild, rollup.js, webpack

## Kept Gems

- jbuilder
- zeitwerk (dependencies): Autoloader. Now classic mode is omitted
- puma
- bootsnap
- capybara
- tzinfo-data
- web-console
- webdrivers
- selenium-webdriver

## Removed Gems

- turbolinks
- webpacker
- spring: Because accerelation by Spring isn't so significant on recent fast computers.
- sass-rails: Because SASS is less used these days.
- byebug: Now Rails 7 uses Ruby default "debug" gem


## Turbo

### form submission

### Frame

### Stream


## Stimulus



