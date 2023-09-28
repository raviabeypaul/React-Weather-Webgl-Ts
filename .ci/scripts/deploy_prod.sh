
#!/bin/sh
set -eux

source .ci/scripts/helpers.sh

SERVICE_NAME=logistics
ENVIRONMENT=Production
ENVIRONMENT_PREFIX=prod
AWS_PROFILE=logisticsProd
LAMBDA_SG=sg-0778cab644dde3a78
APP_SUBNET_AZ_1=subnet-07e503e9d63b0546e
APP_SUBNET_AZ_2=subnet-00d863b77d66f9366
APP_SUBNET_AZ_3=subnet-02eeb8a4d51e98630
AWS_ACCOUNT_ID=491832140992
REGION=ap-southeast-1
WEBHOOK_QUEUE_ARN=arn:aws:sqs:ap-southeast-1:491832140992:logistics_prod_webhook_processor.fifo

echo "Deploying functions via Serverless Framework..."
serverless deploy --param="lambdaSg=$LAMBDA_SG" --param="appSubnetIdAz1=$APP_SUBNET_AZ_1" \
--param="appSubnetIdAz2=$APP_SUBNET_AZ_2" --param="appSubnetIdAz3=$APP_SUBNET_AZ_3" --param="envPrefix=$ENVIRONMENT_PREFIX" \
--param="deploymentRegion=$REGION" --param="serviceName=$SERVICE_NAME" --param="webhookQueueArn=$WEBHOOK_QUEUE_ARN"