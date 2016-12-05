FROM node:6.9.1
MAINTAINER In-Ho Choi <revaer@naver.com>

RUN apt-get update &&\
    apt-get install git &&\
    git clone https://github.com/inhochoi/score-server &&\
    cd score-server/front &&\
    npm install

WORKDIR "/score-server/front"

EXPOSE 9000

CMD ["npm", "run", "server"]
