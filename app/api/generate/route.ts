import { NextRequest, NextResponse } from "next/server";
import { receiveMessages, sendMessage } from "@/app/util/sqsClientUtils"
import { v4 as uuidv4 } from "uuid";
import { getS3Client } from '@/app/util/getS3Client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client } from '@aws-sdk/client-s3';
import { getAwsCredentials } from '@/app/util/getAwsCredential';

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("request ---- > " + req.method)
  try {
    // const { userId } = auth(); // get the user ID from the session (Clerk)
    const body = await req.json(); // get the request body
    const { prompt,duration }: { prompt: string,duration:string } = body; // get the messages from the request body

    const jobID = uuidv4();


    // if the messages are not valid, return a bad request response
    if (!prompt) {
      return NextResponse.json({ error: "Prompts are required" }, { status: 400 });
    }




    const response = await sendMessage({
      prompt: prompt,
      duration: duration,
      jobID: jobID
    })


    if (response.MessageId) {
      return NextResponse.json({ jobID });
    } else {
      return NextResponse.json({ error: "Generation failed" }, { status: 400 });
    }


  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return NextResponse.json({ error: `some error occured : ${error}` }, { status: 500 });
  }

}


export async function GET(req: NextRequest) {
  try {
    const reqUrl = new URL(req.url)

    const searchParams = new URLSearchParams(reqUrl.searchParams)
    const jobID = searchParams.get('jobID')

    
    console.log("here is jobid ---- > " + jobID)
    if (!jobID) {
      return NextResponse.json({ error: "Jobs are required" }, { status: 400 });
    }

    const data = await receiveMessages(jobID)
    console.log(data)

    if (!data) {
      return NextResponse.json({ error: "data not there" }, { status: 404, statusText:"NULL" });
    }else if(data.status == "Failed"){
      return NextResponse.json({ error: data?.description }, { status: 400 ,statusText:"Failed"});
    }


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
      url = await getSignedUrl(s3Client2, command, { expiresIn: 60 * 60 * 24 }); // URL expires in 1 day
      console.log(url)
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }


    // // if the user is not on a pro subscription, increment the API limit
    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    console.log({ url, name })

    return NextResponse.json({ url, name });

  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return NextResponse.json({ error: `some error occured : ${error}` }, { status: 500 });
  }

}
