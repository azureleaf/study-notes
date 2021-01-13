# Learn Git


## ToC
- [Learn Git](#learn-git)
  - [ToC](#toc)
  - [Config](#config)
  - [Local](#local)
  - [Remote](#remote)
  - [区別](#区別)
    - [`git fetch` vs `git pull`](#git-fetch-vs-git-pull)
    - [`git merge` vs `git rebase`](#git-merge-vs-git-rebase)
    - [`git revert` vs `git reset`](#git-revert-vs-git-reset)
    - [CLONE vs FORK](#clone-vs-fork)
    - [MERGE REQUEST vs PULL REQUEST](#merge-request-vs-pull-request)
  - [Git レポジトリの付替え](#git-レポジトリの付替え)
  - [Troubleshooting](#troubleshooting)
    - [Trouble: GitLab で２段階認証を設定したらそれ以降の Git 動作が失敗する](#trouble-gitlab-で２段階認証を設定したらそれ以降の-git-動作が失敗する)
    - [Trouble: Permission denied (publickey) @ GitLab](#trouble-permission-denied-publickey--gitlab)
  - [Good Tutorials](#good-tutorials)
  - [Git 管理すると何がいいの？](#git-管理すると何がいいの)
  - [Keywords](#keywords)
    - [revision](#revision)
    - [MISC](#misc)
    - [Pull Request / Merge Request](#pull-request--merge-request)
    - [Subversion (svn)](#subversion-svn)
    - [SourceTree](#sourcetree)
    - [CI/CD: Continuous Integration + Continuous Deployment （もしくは Continuous Delivery）](#cicd-continuous-integration--continuous-deployment-もしくは-continuous-delivery)
  - [Commit Message Format](#commit-message-format)
  - [Git Flow](#git-flow)
  - [GitHub Flow](#github-flow)
  - [Version Control Repository](#version-control-repository)
    - [GitHub](#github)
    - [GitLab](#gitlab)
    - [BitBucket](#bitbucket)


## Config

```sh
git config --list
git config --global credential.helper 'cache --timeout 3600'
git config credential.helper store # remote に push/pull するときに、パスワードやメールアドレスを毎度打たずに済むよう記憶する
git config --global --unset credential.helper # Forget stored credentials # You need to run this command when you changed your password
git config --global user.name "John Doe" # Git をインストールした直後に設定
git config --global user.email johndoe@example.com # Git をインストールした直後に設定

# for WSL
git config core.autocrlf true
git config core.filemode false
```

## Local

```sh
git add -A
git add -u # Stages only Modified Files
git add . # Stages everything, without Deleted Files

git reset -- hello.txt # Unstage hello.txt
git reset HEAD # Unstage all the files
git reset --hard 1234abcdblahblahblah
git reset --soft HEAD^ # 最後のコミットを取り消すが、ファイル内容はそのまま
git reset --hard HEAD^ # 最後のコミットを取り消し、なおかつローカルのファイル内容も戻す
git reset ---hard HEAD~n # n個前まで戻す

# git resetの取り消し
git reflog # これで、戻すべき場所の番号をみつける
git reset --soft HEAD@{2} # 見つけた番号の場所に移動


git init
git commit -m "debug: Solve DB access error"
git commit --amend # 最後のコミットを修正。git add したあとにやれば、addし忘れを修復できる
git status
git mv # Git 管理されているファイルを移動したり、名前を変更したりするときには必ずこれらを使う # **エクスプローラ上などで勝手に変更してはいけない！**　そのファイルの変更履歴が反映されなくなってしまう。
git rm # そのファイルを削除し、なおかつ git の index からも外す

git log -n 3
git log --oneline MyFile.js # show the concise commits for the single file
git log --follow --oneline app/views/dogs/_form.html.haml # follow the past commits before renaming
git log --oneline develop ^origin/develop # count how many commits ahead the branch from another

git revert HEAD~3
git stash
git stash list

# git checkoutがあまりに多機能なので、区別化のためgit switch/git restoreというコマンドが新規追加された。
# ただし、git checkoutは従来通り使用可能
git switch master # ブランチ変更
git restore hello.c #
git checkout . # Revert changes to the index
git checkout HEAD -- MyFile.js # Reset the specified file(s) to `HEAD
git checkout HEAD myfile.js # Restore delete file which is not committed yet
git checkout -- MyFile.js # Restore the deleted file

# Remove the untracked files.
# Because git stash / revert / reset etc. won't remove the newly generated files.
git clean -f  # for untracked files
git clean -fd # for untracked directories

# create
git branch
git branch -r # List remote branches
git branch -a # --all
git branch NEW_BRANCH_NAME

# checkout
git checkout BRANCH_NAME

# delete
git push origin --delete my-branch # Delete the remote branch. Note that it's "push"
git push origin :my-branch # adding ":" means push void
git branch -d MyBranch # Delete the merged local branch
git branch -D MyBranch # Delete the unmerged local branch

# delete local remote-tracking branch
git fetch origin --prune # when the remote branch no longer exists

# rename
git branch -m NEW_BRANCH_NAME # rename current branch
git branch -m OLD_BRANCH_NAME NEW_BRANCH_NAME # rename the branch which you're not on

# compare
git diff master..develop


```

## Remote

```sh
git push origin master
git push <remote> <branch>という構造
git pull origin master
git pull --all # ローカルに存在しないブランチはpullされない。

# localに存在しないブランチ(ここではexperimental)をremoteから持ってくる
git checkout origin/experimental # A. detached HEADの状態でremoteから持ってくる。中身をちょっと見たいだけのときなどに使用。
git checkout experimental # B. ローカルに新ブランチを持ってくる

git clone http://blahblah.git
git clone --bare https://username@bitbucket.org/exampleuser/OLD_REPOSITORY.git

git remote rename origin gitlab
git remote add origin https://username@your.bitbucket.domain:7999/yourproject/repo.git # 新しい remote を追加（例：GitHub に上げてたリポジトリを、GitLab にも上げられるようにするとか）
git config --get remote.origin.url # Show the remote branch URL
git branch --set-upstream-to myfork/master # Set the default remote. Default remote is used for git status comparison
```

## 区別

### `git fetch` vs `git pull`

- `git fetch origin master`
  - Similar to `git pull`
  - Fetching the latest changes in the remote, however, unlike `git pull`, **this doesn't merge remote branch to local files**. Therefore this doesn't update the files in the local.
  - In the local, you have:
    - `master`: Local master branch. **Not** updated by `git fetch`
    - `origin/master`: Remote master branch. Updated by `git fetch`
  - `git pull` = `git fetch` + `git merge`
- `git fetch --all`

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

### `git revert` vs `git reset`

[Qiita: Git revertとresetについて](https://qiita.com/Sammy_U/items/e37c7242544fd1da81be)

- 共通点：
  - 特定のコミットがなかったのと同じ状態になること。
- 相違点：
  - revertは、既存の特定のコミットを打ち消すようなコミットを追加する。そのコミットがなかったのと同じ状態にはなるが、コミットそのものは履歴に残すことができる。
  - resetは、コミットそのものがなかったことになる。
- 使い分け
  - reset: そのブランチで他の人が作業していないときで、コミット履歴を見やすくしたい場合。(他の人が使っていると、マージ時にコンフリクト発生)。したがって個人開発向け。
  - revert: 履歴そのものが残せるので、復元も簡単で安全。チーム開発はこちらが向いている。

### CLONE vs FORK

### MERGE REQUEST vs PULL REQUEST

## Git レポジトリの付替え

1. `cd existing_repo`
1. `git remote rename origin old-origin`
1. `git remote add origin git@gitlab.com:mydevelopgroup/helloworldproj.git`
1. `git push -u origin --all`
1. `git push -u origin --tags`

Upstream Branch を変更するため、以下のコマンドが必要になる可能性がある

- `git branch --set-upstream-to origin/master`
  - VS Code の左下などの数字は、ここで設定した remote branch を基準にしているっぽい
  - なので、remote が複数ある場合にはこれを設定する必要がある
  - `git status`ででてくる`Your branch is up to date with 'origin/master'.`も恐らくこれが基準

## Troubleshooting

### Trouble: GitLab で２段階認証を設定したらそれ以降の Git 動作が失敗する

1. GitLab 上で Access Token を生成し、これをどこかに保存しとく
1. git clone する
1. email / account を聞かれたら、いつもどおり GitLab のアカウントを記入
1. password を聞かれたら、GitLab アカウントのパスワードではなく、さっき生成した Access Token を入力する

### Trouble: Permission denied (publickey) @ GitLab

- Error message:

  ```
  git@gitlab.com: Permission denied (publickey).
  fatal: Could not read from remote repository.

  Please make sure you have the correct access rights
  and the repository exists.
  ```

- Solution: SSH キーを設定する@Ubuntu

1. `ls -l ~/.ssh/id_*.pub`
1. `ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"`
   - ここのメールアドレスは、GitLab の認証のやつにする
1. 保存名の変更（default のままで可）
1. passphrase の入力（空欄でも可能）
1. `sudo apt install xclip`
   - If you don't have it in your computer
1. `xclip -sel clip < ~/.ssh/id_rsa.pub`
1. GitLab のウェブサイト上で登録
   - Setting -> SSH Keys -> Key に貼り付け
1. `ssh -T git@gitlab.com`
   - `Welcome to GitLab!`と表示されていれば、成功している

## Good Tutorials

- [サルでもわかる](https://backlog.com/ja/git-tutorial/)
- [Atlassian](https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud)
- [Git Rebase vs Git Merge](http://www-creators.com/archives/1943)

## Git 管理すると何がいいの？

- バージョンを管理できる
- 他人との共同作業がやりやすくなる
- クラウドサービスや遠隔などへコードを送信できる

## Keywords

### revision

- https://qiita.com/chihiro/items/d551c14cb9764454e0b9
- https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection
- [サル先生のGit入門　ブランチの切り替え](https://backlog.com/ja/git-tutorial/stepup/03/)
-

```sh
git reflog

HEAD~
HEAD~~
HEAD^
HEAD^^
HEAD@{0}
HEAD@{1}
HEAD@{2}
```

### MISC

- index
- `HEAD`
- working tree
- fast-forward merge
  - マージされるブランチの HEAD をマージするブランチの先端にそのまま移動させるマージ
- `FETCH_HEAD`
- `ORIG_HEAD`
- "detached HEAD state"
- git blame

### Pull Request / Merge Request

- 「僕の作ったブランチをチェックして、master などに統合してくれ」という要望
- 新人エンジニアなどが、ベテランに依頼する。ベテランはコードをレビューし、問題がなければマージする
- GitHub では pull request, GitLab では Merge Request と呼ばれているが同じもの

### Subversion (svn)

- git と同じような古いツール。だが、今は多くの企業で git に取って代わられた



### SourceTree

- git の履歴などを可視化するツール
- CUI ではなく、GUI を使ったコミットやマージそのほかもできる
- Windows と Mac に対応（Linux には対応せず...）

### CI/CD: Continuous Integration + Continuous Deployment （もしくは Continuous Delivery）

- CI: push されたコードについて、自動でテストを行う機能。
- テストのし忘れなど防ぎ、コードの品質を保てる
- テストして問題があれば、merge されない
- 有名なツールは「Circle CI」「Jenkins」「GitLab」など
- Continuous Deployment では、テストで問題なければ本番環境へのデプロイも自動で行う


## Commit Message Format

- commitの内容をタグ付けし分類付けしたい。この代表例に[angularの推奨フォーマット]がある。
- 以下のような接頭辞をコミットメッセージにつける。
  - build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  - ci: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
  - docs: Documentation only changes
  - feat: A new feature
  - fix: A bug fix
  - perf: A code change that improves performance
  - refactor: A code change that neither fixes a bug nor adds a feature
  - test: Adding missing tests or correcting existing tests

## Git Flow

- Vincent Driessenという人が提唱した、Gitの開発フローの代表例。[日本語訳](http://keijinsonyaban.blogspot.com/2010/10/a-successful-git-branching-model.html)

５種類のブランチを作る。

- feature
  - featureへのマージ元：develop
  - featureからのマージ先：develop
  - 機能追加は、developからfeatureのブランチを切って行う。
  - 機能ごとに複数のfeatureブランチが並行することになる
- develop:
  - developへのマージ元： feature / release (バグ修正時) / hotfix (深刻なバグ修正時) / master (プロジェクト新規作成時)
  - developからのマージ先： feature /
  - featureからdevelopにプルリクを投げて開発していく。
  - ここに直接pushしてはいけない。常にfeatからマージする。
- release:
  - releaseへのマージ元: develop
  - releaseからのマージ先: develop, master
  - developブランチがひと段落したらから切る / マージする。
  - releaseブランチに直接pushしていいのは、バグ修正のみ。バグ修正したらdevelopにマージする。
  - 新しいリリースをするときは、releaseからmasterへマージする。
- hotfix:
  - hotfixへのマージ元: master
  - hotfixからのマージ先: master, develop
  - リリース後の重大なバグ修正のためのブランチ。修正したら、masterおよびdevelopにマージする。
- master
  - masterへのマージ元: release, hotfix
  - masterからのマージ先: hotfix / develop (新規作成時)
  - releaseブランチからマージする。
  - masterへのマージは、常にリリースである。
  - マージする際には、必ずタグを付ける。

## GitHub Flow

- Git Flowよりもシンプルで、二つのブランチからなる。
- topic branch
- master branch: masterブランチは常にリリースされる。


## Version Control Repository

### GitHub

- Pull Request
  - 作業用のブランチから、特定の他のブランチにマージしたいからコードに問題ないか確認してくれ！ってこと
  - 誰がレビューするのかアサインできる。
  - 行ごとにコメントできる。
  - ファイル単位でコメントできる。
  - request changeできる。
  - requestごとに`#3`みたいに番号が振られる。（URLを張ると、勝手にこの形式に置換される？）
  - コンフリクトなしでマージできるか、調べてくれる。
  - プルリクの修正：作業ブランチにプッシュすれば、プルリクにも勝手に追加される。
  - `+` / `-` で行のdiffが表示される。
- 権限
  - read access: view, clone, edit wiki
  - write access: view, clone, edit wiki, push
  - admin access: view, clone, edit wiki, push, manage members, manage repo
- Issue
  - 問題の指摘
  - 解決したらcloseできる。
  - プルリクにリンクできる。
  - プルリクにリンクすると、どの問題に対するfixのプルリクなのか明確化できる。[公式](https://docs.github.com/ja/free-pro-team@latest/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue)
  - プルリクにリンクすると、マージしたときに自動でissueがcloseされる。
  - Label: Issueに`bug`などのラベルを付けて分類できる。
  - Milestone: issueの対応期限を設定できる。
  - Assignee: 誰が対処するのか設定できる。
- Project
- GitHub Action
  - 参考：[さくらのナレッジ: GitHubの新機能「GitHub Actions」で試すCI/CD](https://knowledge.sakura.ad.jp/23478/)
  - CI/CDツール。
  - trigger: pushやプルリクなどのイベントや、定時実行などがある。
  - workflow: トリガーをもとにどのように処理するのか定めたもの。
  - action: 実際に実行されるアクション。自作もできるし、典型的なものが多数公開されてもいる。
  - プランによって、実行可能時間や並行可能なワークフローの数に様々な制限が課せられる。
- Wiki
- Insights
- Settings

### GitLab


### BitBucket

