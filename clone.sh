#!/bin/bash
set -eu

# ======================================================
# set workloads
# ======================================================
if [ ! -f ~/.gitconfig.local ]; then
  touch ~/.gitconfig.local
fi

# ======================================================
# clone
# ======================================================
if [ ! -d ~/works ]; then
  mkdir ~/works
fi

if [ ! -d ~/works/private ]; then
  mkdir ~/works/private

  cd ~/works/private
  gh repo list Snails8d | awk '{print $1}' |xargs -I {} git clone http://github.com/{}
  # gh repo list Snails8d | awk '{print $1}' |xargs -I {} cat {}

fi

cat << END
**************************************************
DOTFILES SETUP FINISHED! Good Hack!
**************************************************
END