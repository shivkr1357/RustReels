#! /bin/bash

pm2 stop 0
rm -rf /apps/clashpot-com

mkdir temp
unzip /root/deploy.zip -d temp
cp -R /root/temp /apps/clashpot-com

rm -rf /root/temp

npm i --prefix /apps/clashpot-com
pm2 start 0
