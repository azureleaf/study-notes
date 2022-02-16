# 設定ファイル大全

Web 開発のさまざまな場面で出てくる設定のやりかたのまとめ

## VS Code Extensions List (Details below)

- Linting / Formatting
  - Prettier
  - ESLint
  - TSLint
  - Vetur: Prettier があれば不要？
- Others
  - Docker
  - ~~Code Runner~~

## VSCode Settings

- VS Code 自体の設定には２つの方法がある
  - `~/.config/Code/User/settings.json`
    - 設定タブで設定した情報は、基本的にこのファイルに記録されている
    - ここで設定した内容は、VS Code 自体を変更するので全ての project に影響する
  - BLAHBLAH.code-workspace
    - そのワークスペース内部でのみ適用される

* `settings.json` sample

```js
{
  "editor.fontFamily": "'Fira Code Medium', 'monospace', monospace,",
  "editor.fontLigatures": true,
  "editor.minimap.enabled": false,
  "editor.tabSize": 2,
  "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "markdown.preview.fontSize": 18,
  "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "window.restoreWindows": "none",
  "prettier.tabWidth": 2,
  "terminal.integrated.lineHeight": 1.2,
  "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "terminal.integrated.rendererType": "dom",
  "terminal.integrated.fontWeight": "600",
  "workbench.colorTheme": "Cobalt2",
  "editor.fontSize": 15,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    }
  ],
}
```

- `"[言語名]"`
  - 言語別の設定
- `"editor.fontLigatures"`
  - Fira Code などで文字の連結などをする時に必要

##

## Linting / Formatting Tools

- `.prettierrc`
- `.eslintrc.json` / `.eslintrc.js` / `.eslintrc.yaml`

  - json が一番一般的
  - js だとロジックやコメントを書ける
  - `rules`は、offだと無視、warnだと黄色、errorだと赤色で警告を出す
  - `"semi": ["error", "never"]`は１つめがON OFFの切り替え、２つめがsemiルールのオプション（neverだとセミコロンをつけない、alwaysだと常に）


  ```js
  {
    "extends": ["eslint:recommended"],
    "plugins": [],
    "parserOptions": {},
    "env": {"browser": true},
    "globals": {},
    "rules": {
      "semi": "error"
    }
  }

  ```

  ```js
  {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
      "browser": false,
      "node": true,
      "es6": true,
      "mocha": false
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "ecmaFeatures": {
      "arrowFunctions": true,
      "blockBindings": true,
      "classes": true,
      "defaultParams": true,
      "modules": true,
      "spread": true,
      "globalReturn": true,
    },
    "rules": {
      "valid-jsdoc": ["error", {
        "requireReturn": true,
        "requireReturnType": true,
        "requireParamDescription": true,
        "requireReturnDescription": true,
        "preferType": {
          "String": "string",
          "object": "Object",
        }
      }],
      "require-jsdoc": ["error", {
        "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ClassDeclaration": true
        }
      }],
      "no-var": 1,
      "no-eval": "error",
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "no-console": ["error", { "allow": ["warn", "info"] }],
      "space-before-function-paren": ["error", "never"],
      "padded-blocks": ["error", "always"],
      "prefer-arrow-callback": [0, { "allowNamedFunctions": true }],
      "func-names": ["error", "never"],
      "no-use-before-define": [
        "error", {
          "functions": true,
          "classes": true
        }
      ],
      "max-nested-callbacks": [
        "error",
        5
      ],
    }
  }

  ```

## Testing Tools

- jest.config.js
- cypress.json

## General Tools

- `.gitignore`
- `.browserlistrc`
- `babel.config.js`
- `postcss.config.js`
- `tsconfig.json`
- `ormconfig.json`

