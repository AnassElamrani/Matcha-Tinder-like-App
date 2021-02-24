# rm -rf .docker
# rm -rf goinfre/.brew
# rm -rf goinfre/.docker
# rm -rf goinfre
# ln -s ../../goinfre/hseffian/ goinfre
# rm -rf $HOME/.brew && git clone --depth=1 https://github.com/Homebrew/brew $HOME/.brew && echo 'export PATH=$HOME/.brew/bin:$PATH' >> $HOME/.zshrc && source $HOME/.zshrc && brew update
# mv .brew goinfre/.brew
# # rm -rf /Users/hseffian/Library/Caches/Homebrew/*
# ln -s goinfre/.brew .brew
# brew install node
# brew reinstall docker
# brew reinstall docker-machine
# docker-machine stop
# docker-machine rm -f default
# curl https://github.com/boot2docker/boot2docker/releases/download/v19.03.12/boot2docker.iso -o boot2docker.iso
# mv boot2docker.iso goinfre/.docker/machine/cache/
# ocker-machine create --driver virtualbox default
# mv .docker goinfre
# ln -s goinfre/.docker .docker