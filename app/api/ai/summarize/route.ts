import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { getAuthUser } from "@/lib/auth";

const client = new HfInference(process.env.HUGGING_FACE_TOKEN);

const MODEL = "meta-llama/Llama-3.1-8B-Instruct"; 

export async function POST(req: NextRequest) {
  try {
     const auth = await getAuthUser();
        if (!auth) {
          return NextResponse.json(
            {
              success: false,
              message: "Unauthorized",
            },
            { status: 401 },
          );
        }
    const { content } = await req.json();

    const result = await client.chatCompletion({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant. Summarize notes in 3-5 bullet points.",
        },
        {
          role: "user",
          content,
        },
      ],
      max_tokens: 200,
      temperature: 0.3,
    });
    console.log(result);
    return NextResponse.json({
      summary: result.choices[0].message.content,
    });
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}