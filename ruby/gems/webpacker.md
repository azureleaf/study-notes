# Webpackerとはなにか

## webpackってなんだったっけ？

- webpackは、Node.jsにおけるモジュールバンドラ
  - モジュールバンドラとは、


- webpack.config 
- `bundle install`

## webpacker

- Rails 6 から標準になった。
  - ということは、Rails 5時代に書かれた記事で調べものをするとき注意が必要。
- 「バンドラ」といっても`bundler` gemとは別物
  - `bundle install` で、gemのバージョンとかを考慮して依存関係を考えながらgemをインストールしてくれる。
  - `bundle exec rails` のようにすると、`Gemfile.lock`を考慮したgem versionを選択してくれる。複数バージョンのgemがインストールされてるときに問題になるようだ。

## webpacker関係の

```sh
# wicked pdf
wicked_pdf_javascript_include_tag 'application'
wicked_pdf_stylesheet_link_tag 'application'    

# 
stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload'
javascript_pack_tag 'application', 'data-turbolinks-track': 'reload'
```

## webpackerとHeroku asset pipeline