#!/bin/sh

declare -a configKey
declare -a configVal

configKey[0]="AWS_REGION"
configVal[0]="changeMe"

configKey[1]="DATABASE_URL"
configVal[1]="changeMe"

configKey[2]="DATABASE_NAME"
configVal[2]="changeMe"

for i in "${!configKey[@]}"
do
  # echo "key  : $i    value: ${config[$i]}"
  key=${configKey[$i]}
  val=${configVal[$i]}
  echo "index: $i  key: $key    value: $val"

  aws ssm put-parameter --profile csStage --region ap-southeast-1 --overwrite --type "String" \
    --name $key \
    --value $val
done

echo "Done. Pushed configurations to AWS parameter store in stage environment."
