# Rails初心者学習帳：Railsにおけるアセット管理

Webpacker, Heroku Asset Pipeline, Sprocketあたりについて

## ToC

- [Rails初心者学習帳：Railsにおけるアセット管理](#rails初心者学習帳railsにおけるアセット管理)
  - [ToC](#toc)
  - [そもそもwebpackってなんだったっけ？](#そもそもwebpackってなんだったっけ)
    - [各種のプラグインが提供されており、ビルドの内容を変更できる。](#各種のプラグインが提供されておりビルドの内容を変更できる)
  - [webpacker](#webpacker)
  - [Webpackerのインストール](#webpackerのインストール)
  - [Sprocketsの挙動](#sprocketsの挙動)
  - [Webpacker vs Sprockets](#webpacker-vs-sprockets)
  - [アセット処理関係のview helperは何をしているのか？](#アセット処理関係のview-helperは何をしているのか)
    - [Sprockets向けのヘルパー](#sprockets向けのヘルパー)
    - [Webpacker向けのヘルパー](#webpacker向けのヘルパー)
    - [Wicked PDF関係](#wicked-pdf関係)
  - [Webpacker + Heroku](#webpacker--heroku)
  - [webpackerとHeroku asset pipeline](#webpackerとheroku-asset-pipeline)
    - [Rails + Heroku + Amazon CloudFront](#rails--heroku--amazon-cloudfront)
  - [参考](#参考)

## そもそもwebpackってなんだったっけ？

- webpackは、Node.jsにおけるモジュールバンドラである。
- ファイル数が減るとリクエスト数が減るため、ページ表示の高速化やサーバーの負荷軽減につながる。
  - JSでエントリポイント（モジュール依存関係を探す起点）から `import`関係をたどって連結し、複数の `.js`ファイルを一つ（packと呼ばれる）にまとめることができる。
  - まとめる対象はJSファイルだけでなく、CSS、画像、フォントファイルなどにも及ぶ。
  - ただまとめるだけでなくファイルサイズを圧縮することもできる。（minification）
  - 出力先は`bundle.js`や`dist/main.js`などと命名することが多い。
- `webpack.config.js`で設定する。
- 入力ファイルや出力ファイルを複数持たせる場合もある。
  - 複数エントリポイントから単一のファイルに出力：　`webpack.config.js`の`entry`項目で、入力元を「配列」として複数指定する。（[参考](https://webpack.js.org/concepts/entry-points/#single-entry-shorthand-syntax)）
  - 複数エントリポイントのそれぞれを別個のファイルに出力：　`webpack.config.js`の`entry`項目で、入力元を「辞書」として複数指定する。（[参考](https://webpack.js.org/concepts/output/#multiple-entry-points)）
- JSはデフォルトで扱えるが、他のアセットをモジュール化するためには「loader」というツールが必要になる。
- loaderは`npm install`する必要がある。代表的なローダーとしては以下がある。
  - `babel-loader @babel/core @babel/preset-env`: JSをトランスパイルする。
  - `css-loader`
  - `sass-loader node-sass`
  - `style-loader`： CSSをDOMに注入する。
  - `stylus-loader stylus`
  - `ts-loader typescript`
  - `url-loader`：画像などをbase64エンコードで、JSファイルの中に埋め込む。
  - `vue-loader vue-template-compiler`
- `watch`モードを有効にすると、ファイル変更を検知して自動でWebpackを実行できる。しかも差分だけビルドしてくれるので速い。(webpack-dev-server)
- バージョンは、2021年1月現在Webpack 5系が最新である。
- `npm install webpack webpack-cli`
- `development`や`production`などのmodeがある。
  - `development`はソースマップ（元のソースファイルとバンドル後のファイルの関係付け）が有効になるため、デバッグがしやすくなる。
  - `production`ではファイルを圧縮するが、その処理の分時間がかかる。

### 各種のプラグインが提供されており、ビルドの内容を変更できる。

主要プラグインの紹介は、[Qiita: webpack初級者から中級者にステップアップするために理解しておきたいプラグインまとめ](https://qiita.com/R-Yoshi/items/30282dee7b6d5ddd6622)に詳しい。

- `SplitChunksPlugin`:　
  - たとえば、複数の入力元JSファイルを複数ファイルに出力したときに問題になるのが、入力元ファイルで共通で使用しているファイルなどが重複してしまい、ファイルサイズが大きくなること。
  - たとえば、`lodash`や`jQuery`などのメジャーなライブラリはどこでも使われるので、重複しがちになる。
  - このプラグインは共通に依存する部分を別ファイルとして切り出し、バンドル済みファイルが各自その別ファイルから呼び出すようにしてくれるので効率がよくなる。
  - 参考：[Webpack公式](https://webpack.js.org/guides/code-splitting/) / [Qiita記事](https://qiita.com/soarflat/items/1b5aa7163c087a91877d)
- `ContextReplacementPlugin`
- `UglifyJSPlugin`
- `IgnorePlugin`

## webpacker

- Webpackerはgemである。
- Webpackerはwebpackのラッパーである。
  - 例えば、Babel, CSS, SASS, ERB、画像などのローダーは既定でインストールされている。
  - View側でパック済みのアセットを利用するのに必要なヘルパー類もWebpackerが提供する。
- Rails 5.1 から標準搭載。
- 「バンドラ」といっても Bundler gemとは別物
  - BundlerはGemの依存関係とバージョンを管理できる。
  - `bundle install` で、gemのバージョンとかを考慮して依存関係を考えながらgemをインストールしてくれる。
  - `bundle exec rails` のようにすると、`Gemfile.lock`を考慮したgem versionを選択してくれる。複数バージョンのgemがインストールされてるときに問題になるようだ。

## Webpackerのインストール

```sh

# A. 新規プロジェクト生成時に追加
rails new myapp --webpack

# B. 既存のプロジェクトに追加
gem 'webpacker', '~> 6.x'
bundle install

# webpackerのインストール
bundle exec rails webpacker:install
```

## Sprocketsの挙動

- [Railsガイド：アセットパイプライン](https://railsguides.jp/asset_pipeline.html)
- アセットパイプラインとは、JS・画像・CSSなどのアセットを入力にとり、それを変更して出力する一連の処理のこと。
  - なのでWebpackもSprocketsもどちらもアセットパイプライン
-

## Webpacker vs Sprockets

ここで、一つ疑問が生じる。WebpackerとSprocketsがほぼ同じことをしている点だ。この疑問を持っているのは僕だけではないようで、Webで記事が見つかる。

[Qiita: Ruby on Rails で sprockets から Webpacker へ移行し、移行できないものは共存させる方法](https://qiita.com/tatsurou313/items/645cbf0a3af4c673b5df)


[Webpacker+Yarn+Sprocketsを十分理解してJavaScriptを書く：前編（翻訳）](https://techracho.bpsinc.jp/hachi8833/2020_01_16/85940) /
[Webpacker+Yarn+Sprocketsを十分理解してJavaScriptを書く：後編（翻訳）](https://techracho.bpsinc.jp/hachi8833/2020_01_17/85943)



## アセット処理関係のview helperは何をしているのか？

### Sprockets向けのヘルパー

```erb
# application.erb
<%= stylesheet_link_tag "application", media: "all", "data-turbolinks-track": "reload" %>
<%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
```

- ちなみに上記のカスタムデータ属性（`data-`ではじまるHTML5の任意の属性）の`turbolink`というのはAjaxを利用してページ遷移を高速化するためのgemで、Rails 4以降は標準装備されている。上記の記述は、ページ遷移時に参照するJSやCSSが変化したか確認し、変化する場合にははreloadする。

### Webpacker向けのヘルパー

```erb
# application.erb
<%= stylesheet_pack_tag "application", media: "all", "data-turbolinks-track": "reload" %>
<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
```


- `stylesheet_link_tag`で、`app/javascript/packs/`内のCSS系のパックを利用する。
- `javascript_link_tag`で、`app/javascript/packs/`内のJS系のパックを利用する。
- 上記では、`app/javascript/packs/application.sass`及び``app/javascript/packs/application.js`をそれぞれ参照している。
  - デフォルトのwebpackerはCSSを別ファイルとして分離するので、このようにあるJSに対して同名のCSSのpackも記述するのはよく見られる。

### Wicked PDF関係

- 業務上でwicked_pdfを使う必要があったので。

```erb
# wicked pdf
<%= wicked_pdf_javascript_include_tag 'application' %>
<%= wicked_pdf_stylesheet_link_tag 'application' %>
<%= wicked_pdf_image_tag 'mysite.jpg' %>
```

## Webpacker + Heroku



- [公式：Getting Started on Heroku with Rails 6.x](https://devcenter.heroku.com/articles/getting-started-with-rails6)
- [公式：](https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server)
- [公式：]()
- [公式：]()
- [公式：]()
- [公式：]()
- [公式：Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)

参考：[Rails 6+Webpacker開発環境をJS強者ががっつりセットアップしてみた（翻訳）](https://techracho.bpsinc.jp/hachi8833/2019_11_28/83678)




## webpackerとHeroku asset pipeline

- Heroku上では、production.rbの設定が適用される。
  -
- webpackerがGemfileに含まれていると、Herokuは自動で`yarn`をインストールする。[Heroku公式記事](https://devcenter.heroku.com/changelog-items/1114)


- https://devcenter.heroku.com/articles/rails-asset-pipeline
  - アセットコンパイルのタイミングは、デプロイ時・ランタイム時のどちらも選択できる。

- https://devcenter.heroku.com/articles/rails-4-asset-pipeline
-

### Rails + Heroku + Amazon CloudFront

- 参考：[Using Amazon CloudFront CDN](https://devcenter.heroku.com/articles/using-amazon-cloudfront-cdn#adding-cloudfront-to-rails)
- Heroku上でウェブサイトのパフォーマンスを高く維持するためには、必要な静的アセットは外部からCDNとして取得し、Herokuには動的コンテンツのみに専念させるべきである。このような用途だとAmazon S3は静的ファイルをホストするために使われているが、S3はファイル保存サービスであるのでパフォーマンスはよくない（遅いってことか？）。CDNの用途に設計されたAmazon CloudFrontを使うべきである。
- Cloud Frontでは、ユーザーとHeroku Serverの間にEdge Serverが介在する。
  - 一回目のリクエスト：ユーザがEdge Serverにアクセスし、Edge ServerがHeroku Serverからコンテンツ実体を取得しユーザに返す。
  - 二回目以降のリクエスト：　同じコンテンツがリクエストされた場合、Edge ServerはHeroku Serverから再取得するのではなく先ほどのリクエストでため込んだキャッシュから返す。これにより、これ以降のサイクルではHeroku Serverがわざわざ出なくて済む。
- RailsのHeroku AppからCloudFrontを使うには、以下の設定ファイルを変更するだけで利用できる。

```rb
# config/environments/production.rb
config.action_controller.asset_host = "<YOUR DISTRIBUTION SUBDOMAIN>.cloudfront.net"
```

- [RailsからMemcachedを使う方法](https://devcenter.heroku.com/articles/rack-cache-memcached-rails31)はより簡単だが、CloudFrontに比べるとパフォーマンスは落ちるらしい。
  - この方法では、

## 参考

- https://www.fundely.co.jp/blog/tech/2020/01/22/180037/