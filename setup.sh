# dotfile以下の設定ファイルをすべてホームディレクトリ配下にシンボリックリンクするshell`
echo "DOTFILES SETUP START!"

for f in .??*; do
    [ "$f" = ".git" ] && continue
    ln -snfv ~/dotfiles/"$f" ~/
done

echo "DOTFILES SETUP FINISHED! bye."
