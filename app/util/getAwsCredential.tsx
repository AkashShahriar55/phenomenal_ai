import { zero } from '@zerosecrets/zero';

interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sqsQueueInputName:string;
  sqsQueueOutputName:string;
}

let credentials: AwsCredentials | undefined;

export async function getAwsCredentials(): Promise<AwsCredentials> {
  // Reuse the same credentials if they have already been retrieved, so that we
  // don't call Zero on every request
  if (credentials) {
    return credentials;
  }

  if (!process.env.ZERO_TOKEN) {
    throw new Error(
      'Did you forget to set the ZERO_TOKEN environment variable?'
    );
  }

  const secrets = await zero({
    token: process.env.ZERO_TOKEN,
    pick: ['aws'],
  }).fetch();

  if (!secrets.aws) {
    throw new Error('Did not receive an AWS secret.');
  }

  credentials = {
    accessKeyId: secrets.aws.aws_access_key_id,
    secretAccessKey: secrets.aws.aws_secret_access_key,
    sqsQueueInputName: secrets.aws.sqs_queue_input_name,
    sqsQueueOutputName: secrets.aws.sqs_queue_output_name
  };

  return credentials;
}