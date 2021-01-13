# Wicked PDF

- wkhtmltopdf: Qt Webkit レンダリングエンジンを利用してHTMLからPDFに変換するコマンドラインツール。コンパイル済みのバイナリファイルが配布されている。
- wicked_pdf: wkhtmltopdfを利用してHTML+CSSのウェブページを、そのままPDFに変換するラッパーである。このため、wicked_pdfのgemに加えて、wkhtmltopdfのバイナリ自体もダウンロード（gemとしても提供されている）が必要。
- 以下ではどんな機能があるか抜粋する。詳細は[公式のREADME](https://github.com/mileszs/wicked_pdf)を参照。

## ToC

- [Wicked PDF](#wicked-pdf)
  - [ToC](#toc)
  - [Install](#install)
  - [PDFに使うアセットの扱い](#pdfに使うアセットの扱い)
  - [詳細設定](#詳細設定)
  - [Troubleshooting: Heroku上でslug size激増問題](#troubleshooting-heroku上でslug-size激増問題)

## Install

```sh
echo "gem 'wicked_pdf'" >> Gemfile
bundle install

# Generate initializer
rails generate wicked_pdf

echo "gem 'wkhtmltopdf-binary'" >> Gemfile
bundle install
```



## PDFに使うアセットの扱い

- wkhtmltopdfにPDFに使うアセットを伝えるためには、wicked_pdfのヘルパーを利用する。

```html
<!doctype html>
<html>
  <head>
    <meta charset='utf-8' />
    <%= wicked_pdf_stylesheet_link_tag "pdf" -%>
    <%= wicked_pdf_javascript_include_tag "number_pages" %>
  </head>
  <body onload='number_pages'>
    <div id="header">
      <%= wicked_pdf_image_tag 'mysite.jpg' %>
    </div>
    <div id="content">
      <%= yield %>
    </div>
  </body>
</html>
```


## 詳細設定

PDF生成に固有なHTMLタグを記述することで、出力内容を装飾できる。

- Page break: 特定のクラス名を持つdivタグで指定する。
- ページ番号：　


## Troubleshooting: Heroku上でslug size激増問題

-
- ref: [wkhtmltopdf on Heroku: evaluating different installation options](https://razorjack.net/wkhtmltopdf-on-heroku-evaluating-different-installation-options/)