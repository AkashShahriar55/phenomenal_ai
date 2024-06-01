import { SQSClient, GetQueueUrlCommand } from '@aws-sdk/client-sqs';
import { getAwsCredentials} from './getAwsCredential';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

let s3Client: S3Client | undefined;



export async function getS3Client(): Promise<S3Client> {
  if (s3Client) {
    return s3Client;
  }

  s3Client = new S3Client({
    region: process.env.MY_AWS_REGION,  
    credentials: await getAwsCredentials(),
  });

  return s3Client;
}
