# dotfiles(各種設定ファイルの同期)
## setup

```shell
$ curl -o - https://raw.githubusercontent.com/Snails8/dotfiles/main/install.sh | sh
```
```
$ cd dotfiles
$ chmod +x install.sh
$ make install
```

window management tool
```shell
$ brew start services skhd
$ brew start services yabai
```

Brew の同期
```shell
# 存在していると作成できないので一旦削除したあと実行
$ brew bundle dump
```
