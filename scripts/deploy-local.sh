#! /bin/bash

npm run build

echo " "
echo "--------- DEPLOYING TO REMOTE SERVER ---------"

scp deploy.zip root@159.89.181.210:/root

ssh root@159.89.181.210 'cd /root && sh deploy-remote.sh && exit'

echo " "
echo "---------------- DEPLOY SUCCESS ---------------"
echo "|                                             |"
echo "| Deployed to remote server @ 159.89.181.210 |"
echo "|                                             |"
echo "| Check logs to confirm that the deploy       |"
echo "| was successfull.                            |"
echo "|                                             |"
echo "-----------------------------------------------"