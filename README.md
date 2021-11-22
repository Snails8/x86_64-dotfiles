# dotfiles(各種設定ファイルの同期)
上記ファイルを同期するためのリポジトリ
## setup
```
$ cd .dotfiles
$ chmod +x install.sh
$ sh install.sh
```

## install.sh
ホームディレクトリ配下にcloneしたdotfilesリポジトリ配下の設定ファイルを
i全てホームディレクトリ配下にシンボリックリンクするShell

## install.shの実行する場所
.dotfiles に移動後行う

[注意]
既存のファイルが有る場合、 干渉して消えてしまうのでそこだけ注意
