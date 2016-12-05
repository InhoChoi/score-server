FROM golang
MAINTAINER In-Ho Choi <revaer@naver.com>

RUN apt-get update &&\
    git clone https://github.com/inhochoi/score-server &&\
    cd score-server/api &&\
    go get github.com/gin-gonic/gin &&\
    go get github.com/go-sql-driver/mysql &&\
    go get github.com/itsjamie/gin-cors &&\
    go build

EXPOSE 8080

CMD ./score-server/api/api --DBUrl score-db:3306
