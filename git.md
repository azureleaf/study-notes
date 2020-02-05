# Learn Git



## ★★★（毎日使いまくる）
- `git add -A`
- `git commit -m "debug: Solve DB access error"`
- `git push origin master`
    - `git push <remote> <branch>`という構造
- `git pull origin master`
- `git status`
- `git mv`
    - Git管理されているファイルを移動したり、名前を変更したりするときには必ずこれを使う
    - **エクスプローラ上などで勝手に変更してはいけない！**　そのファイルの変更履歴が反映されなくなってしまう。
- `git rm`
- `git branch`
- `git branch NEW_BRANCH_NAME`
- `git checkout BRANCH_NAME`

## ★★（使う日もある）
- `git clone http://blahblah.git`
- `git init`
- `git log -n 3`
- `git revert HEAD~3`
- `git stash`
- `git stash list`
- `git merge`

## ★（たまに使う）
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

## Gitを使ったコードのホスティングサービスは？

- GitHub
- GitLab
- BitBucket

## Keywords

- Pull Request
- Push
- Pull
- Merge
- Clone
- Commit
- Checkout

- HEAD

