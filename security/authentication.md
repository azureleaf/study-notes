# Authentication
- [Authentication](#authentication)
- [Keywords](#keywords)
- [Username + Password](#username--password)
  - [Basic auth](#basic-auth)
  - [Digest Auth](#digest-auth)
- [JWT](#jwt)
- [OpenID](#openid)
- [OAuth2.0](#oauth20)
- [Social Login](#social-login)
- [Token Authentication](#token-authentication)
- [apt システムにおける package の認証](#apt-システムにおける-package-の認証)
- [Attacks](#attacks)
- [Encrytion Keywords](#encrytion-keywords)
- [Public-key Cryptography](#public-key-cryptography)
- [How login works with SSH](#how-login-works-with-ssh)
  - [On registration](#on-registration)
  - [On login](#on-login)
- [SSH: Secure SHell](#ssh-secure-shell)
  - [SSH vs SSL](#ssh-vs-ssl)
- [CORS](#cors)
- [CSRF](#csrf)
- [Authentication & Authorization](#authentication--authorization)
- [JWT](#jwt-1)
- [Social Login](#social-login-1)
- [Passport](#passport)
- [Cookie & Session](#cookie--session)

# Keywords

- SAML (Security Assertion Markup Language)

# Username + Password

- Basic Auth
- Digest Authがある

## Basic auth

- username / passwordをbase64で変換して送る
- 漏洩するので危険

## Digest Auth

- username /passwordをMD5でハッシュ化して送る
- 現在の主流
- しかしMD5はもう安全ではないのでは？

# JWT

- 発音はjotらしい
- 文字列になっている：`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuWxseeUsCIsImV4cCI6IjIwMTkvMDQvMDEifQ.u8TT4ySJhBiMod1rNqCxiISXwCXqddVSJE5gncSCGD7RPHigHoZiDnLfwcIIGij-ARBrswe4eluMUgaQwS7FUdN8IVwKkFUY1533TQZZYhTUzobO3q_PnDyPi8cPDmkSTJHzBhT298G7fNZENUUo8fmCjOkYC9FibTMrF6Aij4w`
- `{Base64エンコードされたヘッダ}.{Base64エンコードされた JSON の中身(クレームという)}.{電子署名}`という形式
- 電子署名は改竄を検出するために使われる

```js
// Header
{
"alg": "RS256", // REQUIRED algorithm
"typ": "JWT" // type
}

// Claim
// You can add user-defined claims, however some claim name is reserved
{
"username": "山田",
"exp": "2019/04/01" // expire
}
```



# OpenID
# OAuth2.0
# Social Login

# Token Authentication

# apt システムにおける package の認証

- 例として、MongoDB だと以下のようにする

1. `wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -`

   - `wget -q`: "Quietly", not to show the messages if not error
   - `wget -O`: set the location of output
   - `|`: Pipeline. Result output of the wget is sent to `apt-key add` command
   - `apt-key add`: Add package key to the list
   - You can use `apt-key list` to show the all the keys added so far
   - この URL のファイルそのものは以下の通り

   ```
   -----BEGIN PGP PUBLIC KEY BLOCK-----
   Version: GnuPG v1.4.11 (GNU/Linux)

   mQINBFrXrqYBEACscLj2qgPpHBCQtgW1Yh29Ddgv6jssyWLAYmj0qngFLKoQMMbt
   SNBZylIKxfS+pUD9J5xfRZwfZOmtMIOFVWS9tcpeQXsiwC126tRyoFCIpoTmH7+R
   8/FfPrCYyXLP+ftEZfRV60wTwr5drR0S5pVIST3oaXXGkHkFC35U++udUG2Tl4Cs
   OPSCp1tsK6UOTjHFDH8PnasImJgD37QC8OOMIJS0jCtDZywJW6OCdpIRbuTWPK3P
   P48NLwGUJHixhVCmOgPPu9kDAfG3wLxiN85S2UbaaSXsdA4fF4SSwWNHTIYAg0yT
   xGepVyW4lkfcvng4jva24rQ9j1cm1b7bWeOkMH1aAcSyFzKCeNCNxbVOYVrcWNP4
   zrSUvsTKhwX8rPFMq9LkcKirDL9bRILvn/24VU6NdJfGbRjR6+Q7ooj7hYKLXtO5
   q0Q4nhjigpTWIoU6jdfbM9YqpKSELNnkDRAU+bRYSrNaFuizYgDZQvcVT6gbq26f
   JbgihoeJogEfim3kqRRJ3EUhE+EaVijl9iLDKkpurod26P2QSq9RKSuOCeauPjQv
   3BIiEMXco8O3v8W1y4TbnSQ3d28W9pN28IgAhmN2EU2sKqWPzNeG0V+L6mE5pA4o
   nD3z3JRpxAUFw08+9LnLRZ4D1u54OrHADsU8UpYZJCm1xw6T0e4dlxW6rQARAQAB
   tDdNb25nb0RCIDQuMiBSZWxlYXNlIFNpZ25pbmcgS2V5IDxwYWNrYWdpbmdAbW9u
   Z29kYi5jb20+iQI+BBMBAgAoBQJa166mAhsDBQkJZgGABgsJCAcDAgYVCAIJCgsE
   FgIDAQIeAQIXgAAKCRBLfFSaBY+LaxdXEACJMvkgr3Nt2xme9/6brGMbrEy6mQn7
   DZP98DXuS0tWvO5vkEO5IfRIvzG3zA0pATSBDVA0BvGnebQrGXZZ7Xfh0gz+zxlt
   TXv4eCyb6T4gRJuuQSFPTyDnZ3MbPESqj0UpIALmcLDJ01nqvbNPKxx5r08XQOtE
   i44Kcwc1Px5cPcYP9nmpDNLZjz3gkTm+zBygdE9beP02qXq7WcyghFmQZoLBW53e
   TqNPnMrrm5+6vgq+r/ttyiYTo7Zw8MrifN5okevzB0JhhSAW9g+4ZOp1QYbV8u8V
   pksJQDOIaBWIw8zosIQJTCVyd4hOyl8Ib2s2R0/grT51RgLYCNbUG6WTpKGgYBtr
   Mng10gozyDrnA3B+RiDx5uq+dNzuuMXWMit2nbcdanXdKNkaPmC6WVeU0rG5K1Wz
   jQMDvAInTszLcqH6zfEsjCoXj0z8UwcC4jahFDNMDBk3OhjMSL+fnvIhW84nKVHf
   AWL5jjSQdkrM/M8QRpRqls5apuIYHQwo6Oyd2Nk0n9T/GOMJ1jilxiPw9ihusf+k
   DfU0JI7T8fgxIv/wHNXUg7FOaaDJIfgGlCPUgtsNUDZZ9lFq+Zc5H8Wff3LNo7Se
   2xnzzoy2e+C3tsxAmVUTs+q0lyIzEK24lf71cp074KVV7rIYBELYtO2hAlJYjXJU
   bscTTjCKLf9leA==
   =UXPP
   -----END PGP PUBLIC KEY BLOCK-----
   ```

1. `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list`



# Attacks

- DDoS


>>>


# Encrytion Keywords

- Public-key Cryptography
- Symmetric key algorithms
- SSH is for secure connection to the server
- SSL is for secure display of the web page
  - HTTPS website uses SSL
  - Uses both public-key crypt & symmetric key crypt
- Digital Signature
- PKI: Public Key Infrastructure

>>>

# Public-key Cryptography

1. Recipient: Create the pair of **public key** & **private key**
2. Recipient: Send the **public key** to the sender
3. Sender: Get the public key of the recipient
4. Sender: Encrypt the contents with **public key**
5. Sender: Send the encrypted contents
6. Recipient: Decrypt the encrypted contents with **private key**

>>>

# How login works with SSH

## On registration

1. Client generates the key pair
2. Client sends the public key to the server

## On login

1. Client tells the server that he wants to login
2. Server creates encrypted content with the **public key**
3. Client decrypts the content with **private key, then give it to the server
4. Now the server can know that the client is authentic

>>>

# SSH: Secure SHell



## SSH vs SSL


>>>

# CORS

>>>

# CSRF


# Authentication & Authorization

>>>

# JWT

# Social Login

# Passport

>>>

# Cookie & Session