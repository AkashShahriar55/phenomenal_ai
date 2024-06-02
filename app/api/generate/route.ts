import { NextResponse } from "next/server";
import { receiveMessages, sendMessage } from "@/app/util/sqsClientUtils"
import { v4 as uuidv4 } from "uuid";
import { getS3Client } from '@/app/util/getS3Client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client } from '@aws-sdk/client-s3';
import { getAwsCredentials} from '@/app/util/getAwsCredential';

export async function POST(req: Request) {
  try {
    // const { userId } = auth(); // get the user ID from the session (Clerk)
    const body = await req.json(); // get the request body
    const { prompt }: { prompt: string } = body; // get the messages from the request body

    const jobID = uuidv4();

    // // if the user ID is not valid, return an unauthorized response
    // if (!userId) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }


    // if the messages are not valid, return a bad request response
    if (!prompt) {
      return new NextResponse("Prompts are required", { status: 400 });
    }

    // const freeTrial = await checkApiLimit(); // check if the user is on a free trial
    // const isPro = await checkSubscription(); // check if the user is on a pro subscription

    // // if the user is not on a free trial and not on a pro subscription, return a forbidden response
    // if (!freeTrial && !isPro) {
    //   return new NextResponse(
    //     "Free trial has expired. Please upgrade to pro.",
    //     { status: 403 }
    //   );
    // }


    const response = await sendMessage({
      prompt: prompt,
      duration: 4,
      jobID: jobID
    })

    console.log(response)

    const data = await receiveMessages(jobID)
    console.log(data)

    const name = jobID + ".mp4"

    const s3Client2 = new S3Client({
      region: "us-east-1",  
      credentials: await getAwsCredentials(),
    });

    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: name as string,
    });


    let url
    try {
      const s3Client = await getS3Client()
      url = await getSignedUrl(s3Client2, command, { expiresIn: 3600 }); // URL expires in 1 hour
      console.log(url)
    } catch (error) {
      console.error(error);
    }


    // // if the user is not on a pro subscription, increment the API limit
    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    return NextResponse.json({url,name});
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
