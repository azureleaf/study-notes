# Security

- セキュリティそのものはWebでの体験になんの付加価値も生まないが、悪いやつがいるからやるしかないっていう面倒臭さ
- ただし、セキュリティはなかなか頭脳戦なので、面白い面もある

# ToC

- [Security](#security)
- [ToC](#toc)
- [misc](#misc)
  - [CORS:](#cors)
  - [Same-origin Policy](#same-origin-policy)
- [Attacks](#attacks)
  - [DDoS](#ddos)
  - [CSRF: Cross-site Resource Forging](#csrf-cross-site-resource-forging)
  - [XSS: Cross-site Scripting](#xss-cross-site-scripting)
  - [SQL Injection](#sql-injection)
  - [Unauthorized Access](#unauthorized-access)
  - [Gumblar](#gumblar)
  - [Session Riding](#session-riding)
  - [One-click Attack](#one-click-attack)
  - [Spoofing](#spoofing)
  - [Computer Virus](#computer-virus)
  - [Adware & Spyware](#adware--spyware)
  - [Phishing](#phishing)
  - [Rootkit](#rootkit)
  - [Mass Assignment](#mass-assignment)
  - [Clickjacking](#clickjacking)
- [Security Tools](#security-tools)
  - [Firewall](#firewall)
  - [Antivirus](#antivirus)
  - [WAF: Web Application Firewall](#waf-web-application-firewall)
  - [Ghidra](#ghidra)
- [Encryption](#encryption)
  - [RSA](#rsa)
  - [Triple DES](#triple-des)
  - [Twofish](#twofish)
  - [Blowfish](#blowfish)
  - [AES](#aes)
- [Security Field](#security-field)
- [Key](#key)
- [SSL/TLS](#ssltls)
  - [OpenSSL](#openssl)
- [SSH](#ssh)
- [Hash](#hash)
  - [Hash とパスワードの保存](#hash-とパスワードの保存)
  - [Hash Algorithm](#hash-algorithm)
- [Messeage Authentication Code (MAC)](#messeage-authentication-code-mac)

# misc

- Checksum

## CORS:

- Same-origin policy に反して resource sharing すること

## Same-origin Policy

- あるページを開いた時に、その同じ origin からしかリソース（画像とか、JS とか）を取得しないというルール
- SOP に則ってるかどうかを判断するのはブラウザ側である（最近のブラウザなら対応してる）
- same-origin の意味
  - Protocol が同じ： http://sample.com と https://sample.com は別物
  - Host が同じ
  - Port が同じ： http://sample.com と http://sample.com:88 は別物(http はデフォルトで 80 番なので)
  - path(.com 以降とか)が違うかどうかは無関係
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

# Attacks

## DDoS

## CSRF: Cross-site Resource Forging

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
- 攻撃の手順 1.
- CSRF Token とは
  - Laravel の Blade でさんざん`{{ csrf-token}}`とか書いてるのはこれ

## XSS: Cross-site Scripting

## SQL Injection

## Unauthorized Access

- 単なる不正アクセス

## Gumblar

-

## Session Riding

## One-click Attack

## Spoofing

## Computer Virus

## Adware & Spyware

## Phishing

## Rootkit

## Mass Assignment

- 脆弱性
- HTTP Request で value 列（name=john&email=john@example.com）を送ってアカウントを作成するとする
- これに「app 側で内部では使っているが、ユーザーから送信されることを想定していない値」を推測して埋め込む（&isAdmin=true）を追加
- これにより、攻撃者は admin 権限つきでユーザー登録できてしまう
- app 側では、カラムのそれぞれについていちいち判定条件をつけず、一括で値を変更してしまうのでこのような脆弱性が生まれる
- Laravel では、$guardと$fillable によってカラム毎の mass assignment の可否を制限することでこの脆弱性を防ぐ

## Clickjacking

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

# Security Tools

## Firewall

## Antivirus

## WAF: Web Application Firewall

## Ghidra


# Encryption

- PGP Encryption

## RSA

- とても有名

## Triple DES

## Twofish

## Blowfish

## AES

- 現在の主流の暗号化方式

# Security Field

- Reverse Engineering
- Malware
- Spyware
- Ransomware
- Digital Forensic
- Phishing
- Backdoor
- Social Engineering
- Privilege Escalation
- Side-channel Attack
- Spoofing
- Tampering
- Multi-vector, polymorphic attack
- Eavesdropping
- DDoS Attack
- Direct-access attack


# Key

- Public Key 公開鍵
  - サーバ側が秘密鍵と一緒に作成する
  - **公開鍵で暗号化したものでも、公開鍵で復号化はできない！**
    - このように、暗号化と復号化で別々の鍵を使う場合を Asymmetrical Encryption という
  - 公開鍵は暗号化するための道具なので、いくら漏れても構わない（のか？）
  - 公開鍵は、それに対応する秘密鍵がある
  - PKI: Public Key
- Private Key 秘密鍵

  - 秘密鍵は、それと対応する公開鍵で暗号化したデータを復号化できる
  - 秘密鍵が漏洩した公開鍵は、当然使っちゃだめ

- Common Key 共通鍵
  - データ本体を**暗号化および復号化**するのに使う
    - このように双方が同じ鍵を使うので、Symmmetrical Encryption と呼ぶ
  - クライアント側が作成する
  - 共通鍵は、公開鍵で暗号化することで保護する
  - 暗号化されていない共通鍵を相手に送ってはダメ
- (Symmetric Key 対称鍵)
  - 暗号化と復号化に同じ鍵を使うアルゴリズムのこと？鍵自体というよりも、鍵の分類という感じ？

# SSL/TLS

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

## OpenSSL

- Open-Source SSL/TLS
- Laravel でも使われている
- OpenSSL のライブラリはパソコンにインストールできる。手元で秘密鍵・公開鍵を生成できる。

# SSH

- SSH: Secure SHell
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

# Hash

- 任意長のビット列から規則性のない固定長のビット列を生成する関数をハッシュ関数という
  - 高速なハッシュ関数ほど良質
  - 元データのサイズにかかわらず一定のサイズ。でないと使いにくい
  - 元データが少しでも違ったら、ハッシュ値はがらっと変わる。でないと改ざんしやすい
- 改竄防止だけでなく、誤り訂正系技術とも関係が深い
- ダウンロードしたソフトウェアが改竄されていないか、ハッシュ値を計算することもある。正解のハッシュ値は公式ウェブサイトにある。（サイト自体も改竄されてたら元も子もなさそうだが）
- ハッシュの敵は Brute-force Attach である
- hush ではなく hash。hash は本来、調理した肉を刻んで、それを再度料理の一部に使うこと。これが由来っぽい

## Hash とパスワードの保存

- データベースにユーザログイン情報を格納する時、情報漏洩防止のため、パスワード本体ではなくそのハッシュ値を保存すべきである
- パスワードを保存する時には、salt（ランダムに生成した文字列）を付け加えて文字数を増やすべき(Salting)
- Key Stretching: ハッシュ値をさらに何度もハッシュ関数にかけて、総当り攻撃の難度を上げること

- パスワードの暗号化ライブラリを使うと、Salting や Key Stretching などを自動でやってくれる
  - BCrypt
  - SCrypt
    - BCrypt よりも安全
  - Argon2
    - Scrypt よりもさらに安全らしい
  - PBKDF2
    - もう死んだ？

## Hash Algorithm

- SHA-1
  - 160bit のハッシュ値を返す
  - SHA-2 に移行することが推奨されている
  - Git 内部でハッシュ値を計算するのに使われている
- SHA-2
  - ビット数が違うバリエーションあり：SHA-224, SHA-256, SHA-384, SHA-512, etc.
  - SHA-256 がメジャー。SHA-512 が一番長い
- MD5
  - Dead

# Messeage Authentication Code (MAC)

- 送られたメッセージが改竄されていないかを保証するための仕組み
  - メッセージを暗号化するわけではないので、機密情報を守ることはできない？
- Hash と同じように、データを入れるとアルゴリズムによって（MAC Algorithm）一定の長さの値（MAC）を返す
- Hash と違うのは、MAC ではデータと一緒に Secret Key を入れて値を取り出す点
- MAC の種類
  - HMAC (Hash-based MAC): ハッシュ関数でデータと鍵を処理する
  - AES-CMAC（Advanced Encryption Standard - Cipher-based MAC）：　ブロック暗号によって
- 手順
  1. 共通鍵を生成する
  1. 送信者と受信者が共通鍵を共有する
  1. 送信者側で MAC Algorithm により MAC を得る
  1. MAC とメッセージ本体を送る
  1. 受信者は、共通鍵とメッセージを使って MAC を計算する
  1. 自分で計算した MAC と、送信された MAC が一致することを確認する

