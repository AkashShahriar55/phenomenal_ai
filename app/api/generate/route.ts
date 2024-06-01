import { NextResponse } from "next/server";
import {sendMessage} from "@/app/util/sqsClientUtils"


export async function POST(req: Request) {
  try {
    // const { userId } = auth(); // get the user ID from the session (Clerk)
    const body = await req.json(); // get the request body
    const { prompt }:{prompt:string} = body; // get the messages from the request body

    const jobId = "1"

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
      message:prompt,
      jobID:jobId
    })
   

    console.log(response)

    // // if the user is not on a pro subscription, increment the API limit
    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    return NextResponse.json(response);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
