

import { SQSClient, SendMessageCommand, ReceiveMessageCommand, DeleteMessageCommand, GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getSqsClient } from './getSqsClient';
import { getAwsCredentials } from './getAwsCredential';

async function getQueueUrl(queueName : string): Promise<string | undefined> {
    const command = new GetQueueUrlCommand({ QueueName: queueName });
    const client = await getSqsClient() 
    const response = await client.send(command);
    return response.QueueUrl;
}

export async function sendMessage({message, jobID}:{message:string,jobID:string}) {
    const credentials = await getAwsCredentials()
    const queueUrl = await getQueueUrl(credentials.sqsQueueName);
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(message),
      MessageGroupId: jobID,
      MessageDeduplicationId: jobID,
    };
  
    const command = new SendMessageCommand(params);
    const client = await getSqsClient()
    const response = await client.send(command);
    return response;
  }
  
  export async function receiveMessages():Promise<string | null> {
    const credentials = await getAwsCredentials()
    const queueUrl = await getQueueUrl(credentials.sqsQueueName);
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 1,
    };
  
    const command = new ReceiveMessageCommand(params);
    const sqsClient = await getSqsClient()
    const response = await sqsClient.send(command);
  
    if (response.Messages && response.Messages.length > 0) {
      const message = response.Messages[0];
      await deleteMessage(queueUrl, message.ReceiptHandle);
      return JSON.parse(message.Body!);
    }
  
    return null;
  }
  
  export async function deleteMessage({queueUrl, receiptHandle}:{queueUrl:string,receiptHandle: string}) {
    const params = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };
    const sqsClient = await getSqsClient()
    const command = new DeleteMessageCommand(params);
    await sqsClient.send(command);
  }
