#!/bin/bash
set -eu

# ======================================================
# homebrew がインストールされていない場合インストール(どこで実行してもok )
# ======================================================
if [ ! -f /usr/local/bin/brew ]; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  echo "Homebrew has already installed."
fi

# ======================================================
# dotfile ないときはgit clone
# ======================================================
if [ ! -d ~/dotfiles ]; then
  cd ~
  git clone git@github.com:Snails8/dotfiles.git
else
  echo "dotfile is already exist."
fi

# ======================================================
# # set workloads
# ======================================================
if [ ! -d ~/works ]; then
  mkdir ~/works
fi

if [ ! -d ~/works/private ]; then
  mkdir ~/works/private
fi

# ======================================================
# install software from BrewBundle.
# ======================================================
brew bundle -v --file=~/dotfiles/Brewfile

# if .config has not made ,error will occur.
if [ ! -d ~/.config ]; then
  mkdir ~/.config
fi

# ======================================================
# symlink each config file.

# ex) stow -v -d ~/dotfiles/packages/termial/ -t ~ fish
# ex) ~/dotfiles/packages/termial/fish/.config/fish/*  -> root + .config/fish/*
# root/.config/fish 配下にシンボリックリンクが作成される (衝突しない)
# ======================================================
stow -v -d ~/dotfiles/packages/terminal -t ~ alacritty starship tmux zshrc  gitconfig
stow -v -d ~/dotfiles/packages/editor -t ~ vimrc vscode
stow -v -d ~/dotfiles/packages/window_tool -t ~ skhd yabai

cat << END
**************************************************
DOTFILES SETUP FINISHED! Good Hack!
**************************************************
END