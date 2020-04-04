# Testing Vue

# ToC

- [Testing Vue](#testing-vue)
- [ToC](#toc)
- [そもそも Testの利点は？](#%e3%81%9d%e3%82%82%e3%81%9d%e3%82%82-test%e3%81%ae%e5%88%a9%e7%82%b9%e3%81%af)
- [vue-test-utils](#vue-test-utils)
- [Unit Test / Integration test](#unit-test--integration-test)
  - [Tools](#tools)
- [E2E Test](#e2e-test)
- [Jestの特徴](#jest%e3%81%ae%e7%89%b9%e5%be%b4)
- [Procedure](#procedure)
- [Glossary](#glossary)

# そもそも Testの利点は？

- TDD: Test Driven Development
- 早いうちから問題を洗い出せる
- 早いうちから実用性への手応えがありモチベーションになる
- テストを意識してコードを書くようになると、疎結合や適切な分割を意識しやすくなり可読性向上

# vue-test-utils
- .vueファイルをテストする
- 他のツールと組み合わせて使う
  - `vue add @vue/unit-jest`
  - `vue add @vue/unit-mocha`
  - `vue add @vue/e2e-express`
  - `vue add @vue/e2e-nightwatch`


# Unit Test / Integration test

- 単一の関数などがきちんと機能するか調べるのがunit test
- 複数のユニットがきちんと連携して機能するか調べるのがintegration test

## Tools

- Jest
- Mocha + Chai



# E2E Test
 
- Cypress
- Nightwatch

# Jestの特徴

- Vue-CLIでは、Jest向けファイル準備が選択できる
    - Mocha + Chaiというのが他の選択肢にあり
- Vueでは`vue-test-utils`というパッケージと組み合わせて使う
    - Jest

# Procedure

1. `vue add @vue/unit-jest`
    - vue-cliでプロジェクト作成時にJestを選択したらこれは不要？
    - Jest向けのプラグインがインストールされる
    - test/ディレクトリが作られる
    - 各種rcファイルなどが更新される
1. `npm install --save-dev jest @vue/test-utils`
    - Jest本体とvue-test-utilsのインストール



# Glossary

- Assertion
    - 値の投入や操作の結果が、目論見通りになっているのか確認すること
- Postman
- CI/CD
- Stub
  - 今テストしたい要素の親要素や子要素が未完成の時にも

