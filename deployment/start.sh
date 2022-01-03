#!/bin/bash

BUILD_GUI=false
DEPLOY_CONTRACT=false
START_CONTAINERS=false
STOP_CONTAINERS=false

while [[ $# -gt 0 ]]
do
  key="$1"
  case $key in
    --build|-b)
     BUILD_GUI=true
     BUILD_NGINX=true
     DEPLOY_CONTRACT=true
     echo "Build gui and deploy contract set to: $BUILD_GUI"
     ;;
    --stop)
     STOP_CONTAINERS=true
     echo "Stopping containers: $STOP_CONTAINERS"
     ;;
    --start|-s)
     START_CONTAINERS=true
     echo "Start application set to: $START_CONTAINERS"
     ;;
    *)
     echo "Invalid key: $key"
     exit 1;
     ;;
   esac
   shift
 done

 echo
 echo

 function deployContract() {
   npm install --g truffle
   cd src/ethereum

   CONTRACT_DATA="`truffle migrate --network test | grep 'contract address:'`"
   CONTRACT_ADDRESS=${CONTRACT_DATA:92:125}

   CONTAINER_DATA="`docker ps | grep truffle`" 
   CONTAINER_ID=${CONTAINER_DATA:0:12}

   WALLET_DATA="`docker logs ${CONTAINER_ID} | grep '(0)'`"
   WALLET_ADDRESS=${WALLET_DATA:4:42}
   WALLET_PRIVATE_KEY=${WALLET_DATA:61:128}

   echo "Contract deployed with address: $CONTRACT_ADDRESS and owner: $WALLET_ADDRESS"
}

 function buildGui() {
   cd ../gui
   docker build -t lottery_client .
 }

 function startContainers() {
   docker-compose up -d #start db,gui and nginx

   cd ../deployment

   docker-compose up -d #start blockchain network
 }

 function stopContainers() {
   docker-compose down #stop db,gui and nginx
 }

 start=`date +%s`

 if [ $STOP_CONTAINERS == true ]; then
   stopContainers
 fi

 if [ $DEPLOY_CONTRACT == true ]; then
   deployContract
 fi

 if [ $BUILD_GUI == true ]; then
   buildGui
 fi

 if [ $START_CONTAINERS == true ]; then
   stopContainers
   startContainers
 fi

end=`date +%s`

runtime=$((end-start))

echo
echo "Total time to start infrastructure: $runtime sec"

exit 0;