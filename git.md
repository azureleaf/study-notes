# Learn Git



## ★★★
- `git add -A`
- `git commit -m "debug: Solve DB access error"`
- `git push origin master`
    - `git push <remote> <branch>`という構造
- `git pull origin master`
- `git status`
- `git mv`と`git rm`
    - Git管理されているファイルを移動したり、名前を変更したりするときには必ずこれらを使う
    - **エクスプローラ上などで勝手に変更してはいけない！**　そのファイルの変更履歴が反映されなくなってしまう。
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
    - `git pull origin master` = `git fetch` + `git merge`

### `git merge` vs `git rebase`
- `git merge`
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
    - remoteにpush/pullするときに、パスワードやメールアドレスを毎度打たずに済むよう記憶する
- `git config --global user.name "John Doe"`
    - Gitをインストールした直後に設定
- `git config --global user.email johndoe@example.com`
    - Gitをインストールした直後に設定
- `git remote rename origin gitlab`
- `git remote add origin https://username@your.bitbucket.domain:7999/yourproject/repo.git`
    - 新しいremoteを追加（例：GitHubに上げてたリポジトリを、GitLabにも上げられるようにするとか）
- `git clone --bare https://username@bitbucket.org/exampleuser/OLD_REPOSITORY.git`


 

## Git管理すると何がいいの？

- バージョンを管理できる
- 他人との共同作業がやりやすくなる
- クラウドサービスや遠隔などへコードを送信できる

## Keywords

- Pull Request / Merge Request
    - 「僕の作ったブランチをチェックして、masterなどに統合してくれ」という要望
    - 新人エンジニアなどが、ベテランに依頼する。ベテランはコードをレビューし、問題がなければマージする
    - GitHubではpull request, GitLabではMerge Requestと呼ばれているが同じもの
- Subversion (svn): gitと同じような古いツール。だが、今はほとんどの企業でgitに取って代わられた
- GitHub / GitLab / BitBucket
    - クラウド上にコードを保存するサービス
    - 外部に公開するか、内部専用なのか選べる。
    - 
- CI: Continuous Integration
- CD: Continuous Deployment

