***************** Mac ********************

1 - ./goinfre.sh
2 - ./docker_imgs.sh // launch eval $(docker-machine env default) in the trerminal || exit mysql bash;
3 - cd ./server && ./node.sh
4 - mv client test && ./react.sh // copy folder src pubilc .gitignore react.sh to new folder client
5 - cd ./client && ./react.sh
6 - cd ./server && npm run dev // to launch package currentlly...


eval $(docker-machine env default)

./docker_imgs.sh && cd server && ./node.sh && cd .. && mv client test && ./react.sh && cp ./test/react.sh ./client && cd client && ./react.sh && cd ../server && npm run dev


{mv client test & ./react.sh & ./client/react.sh & ./server/npm run dev}