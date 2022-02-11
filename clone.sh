#!/bin/bash
set -eu

# ======================================================
# set workloads
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


# イケてないので gh コマンドなどで自動化してやる
# ======================================================
# clone
# ======================================================
git clone git@github.com:Snails8/laravel-api.git
git clone git@github.com:Snails8/terraform-module.git
git clone git@github.com:Snails8/next-spa.git

# ======================================================
# source は挙動が不安定なので一旦手動で
# ======================================================
#source ~/.config/starship.toml # config/.fish に記載してあるので不要
#source ~/.config/fish/config.fish
#source ~/.zshrc

cat << END
**************************************************
DOTFILES SETUP FINISHED! Good Hack!
**************************************************
END
