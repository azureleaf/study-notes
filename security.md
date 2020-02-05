# 最低限のセキュリティ知識

いつもの、間違ってても責任を取れない個人メモ

## 攻撃

### DDoS
### CSRF: Cross-site Resource Forging
- CSRF Token。LaravelのBladeでさんざん`{{ csrf-token}}`とか書いてるのはこれ

### XSS: Cross-site Scripting
### SQL Injection
### Unauthorized Access
- 単なる不正アクセス
### CORS: Cross-origin

### Session Riding
### One-click Attack

### Spoofing
### Computer Virus
### Adware & Spyware
### Phishing
### Rootkit


## Encryption Algorithm

- PGP Encryption

### RSA
- 暗号といえばこれ。とても有名
### Triple DES
### Twofish
### Blowfish
### AES





## PKI: Public Key Infrastructure

### Public Key 公開鍵
- みんな知ってる鍵
- データは公開鍵で暗号化するが、**公開鍵で復号化はできない**
- 公開鍵は、それに対応する秘密鍵がある。
- 秘密鍵が漏洩した公開鍵は使っちゃだめ。



## SSHとSSL, TLS

- SSL: Secure Sockets Layer。セキュリティプロトコル。だんだん進化してきたが、SSL3.0は脆弱性があったので2015年に禁止されTLSに引き継がれた。しかし未だに「SSL/TLS」という表記でひとくくりで扱われる。
- TLS: Transport Layer Security。セキュリティプロトコル。SSLの後継である。
- SSLはPKIの一種。
- HTTPSとなっているサイトは、SSLを使ってる
    - SSLを使うウェブサイトは電子証明書で本人確認している
    - 本人確認をするのが、Verisignなどの認証局。ただし「信頼できない認証局」もあり、Symantecの証明書が信頼できないと何年か前にGoogleが騒ぎ立てて話題になった。信頼できない認証局によって提供されるSSLは、当然信頼できない。

### OpenSSL

- Open-Source SSL/TLS
- Laravelでも使われている
- OpenSSLのライブラリはパソコンにインストールできる。手元で秘密鍵・公開鍵を生成できる。


## Hash Function 

hushではない。hash。hashは本来、調理した肉を刻んで、それを再度料理の一部に使うこと。これが由来っぽい

- 任意長のビット列から規則性のない固定長のビット列を生成する関数のこと
    - 高速なハッシュ関数ほど良質
    - 元データのサイズにかかわらず一定のサイズ。でないと使いにくい
    - 元データが少しでも違ったら、ハッシュ値はがらっと変わる。でないと改ざんしやすい
- 改竄防止だけでなく、誤り訂正系技術とも関係が深い
- ダウンロードしたソフトウェアが改竄されていないか、ハッシュ値を計算することもある。正解のハッシュ値は公式ウェブサイトにある。（サイト自体も改竄されてたら元も子もなさそうだが）
    - 

### Hash Algorithm

- SHA-1
    - 160bitのハッシュ値を返す
    - SHA-2に移行することが推奨されている
    - Git内部でハッシュ値を計算するのに使われている
- SHA-2
    - ビット数が違うバリエーションあり：SHA-224, SHA-256, SHA-384, SHA-512, etc.
    - SHA-256がメジャー。SHA-512が一番長い
- MD5
    - Dead



## 認証のしくみ

# OAuth2.0


