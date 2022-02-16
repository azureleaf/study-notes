# Visual Studio Code

# ToC

- [Visual Studio Code](#visual-studio-code)
- [ToC](#toc)
- [Extensionss](#extensionss)
- [Keyboard Shortcuts (for Linux)](#keyboard-shortcuts-for-linux)
  - [VSCode Settings](#vscode-settings)

# Extensionss

- Prettier
- ESLint
- TSLint
- Vetur
  - Prettier があれば不要?
- Docker
- php cs fixer
- PHP Intelephense
- Python
- C/C++
- Excel Viewer
- Markdown All in One
- Markdown+Math
- Night Owl Theme
- ~~Code Runner~~

# Keyboard Shortcuts (for Linux)

- `ctrl ,`
  - show setting
- `ctrl shift i`
  - format
- `ctrl shift @`
  - toggle display / hide terminal
- `ctrl shift p`
- `ctrl alt n`
  - run code

## VSCode Settings

- VS Code 自体の設定には２つの方法がある

  - `~/.config/Code/User/settings.json`
    - 設定タブで設定した情報は、基本的にこのファイルに記録されている
    - ここで設定した内容は、VS Code 自体を変更するので全ての project に影響する
  - Workspace file
    - そのワークスペース内部でのみ適用される

- `settings.json` sample

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
