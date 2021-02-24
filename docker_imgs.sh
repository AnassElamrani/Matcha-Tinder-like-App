# docker-machine start
# eval $(docker-machine env default)
docker run --name mysql -v ~/server/mysqlSharedVolume:/docker-entrypoint-initdb.d -e MYSQL_ROOT_PASSWORD=tiger -p 3306:3306 -d mysql
docker start mysql
### docker exec -it mysql bash


############################################################################################################
# if this some problem we can solvet with tis command 
# docker-machine stop
# screen ~/Library/Containers/com.docker.docker/Data/com.docker.driver.amd64-linux/tty
# umount /var/lib/docker/overlay2
# rm -rf /var/lib/docker
# docker-machine start default
############################################################################################################


docker run --name myadmin -d --link mysql:db -e PMA_ARBITRARY=1 -p 8080:80 phpmyadmin/phpmyadmin
docker start myadmin
