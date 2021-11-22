set -u

# 実行場所のディレクトリを取得
THIS_DIR=$(cd $(dirname $0); pwd)

cd $THIS_DIR
git submodule init
git submodule update

# dotfilesにあるドットファイルをfor文で回し、ホームディレクトリにシンボリックリンクを貼る
# 正規表現で「.??*」としておけば、先頭がドットで始まり、2文字以上のファイルを探索できる
# 探索したファイルを「continue」で個別にスキップできる 
echo "start setup..."

# ディレクトリ
for f in .??*/; do
    [ "$f" = ".git" ] && continue
    [ "$f" = ".gitconfig.local.template" ] && continue
    [ "$f" = ".require_oh-my-zsh" ] && continue
    [ "$f" = ".gitmodules" ] && continue
    [ "$f" = ".config" ] && continue
    ln -snfv ~/.dotfiles/"$f" ~/
done

#　ファイル
for f in .??*; do
    [ "$f" = ".git" ] && continue
    [ "$f" = ".gitconfig.local.template" ] && continue
    [ "$f" = ".require_oh-my-zsh" ] && continue
    [ "$f" = ".gitmodules" ] && continue
    [ "$f" = ".config" ] && continue
    [ "$f" = ".aws" ] && continue
    [ "$f" = ".ssh" ] && continue

    ln -snfv ~/.dotfiles/"$f" ~/
done

[ -e ~/.gitconfig.local ] || cp ~/dotfiles/.gitconfig.local.template ~/.gitconfig.local

# emacs set up
if which cask >/dev/null 2>&1; then
  echo "setup .emacs.d..."
  cd ${THIS_DIR}/.emacs.d
  cask upgrade
  cask install
fi

cat << END

**************************************************
DOTFILES SETUP FINISHED! bye.
**************************************************

END
