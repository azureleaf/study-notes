# Learn Git

## ★★★

- `git add -A`
- `git commit -m "debug: Solve DB access error"`
- `git push origin master`
  - `git push <remote> <branch>`という構造
- `git pull origin master`
- `git status`
- `git mv`
  - Git 管理されているファイルを移動したり、名前を変更したりするときには必ずこれらを使う
  - **エクスプローラ上などで勝手に変更してはいけない！**　そのファイルの変更履歴が反映されなくなってしまう。
- `git rm`
  - そのファイルを削除し、なおかつ git の index からも外す
- `git branch`
- `git branch NEW_BRANCH_NAME`
- `git checkout BRANCH_NAME`

## ★★

- `git clone http://blahblah.git`
- `git init`
- `git log -n 3`
- `git revert HEAD~3`
- `git stash`
- `git stash list`

### `git fetch` vs `git pull`

- `git fetch origin master`
  - Similar to `git pull`
  - Fetching the latest changes in the remote, however, unlike `git pull`, **this doesn't merge remote branch to local files**. Therefore this doesn't update the files in the local.
  - In the local, you have:
    - `master`: Local master branch. **Not** updated by `git fetch`
    - `origin/master`: Remote master branch. Updated by `git fetch`
  - `git pull` = `git fetch` + `git merge`

### `git merge` vs `git rebase`

- `git merge`

  - merge すると不具合が出る可能性があるので、いきなり master に merge してはいけない
  - master 側をブランチ側にまず merge し、不具合がないことを確かめてから

- `git rebase -i origin master`
  - Similar to `git merge`
  - `git rebase` keep the commits on the branch while `git merge` doesn't
  - Therefore, in most cases, you better use `git rebase`
- `git checkout features/visualization` then `git rebase master`
  - Merging "features/visualization" branch to "master"

## ★

- `git config --list`
- `git config --global credential.helper 'cache --timeout 3600'`
- `git config credential.helper store`
  - remote に push/pull するときに、パスワードやメールアドレスを毎度打たずに済むよう記憶する
- `git config --global user.name "John Doe"`
  - Git をインストールした直後に設定
- `git config --global user.email johndoe@example.com`
  - Git をインストールした直後に設定
- `git remote rename origin gitlab`
- `git remote add origin https://username@your.bitbucket.domain:7999/yourproject/repo.git`
  - 新しい remote を追加（例：GitHub に上げてたリポジトリを、GitLab にも上げられるようにするとか）
- `git clone --bare https://username@bitbucket.org/exampleuser/OLD_REPOSITORY.git`

## Good Tutorial Websites

- [サルでもわかる](https://backlog.com/ja/git-tutorial/)
- [Atlassian](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud)
- [Git Rebase vs Git Merge](http://www-creators.com/archives/1943)

## Git 管理すると何がいいの？

- バージョンを管理できる
- 他人との共同作業がやりやすくなる
- クラウドサービスや遠隔などへコードを送信できる

## Keywords

### Pull Request / Merge Request

- 「僕の作ったブランチをチェックして、master などに統合してくれ」という要望
- 新人エンジニアなどが、ベテランに依頼する。ベテランはコードをレビューし、問題がなければマージする
- GitHub では pull request, GitLab では Merge Request と呼ばれているが同じもの

### Subversion (svn)

- git と同じような古いツール。だが、今は多くの企業で git に取って代わられた

### GitHub / GitLab / BitBucket

- クラウド上にコードを保存するサービス
- 外部に公開するか、内部専用なのか選べる。

### SourceTree

- gitの履歴などを可視化するツール
- CUIではなく、GUIを使ったコミットやマージそのほかもできる
- WindowsとMacに対応（Linuxには対応せず...）

### CI/CD: Continuous Integration + Continuous Deployment （もしくは Continuous Delivery）

- CI: push されたコードについて、自動でテストを行う機能。
- テストのし忘れなど防ぎ、コードの品質を保てる
- テストして問題があれば、merge されない
- 有名なツールは「Circle CI」「Jenkins」「GitLab」など
- Continuous Deployment では、テストで問題なければ本番環境へのデプロイも自動で行う
