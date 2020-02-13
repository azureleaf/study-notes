# Vue + Jest

## そもそも Testって何？

### Unit Test



### Integration Test

- ２つのUnit同士がきちんと連結しているか試験する

### E2E Test
 
- E2Eテストツールとしては「Cypress」「Nightwatch」が有名 

## Jestの特徴

- Vue-CLIでは、Jest向けファイル準備が選択できる
    - Mocha + Chaiというのが他の選択肢にあり
- Vueでは`vue-test-utils`というパッケージと組み合わせて使う
    - Jest

## Procedure

1. `vue add @vue/unit-jest`
    - vue-cliでプロジェクト作成時にJestを選択したらこれは不要？
    - Jest向けのプラグインがインストールされる
    - test/ディレクトリが作られる
    - 各種rcファイルなどが更新される
1. `npm install --save-dev jest @vue/test-utils`
    - Jest本体とvue-test-utilsのインストール



## Glossary

- Assertion
    - 値の投入や操作の結果が、目論見通りになっているのか確認すること
- 