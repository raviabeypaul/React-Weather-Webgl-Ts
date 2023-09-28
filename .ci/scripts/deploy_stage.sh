#!/bin/sh
set -eux

source .ci/scripts/helpers.sh

SERVICE_NAME=logistics
ENVIRONMENT=Staging
ENVIRONMENT_PREFIX=stage
AWS_PROFILE=logisticsStage
LAMBDA_SG=sg-0cecfed5727e84234
APP_SUBNET_AZ_1=subnet-0946cd3830b0c9dbd
APP_SUBNET_AZ_2=subnet-0f7e30abdf93049e3
APP_SUBNET_AZ_3=subnet-0d6b9a50857d7bab7
AWS_ACCOUNT_ID=931413012527
REGION=ap-southeast-1
WEBHOOK_QUEUE_ARN=arn:aws:sqs:ap-southeast-1:931413012527:logistics_stage_webhook_processor.fifo

echo "Deploying functions via Serverless Framework..."
serverless deploy --param="lambdaSg=$LAMBDA_SG" --param="appSubnetIdAz1=$APP_SUBNET_AZ_1" \
--param="appSubnetIdAz2=$APP_SUBNET_AZ_2" --param="appSubnetIdAz3=$APP_SUBNET_AZ_3" --param="envPrefix=$ENVIRONMENT_PREFIX" \
--param="deploymentRegion=$REGION" --param="serviceName=$SERVICE_NAME" --param="webhookQueueArn=$WEBHOOK_QUEUE_ARN"