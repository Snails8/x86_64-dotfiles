
starship init fish | source

export LSCOLORS=Gxfxcxdxbxegedabagacad

# alias
alias m="make"
alias md="mkdir"

# command
abbr -a to touch

#atcoder
abbr -a ojt oj t -c \"python3 main.py\"
abbr -a acs acc submit main.py -- --guess-python-interpreter pypy

# Git
abbr -a g git

# docker
abbr -a d docker
abbr -a dc docker-compose 
abbr -a dcu docker-compose up 
abbr -a dcd docker-compose down
abbr -a dce docker-compose exec
abbr -a dcep docker-compose exec app php artisan 
abbr -a dcbash docker-compose exec app /bin/bash 

# phptest
abbr -a dtest docker-compose exec app vendor/bin/phpunit
abbr -a phptest vendor/bin/phpunit
abbr -a pa php artisan make

#Gi
#AWSP
function awsp
    AWS_PROFILE="$AWS_PROFILE" _awsp_prompt
    set selected_profile (cat ~/.awsp)
    set -xU AWS_PROFILE $selected_profile
end

#Atcoder
abbr -a acn acc new abc
abbr -a acu acc url
abbr -a .. cd ../..

#tmux
alias ide="~/.config/tmux/bin/ide.sh"
alias tmux="tmux -f ~/.config/tmux/.tmux.conf"
abbr -a tas tmux attach-session -t
abbr -a tm tmux
abbr -a tls tmux list-session

#Rust
abbr -a cr cargo run
abbr -a cb cargo build
abbr -a ccn cargo compete new abc
abbr -a cco cargo compete open
abbr -a cct cargo compete test
abbr -a ccs cargo compete submit

#Zellij
abbr -a zj zellij
abbr -a zls zellij list-sessions
abbr -a za zellij attach
#check global ip
abbr -a ip curl ipinfo.io

#setting
alias zcon="vim ~/.config/zellij/config.yaml"
alias fcon="vim ~/.config/fish/config.fish"
alias tcon="vim ~/.tmux.conf"
alias alcon="vim ~/.config/alacritty/alacritty.yml"
alias m="make"
alias tk="tmux kill-server"

# aws
abbr -a awsssm aws ecs update-service \
    --cluster example-cluster \
    --service example-service \
    --enable-execute-command

# peco
function fish_user_key_bindings
  bind \ct 'peco_select_history (commandline -b)'
end

#fish message
set fish_greeting
# Path to z 
set -g Z_SCRIPT_PATH /usr/local/etc/profile.d/z.sh
abbr -a j z

#switch (uname)

# set LOCAL_CONFIG (dirname (status --current-filename))/config-local.fish
# if test -f $LOCAL_CONFIG
#   source $LOCAL_CONFIG
# end

# starship init fish | source

