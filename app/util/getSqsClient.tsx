import { SQSClient, GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getAwsCredentials} from './getAwsCredential';

let sqsClient: SQSClient | undefined;



export async function getSqsClient(): Promise<SQSClient> {
  if (sqsClient) {
    return sqsClient;
  }

  sqsClient = new SQSClient({
    region: process.env.MY_AWS_REGION,
    credentials: await getAwsCredentials(),
  });

  return sqsClient;
}
