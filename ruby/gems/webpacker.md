# Rails初心者学習帳：Railsにおけるアセット管理

Webpacker, Heroku Asset Pipeline, Sprocketあたりについて

## ToC

- [Rails初心者学習帳：Railsにおけるアセット管理](#rails初心者学習帳railsにおけるアセット管理)
  - [ToC](#toc)
  - [そもそもwebpackってなんだったっけ？](#そもそもwebpackってなんだったっけ)
  - [webpacker](#webpacker)
  - [Webpacker vs Sprockets](#webpacker-vs-sprockets)
  - [アセット処理関係のview helperは何をしているのか？](#アセット処理関係のview-helperは何をしているのか)
  - [webpackerとHeroku asset pipeline](#webpackerとheroku-asset-pipeline)
    - [Rails + Heroku + Amazon CloudFront](#rails--heroku--amazon-cloudfront)
  - [参考](#参考)

## そもそもwebpackってなんだったっけ？

- webpackは、Node.jsにおけるモジュールバンドラである。
- ファイル数が減るとリクエスト数が減るため、ページ表示の高速化やサーバーの負荷軽減につながる。
  - JSで `import`関係を順にたどって複数の `.js`ファイルを一つにまとめることができる。
  - JSファイルだけでなく、CSSや画像も少量のファイルにまとめることができる。
  - ただまとめるだけでなくファイルサイズを圧縮できる。
  - 出力先は`bundle.js`や`dist/main.js`などと命名することが多い。
  - エントリポイントは複数持てる。???
- JSはデフォルトで扱えるが、他のファイルのためにはそれぞれのloaderを`npm install`する必要がある。例えば：
  - `babel-loader @babel/core @babel/preset-env`: JSをトランスパイルする。
  - `css-loader` 
  - `sass-loader node-sass`
  - `style-loader`： CSSをDOMに注入する。
  - `stylus-loader stylus`
  - `ts-loader typescript`
  - `url-loader`：画像などをbase64エンコードで、JSファイルの中に埋め込む。
  - `vue-loader vue-template-compiler`
- `watch`モードを有効にすると、ファイル変更を検知して自動でWebpackを実行できる。しかも差分だけビルドしてくれるので速い。
- バージョンは、2021年1月現在Webpack 5系が最新である。
- `npm install webpack webpack-cli`
- `development`や`production`などのmodeがある。
  - `development`はソースマップ（元のソースファイルとバンドル後のファイルの関係）が有効になるため、デバッグがしやすくなる。
  - `production`ではファイルを圧縮するが、その処理の分時間がかかる。
- `webpack.config.js`で設定する。
- 各種のプラグインが提供されており、ビルドの内容を変更できる。
  - `SplitChunksPlugin`
  - `ContextReplacementPlugin`
  - `UglifyJSPlugin`
  - `IgnorePlugin`

## webpacker

- Webpackerはgemである。
- Webpackerはwebpackのラッパーである。
  - 例えば、Babel, CSS, SASS, ERBなどについてのローダー類は既定でインストールされている。
  - `webpack.config.js`で設定をいじるのは同じ。
- Rails 5.1 から標準搭載。
- 「バンドラ」といっても Bundler gemとは別物
  - BundlerはGemの依存関係とバージョンを管理できる。
  - `bundle install` で、gemのバージョンとかを考慮して依存関係を考えながらgemをインストールしてくれる。
  - `bundle exec rails` のようにすると、`Gemfile.lock`を考慮したgem versionを選択してくれる。複数バージョンのgemがインストールされてるときに問題になるようだ。

## Webpacker vs Sprockets

ここで、一つ疑問が生じます。[Railsガイド：アセットパイプライン](https://railsguides.jp/asset_pipeline.html)ではWebpackではなく Sprocketsという別のGemがほぼ同じことをしているということです。

## アセット処理関係のview helperは何をしているのか？

```erb
# application.erb
<%= stylesheet_link_tag "application", media: "all", "data-turbolinks-track": "reload" %>
<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>

# wicked pdf
<%= wicked_pdf_javascript_include_tag 'application' %>
<%= wicked_pdf_stylesheet_link_tag 'application' %>

```

## webpackerとHeroku asset pipeline

- webpackerがGemfileに含まれていると、Herokuは自動で`yarn`をインストールする。[Heroku公式記事](https://devcenter.heroku.com/changelog-items/1114)


- https://devcenter.heroku.com/articles/rails-asset-pipeline
  - アセットコンパイルのタイミングは、デプロイ時・ランタイム時のどちらも選択できる。

### Rails + Heroku + Amazon CloudFront 

- 参考：[Using Amazon CloudFront CDN](https://devcenter.heroku.com/articles/using-amazon-cloudfront-cdn#adding-cloudfront-to-rails)
- Heroku上でウェブサイトのパフォーマンスを高く維持するためには、必要な静的アセットは外部からCDNとして取得し、Herokuには動的コンテンツのみに専念させるべきです。このような用途だとAmazon S3は静的ファイルをホストするために使われているが、S3はファイル保存サービスであるのでパフォーマンスはよくない。（遅いってことか？）CDNのために設計されたAmazon CloudFrontを使うべきである。
- Cloud Frontでは、ユーザーとHeroku Serverの間にEdge Serverが介在する。
  - 一回目のリクエスト：ユーザがEdge Serverにアクセスし、Edge ServerがHeroku Serverからコンテンツ実体を取得しユーザに返す。
  - 二回目以降のリクエスト：　同じコンテンツがリクエストされた場合、Edge Serverは直接返すのではなく先ほどのリクエストでため込んだキャッシュから返す。これにより、これ以降のサイクルではHeroku Serverがわざわざ出なくて済む。
- RailsのHeroku AppからCloudFrontを使うには、以下の設定ファイルを変更するだけで利用できる。

```rb
# config/environments/production.rb
config.action_controller.asset_host = "<YOUR DISTRIBUTION SUBDOMAIN>.cloudfront.net"
```

- [RailsからMemcachedを使う方法](https://devcenter.heroku.com/articles/rack-cache-memcached-rails31)はより簡単だが、CloudFrontに比べるとパフォーマンスは落ちるらしい。
  - この方法では、

## 参考

- [Webpacker+Yarn+Sprocketsを十分理解してJavaScriptを書く](https://techracho.bpsinc.jp/hachi8833/2020_01_16/85940)
- https://www.fundely.co.jp/blog/tech/2020/01/22/180037/