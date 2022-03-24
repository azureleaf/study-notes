# deviseのflashメッセージ内部で任意の変数を使う方法

## なにを実現したいのか

ご存知のように、deviseのメッセージ内容は、
https://github.com/heartcombo/devise/blob/master/config/locales/en.yml
https://github.com/tigrish/devise-i18n/blob/master/rails/locales/ja.yml で定義され、

例えば


しかし、この

- 「田中さんとしてログインしました」のように
- 「あなたのアカウントはロックされています。」

## SessionsControllerでオーバーライドするもの



[Devise::SessionsController](https://github.com/heartcombo/devise/blob/master/app/controllers/devise/sessions_controller.rb) の


## モデルでオーバーライドするもの

実際には、すべてのflashが上記のSessionsControllerで実行されているわけではありません。
例えば、「ロックされています」のメッセージは別のファイルで定義されているため


「分以上経過したので自動でログアウトしました。」
