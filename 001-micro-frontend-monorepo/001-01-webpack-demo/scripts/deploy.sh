#!/bin/bash
PROFILE=$1
ServiceName='onboarding' ## TODO 변경 필요
case $PROFILE in
  'dev')
    echo 'Development'
    ;;
  'prod')
    echo 'production'
    ;;
  'staging')
    echo 'Staging'
    ;;
  'local')
    echo 'Local'
    ;;
  *)
    echo -e "Invalid profile.\nValid Profile: prod, dev, staging\ne.g) $0 prod or $0 dev $0 staging $0 local"
    exit 0;
    ;;
esac

export NVM_DIR=$HOME/.nvm;
source "$NVM_DIR/nvm.sh";

nvm use 17.5.0

yarn install

# rm -rf deployList.txt
rm -rf ./dist && yarn "build:$PROFILE"

# DISTRIBUTION=$(command ls -al ./dist)
# TODAY=$(date)
# echo -e "$TODAY\n\n$DISTRIBUTION" > deployList.txt

# ./dist 안에 있는 모든 파일을 옮기면 됩니다.

if [ "${PROFILE}" == "local" ];then
  if [ ! -d ~/bundles ];then
    mkdir ~/bundles
  fi

  if [ ! -d ~/bundles/${ServiceName} ];then
      mkdir ~/bundles/${ServiceName}
  fi

  rm -rf ~/bundles/${ServiceName}/*.*
  cp -r ./dist/* ~/bundles/${ServiceName}
fi
