# 最低限のセキュリティ知識

## misc

### CORS:

- Same-origin policyに反してresource sharingすること

### Same-origin Policy

- あるページを開いた時に、その同じ origin からしかリソース（画像とか、JS とか）を取得しないというルール
- SOPに則ってるかどうかを判断するのはブラウザ側である（最近のブラウザなら対応してる）
- same-origin の意味
  - Protocol が同じ： http://sample.com と https://sample.com は別物
  - Hostが同じ
  - Portが同じ： http://sample.com と http://sample.com:88 は別物(httpはデフォルトで80番なので)
  - path(.com以降とか)が違うかどうかは無関係
- ただし、HTML の全ての要素についてこのルールが適用されるわけではない
- SOP が適用されないもの
  - `<script>`　なので、CDN などの外部 JS を読み込むサイトは普通に存在している
  - `<link>`
  - `<img> <video> <audio>`
  - `<frame> <iframe>`
  - `<object> <embed> <applet>`
- SOP が適用されるもの
  - XHR
  - Canvas
  - Web Storage

## 攻撃の種類

### DDoS

### CSRF: Cross-site Resource Forging

- 以下が揃ったときに起きる
  - 攻撃者がなりすましたい操作が存在する
    - ネット書き込み
    - パスワード変更
    - 商品購入
    - 非公開に設定した情報の公開
  - HTTP Request が送られた時、サーバ側はクッキーのみを使ってユーザを判別
  - 操作を完了するにあたり、予測不能な値がない
    - ex. パスワード変更を偽装するときに、現在のパスワードを入力させない
- sea-surf のように発音する場合がある
- 攻撃の手順
  1.
- CSRF Token とは
  - Laravel の Blade でさんざん`{{ csrf-token}}`とか書いてるのはこれ

### XSS: Cross-site Scripting

### SQL Injection

### Unauthorized Access

- 単なる不正アクセス

### Gumblar

-

### Session Riding

### One-click Attack

### Spoofing

### Computer Virus

### Adware & Spyware

### Phishing

### Rootkit

### Clickjacking

- ページの中に`<iframe> <frame>`などを使って別のサイトのサービスを埋め込む時に起きる
  - Google のソーシャルログインとか、Twitter とか、JSFiddle のコード埋め込みとか、そういうとき
- ユーザーはその窓をクリックしているつもりでも、実際には親側のサイトで「見えないボタン」がその窓の上にかかっている
  - `opacity: 0; z-index: -1`などで見えなくする
- 「いいね」を押したつもりでも、実際には iframe で埋め込まれたサービスの重大な操作（送金とか、購入とか、アカウント削除とか）が実行されている
- 対策：
  - 自分のウェブサイトが、攻撃者のウェブサイト内で iframe で埋め込まれることを制限する
  - HTTP Response に`x-frame-options`を追加する。
  - `x-frame-options: DENY`　埋め込まれちゃダメ
  - `x-frame-options: SAMEORIGIN`　自分のサイト内部でのみ埋め込み可
  - `x-frame-options: allow-from https://www.example.com/`
  - `x-frame-options:`

## Security Tools

### Firewall

### Antivirus

### WAF: Web Application Firewall

## Encryption Algorithm

- PGP Encryption

### RSA

- とても有名

### Triple DES

### Twofish

### Blowfish

### AES

- 現在の主流の暗号化方式

## Key

- Public Key 公開鍵
  - サーバ側が秘密鍵と一緒に作成する
  - **公開鍵で暗号化したものでも、公開鍵で復号化はできない！**
    - このように、暗号化と復号化で別々の鍵を使う場合を Asymmetrical Encryption という
  - 公開鍵は暗号化するための道具なので、いくら漏れても構わない（のか？）
  - 公開鍵は、それに対応する秘密鍵がある
- Private Key 秘密鍵

  - 秘密鍵は、それと対応する公開鍵で暗号化したデータを復号化できる
  - 秘密鍵が漏洩した公開鍵は、当然使っちゃだめ

- Common Key 共通鍵
  - データ本体を**暗号化および復号化**するのに使う
    - このように双方が同じ鍵を使うので、Symmmetrical Encryption と呼ぶ
  - クライアント側が作成する
  - 共通鍵は、公開鍵で暗号化することで保護する
  - 暗号化されていない共通鍵を相手に送ってはダメ

## SSL/TLS

- SSL: Secure Sockets Layer
  - Security Protocol
  - だんだん進化してきたが、SSL3.0 は脆弱性があったので 2015 年に禁止され TLS に引き継がれた
  - 死んだが、未だに「SSL/TLS」という表記でひとくくりで扱われる
- TLS: Transport Layer Security
  - Security Protocol
  - SSL の後継
- Diffie Hellman
- SSL/TLS 通信の手順：　「Client と Server が共通鍵を共有した状態」を作り出すのがゴール。共通鍵を直接送ると途中で盗まれる恐れがあるので、安全のため公開鍵・秘密鍵ペアを使うことになる。

  | Client                                                 | Server                                                 |
  | ------------------------------------------------------ | ------------------------------------------------------ |
  | SSL/TLS の通信をサーバに要求                           |                                                        |
  |                                                        | 秘密鍵と公開鍵を作成し、証明書を取り寄せる             |
  |                                                        | 公開鍵と秘密鍵を返却                                   |
  | 証明書を検証し、共通鍵を作る                           |                                                        |
  | 共通鍵でデータ本体を暗号化                             |                                                        |
  | 公開鍵で共通鍵を暗号化                                 |                                                        |
  | 暗号化された「データ本体」「共通鍵」を返却             |                                                        |
  |                                                        | 共通鍵を秘密鍵で復号化                                 |
  | これ以降の通信では、データを常に共通鍵で暗号化・復号化 | これ以降の通信では、データを常に共通鍵で暗号化・復号化 |

- SSL は PKI（Public Key Infrastructure） の一種。
- HTTPS となっているサイトは、SSL を使ってる
  - SSL を使うウェブサイトは電子証明書で本人確認している
  - 本人確認をするのが、Verisign などの認証局。ただし「信頼できない認証局」もあり、Symantec の証明書が信頼できないと何年か前に Google が騒ぎ立てて話題になった。信頼できない認証局によって提供される SSL は、当然信頼できない。
  - HTTP のポート番号 80 に対して、HTTPS は 443

### OpenSSL

- Open-Source SSL/TLS
- Laravel でも使われている
- OpenSSL のライブラリはパソコンにインストールできる。手元で秘密鍵・公開鍵を生成できる。

## SSH: Secure SHell

- SSL と名前がちょっと似てるが基本的には別物
- 公開鍵のしくみなどを利用する点は SSL と共通
- ユーザ名とパスワードを使った認証よりも安全
- SSH を listen するホスト側（サーバ）はポート番号 22 で聞く

| Client                                         | Server                                           |
| ---------------------------------------------- | ------------------------------------------------ |
| 秘密鍵と公開鍵を生成                           |                                                  |
| 公開鍵をサーバ側に送信                         |                                                  |
| SSH でログインしたい旨をサーバに要求           |                                                  |
|                                                | サーバ側が公開鍵で暗号化したテストデータを渡す   |
| 秘密鍵でテストデータを復号化し、サーバ側に戻す |                                                  |
|                                                | 正しく復号化されていれば、本人であると確認できる |  |

## Hash Function

- 任意長のビット列から規則性のない固定長のビット列を生成する関数のこと
  - 高速なハッシュ関数ほど良質
  - 元データのサイズにかかわらず一定のサイズ。でないと使いにくい
  - 元データが少しでも違ったら、ハッシュ値はがらっと変わる。でないと改ざんしやすい
- 改竄防止だけでなく、誤り訂正系技術とも関係が深い
- ダウンロードしたソフトウェアが改竄されていないか、ハッシュ値を計算することもある。正解のハッシュ値は公式ウェブサイトにある。（サイト自体も改竄されてたら元も子もなさそうだが）
- hush ではなく hash。hash は本来、調理した肉を刻んで、それを再度料理の一部に使うこと。これが由来っぽい

### Hash Algorithm

- SHA-1
  - 160bit のハッシュ値を返す
  - SHA-2 に移行することが推奨されている
  - Git 内部でハッシュ値を計算するのに使われている
- SHA-2
  - ビット数が違うバリエーションあり：SHA-224, SHA-256, SHA-384, SHA-512, etc.
  - SHA-256 がメジャー。SHA-512 が一番長い
- MD5
  - Dead

## 認証

### OAuth2.0

- OAuth とは
