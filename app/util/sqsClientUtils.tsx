

import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand, GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getSqsClient } from './getSqsClient';
import { getAwsCredentials } from './getAwsCredential';
import { Consumer } from "sqs-consumer";
import { sleep } from '@/lib/utils';

interface SQSParams {
  jobID: string;
  duration: string;
  prompt: string;
}

interface SQSResponse {
  jobID: string;
  status: string;
  s3_path: string;
  description: string[];
}

async function getQueueUrl(queueName: string): Promise<string | undefined> {
  const command = new GetQueueUrlCommand({ QueueName: queueName });
  const client = await getSqsClient()
  const response = await client.send(command);
  return response.QueueUrl;
}

export async function sendMessage(parameters: SQSParams) {
  const credentials = await getAwsCredentials()
  const queueUrl = await getQueueUrl(credentials.sqsQueueInputName);
  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(parameters),
    MessageGroupId: parameters.jobID,
    MessageDeduplicationId: parameters.jobID,
  };

  const command = new SendMessageCommand(params);
  const client = await getSqsClient()
  const response = await client.send(command);
  console.log(response)
  return response;
}

export async function receiveMessages(jobID: string): Promise<SQSResponse | null> {
  const credentials = await getAwsCredentials()
  const queueUrl = await getQueueUrl(credentials.sqsQueueOutputName);
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages:10
  };


  const command = new ReceiveMessageCommand(params);
  const sqsClient = await getSqsClient()


  let data: SQSResponse | null = null


  const response = await sqsClient.send(command);
  console.log(response)

  if (response.Messages && response.Messages.length > 0) {
    for(let i = 0 ; i < response.Messages.length ; i++ ){
      const message = response.Messages[i];
      const receiptHandle = message.ReceiptHandle
      if (message.Body) {
        const value = JSON.parse(message.Body)
        if (value.jobID == jobID) {
          data = value
          await deleteMessage({ queueUrl, receiptHandle });
          break
        }
      }
    }
  }

  console.log(data)
  return data
}

export async function deleteMessage({ queueUrl, receiptHandle }: { queueUrl: string | undefined, receiptHandle: string | undefined }) {
  const params = {
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle,
  };
  const sqsClient = await getSqsClient()
  const command = new DeleteMessageCommand(params);
  await sqsClient.send(command);
}