# dotfiles(各種設定ファイルの同期)
上記ファイルを同期するためのリポジトリ
## setup
```
 git clone git@github.com:Snails8/dotfiles.git
 source dotfiles/setup.sh
 ```
 ## 上記コマンドの仕組み

1.```setup.sh```が```.bash_profile```を実行

2.```.bash_profile```が```.bashrc```を実行

3.```.bashrc```が各種スクリプトを実行

4.```path```,```.aliases```,```.env-vars```,```.git-prompt.sh```,```.git-completion.bash```が適用される
