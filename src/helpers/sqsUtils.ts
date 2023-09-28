import * as AWS from "aws-sdk";
import * as util from "util";
import { CONFIG } from "config";

export const sendMessage = async (queueUrl, message, messageGroupId) => {
  await AWS.config.update({ region: "ap-southeast-1" });
  const sqsClient = await new AWS.SQS({ apiVersion: "2012-11-05" });

  const params = {
    QueueUrl: queueUrl,
    MessageBody: message
  };

  if (messageGroupId != null) {
    params["MessageGroupId"] = messageGroupId;
  }

  console.log("params => ", params);

  const sqsSendMessage = util.promisify(sqsClient.sendMessage).bind(sqsClient);
  const sendMessageResponse = await sqsSendMessage(params);
  console.log("sendMessageResponse => ", sendMessageResponse);

  return sendMessageResponse;
};

export const deleteMessage = async (queueUrl, receiptHandle) => {
  await AWS.config.update({ region: "ap-southeast-1" });
  const sqsClient = await new AWS.SQS({ apiVersion: "2012-11-05" });

  const params = {
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle
  };

  const deleteMessageResponse = await sqsClient.deleteMessage(params).promise();
  console.log("deleteMessageResponse => ", deleteMessageResponse);

  return deleteMessageResponse;
};
