#!/bin/bash
set -eu

# homebrew がインストールされていない場合インストール(どこで実行してもok )
if [ ! -f /usr/local/bin/brew ]; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  echo "Homebrew has installed."
fi

#dotfile ないときはgit clone
#if [ ! -d ~/dotfiles ]; then
#  cd ~
#  git clone git@github.com:comu2e/dotfiles.git
#else
#  echo "dotfile is already exist."
#fi

# install software from BrewBundle.
brew bundle -v --file=~/Brewfile

# if .config has not made ,error will occur.
#if [ ! -d ~/.config ]; then
#  mkdir ~/.config
#fi

# symlink each config file.
# root の場所を指定した上で実行

# ex) stow -v -d ~/dotfiles/packages/termial/ -t ~ fish
# ex) ~/dotfiles/packages/termial/fish/.config/fish/*  -> root + .config/fish/*
# root/.config/fish 配下にシンボリックリンクが作成される (衝突しない)

stow -v -d ~/.myconfig/packages/terminal -t ~ alacritty starship tmux zshrc skhdrc gitconfig vimrc
#stow -v -d ~/dotfiles/packages/virual_environment/ -t ~ docker
#stow -v -d ~/dotfiles/packages/versioning -t ~ git-templates
#stow -v -d ~/dotfiles/packages/editor -t ~ coc nvim
#stow -v -d ~/dotfiles/packages/wm -t ~ limelight yabai
#stow -v -d ~/dotfiles/packages/keybindings -t ~ karabiner
#ln -sf "~/.config/yabai/yabairc" "~/.yabairc"
#ln -sf "~/.config/yabai/skhdrc" "~/.skhdrc"

cat << END
**************************************************
DOTFILES SETUP FINISHED! bye.
**************************************************
END