# Format

プログラミングで登場するいろいろな形式について

## Encoding

### Language Encoding

- UTF-8
- Shift-JIS
- UTF-16

### Symbol

- Percent Encoding
  - `%20`で半角空白
  - 全角（というか２バイト文字）は、ひらがなだろうと漢字だろうとハングルだろうと全て3つ分になるっぽい
  - `%E8%BA%8A%E8%BA%87` で「躊躇」
  - `%E3%81%8F%E3%82%8D`で「くろ」
  - `%EA%B5%AD%EC%A0%9C`で「국제」
- base 64
  - 認証のJWTで出てくる。JWTはbase64 encodedなので