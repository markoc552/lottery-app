#!/bin/bash

BUILD_GUI=false
START_CONTAINERS=false
STOP_CONTAINERS=false

while [[ $# -gt 0 ]]
do
  key="$1"
  case $key in
    --build|-b)
     BUILD_GUI=true
     BUILD_NGINX=true
     echo "Build gui and nginx set to: $BUILD_GUI"
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