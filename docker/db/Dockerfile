FROM mariadb
MAINTAINER  In-Ho Choi <revaer@naver.com>

ENV MYSQL_ROOT_PASSWORD=root

RUN apt-get update &&\
    apt-get install -y --force-yes wget --no-install-recommends &&\
    wget -P /docker-entrypoint-initdb.d --no-check-certificate https://raw.githubusercontent.com/InhoChoi/score-server/master/api/sql/database.sql &&\
    apt-get -y autoremove wget

EXPOSE 3036
