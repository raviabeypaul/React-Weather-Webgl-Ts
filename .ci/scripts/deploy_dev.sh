#!/bin/sh
set -eux

source .ci/scripts/helpers.sh

SERVICE_NAME=logistics
ENVIRONMENT=Development
ENVIRONMENT_PREFIX=dev
AWS_PROFILE=logisticsDev
LAMBDA_SG=sg-03963f8bc1314fe39
APP_SUBNET_AZ_1=subnet-0e81b2268948cb11c
APP_SUBNET_AZ_2=subnet-09c519634959c0bf9
APP_SUBNET_AZ_3=subnet-0e1289fcf27a616b0
AWS_ACCOUNT_ID=558329439844
REGION=ap-southeast-1
WEBHOOK_QUEUE_ARN=arn:aws:sqs:ap-southeast-1:558329439844:logistics_dev_webhook_processor.fifo

echo "Deploying functions via Serverless Framework..."
serverless deploy --param="lambdaSg=$LAMBDA_SG" --param="appSubnetIdAz1=$APP_SUBNET_AZ_1" \
--param="appSubnetIdAz2=$APP_SUBNET_AZ_2" --param="appSubnetIdAz3=$APP_SUBNET_AZ_3" --param="envPrefix=$ENVIRONMENT_PREFIX" \
--param="deploymentRegion=$REGION" --param="serviceName=$SERVICE_NAME" --param="webhookQueueArn=$WEBHOOK_QUEUE_ARN"