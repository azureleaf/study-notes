# Web Scraping

## BeautifulSoup

> BEAUTIFUL Soup, so rich and green, Waiting in a hot tureen! Who for such dainties would not stoop? Soup of the evening, beautiful Soup! Soup of the evening, beautiful Soup!

### Overview

- Does NOT support XPath
- `lxml` is an alternative for bs

### Troubleshooting

- ソースコードにはないはずのタグが勝手に挿入され、そのせいで解析に失敗する
  - BeautifulSoup try to repair the broken HTML when `BeautifulSoup()` method is called
  - However, seemingly it sometimes fails
  - Try to change parser: e.g. `BeautifulSoup(html, "html5lib")` instead of `BeautifulSoup(html, "html.parser")`
  - Perhaps sometimes using `lxml` helps?

## Selenium

### Overview

- To use selenium, you need to download driver for each browser version
- Developed for Python, Java, etc.
- Support XPath
