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

## setup.sh
ホームディレクトリにシンボリックリンクを作成、```.bash_profile```を実行。

## .bash_profile
```.bashrc```を読み込む
```
if [[ -r .bashrc ]]; then
  source .bashrc;
fi
```

## .bashrc
変数```execute_files```にファイル名を代入、それらを実行
```
# dotfiles/.bashrc
execute_files=(~/dotfiles/.{path,aliases,env-vars,git-prompt.sh,git-completion.bash})
for file in ${execute_files[@]}; do # 読込ファイルを配列で取得
  [ -r "$file" ] && source "$file"; # ファイルが読込可能なら実行
done
```
