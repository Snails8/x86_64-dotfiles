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

if [ ! -f ~/.gitconfig.local ]; then
  touch ~/.gitconfig.local
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
# nodebrew がインストールされていない場合インストール (alfred で使用)
# ======================================================
if [ ! -f /usr/local/bin/nodebrew ]; theni
  nodebrew setup
  nodebrew install-binary stablei
  nodebrew use v16.14.0
  echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH' >> ~/.zprofilei
  source ~/.zprofile
else
  echo "nodejs has already installed."
fi

# ======================================================
# install software from oh-my-zsh & oh-my-fish.
# ======================================================
if [ ! -d ~/.oh-my-zsh ]; then
  curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh
fi

# oh-my-fish   https://github.com/oh-my-fish/oh-my-fish
if [ ! -d ~/.local/share/omf/ ]; then
  curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
fi

# ======================================================
# symlink each config file.

# ex) stow -v -d ~/dotfiles/packages/termial/ -t ~ fish
# ex) ~/dotfiles/packages/termial/fish/.config/fish/*  -> root + .config/fish/*
# root/.config/fish 配下にシンボリックリンクが作成される (衝突しないし、上書きもできる)
# karabiner の設定
# ======================================================
stow -v -d ~/dotfiles/packages/terminal -t ~ alacritty starship tmux iterm2 zshrc fish oh_my_fish thefuck gitconfig
stow -v -d ~/dotfiles/packages/editor -t ~ vimrc vscode
stow -v -d ~/dotfiles/packages/window_tool -t ~ yabai
stow -v -d ~/dotfiles/packages/keybind -t ~ skhd karabiner

# ======================================================
# source は挙動が不安定なので一旦手動で
# ======================================================
#source ~/.config/starship.toml # config/.fish に記載してあるので不要
#source ~/.config/fish/config.fish
#source ~/.zshrc

# =====================================================
# yabai & skhd
# =====================================================
brew services start yabai
brew services start skhd

cat << END
**************************************************
DOTFILES SETUP FINISHED! Good Hack!
**************************************************
END
