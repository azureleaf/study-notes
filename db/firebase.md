# Firebase

## ToC

## Reference

- https://employment.en-japan.com/engineerhub/entry/2019/06/07/103000
- https://qiita.com/kohashi/items/43ea22f61ade45972881
- https://qiita.com/Tachibana446/items/eba2fc67d8ef1535541a

# Depth: Basic

## Firebase の何がいいのか？

- サーバー不要
- DBを使うのにAPI不要
- 認証機能が組み込まれてる
- HTTPS
  - HTTPS化するためには利用中のレンタルサーバー業者からSSL証明書をもらうのが普通だが、Firebaseだと既定でなってるってこと
- プッシュ通知を送れる

## 主要な機能

### Authentication

- 匿名認証

### Cloud Firestore

- No-SQL Document DB
- Amazon DynamoDBに相当？
- Realtime性がある：　DBに変更が加わると、それにイベントリスナーを付けたフロントエンド側にも直ちに反映させることができる
### Storage
### Hosting
### Function

# Depth: Advanced