import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { getAuthUser } from "@/lib/auth";
import { retrieveChunks } from "../../../../lib/retrieveChunks";

const client = new HfInference(process.env.HUGGING_FACE_TOKEN);
const MODEL = "meta-llama/Llama-3.1-8B-Instruct";

export async function POST(req: NextRequest) {
  try {
    
    const auth = await getAuthUser();
    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { question } = await req.json();
    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { success: false, message: "Question required" },
        { status: 400 },
      );
    }

    const chunks = await retrieveChunks(question, auth.userId, 5);

    if (chunks.length === 0) {
      return NextResponse.json({
        success: true,
        answer: "I couldn't find anything relevant in your notes yet.",
        sources: [],
      });
    }

    const context = chunks
      .map((c, i) => `[${i + 1}] (${c.title}): ${c.chunkText}`)
      .join("\n\n");

    const result = await client.chatCompletion({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You answer questions using ONLY the provided notes context. If the context doesn't contain the answer, say so honestly. Cite which note number you used.",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
      max_tokens: 400,
      temperature: 0.3,
    });

    return NextResponse.json({
      success: true,
      answer: result.choices[0].message.content,
      sources: chunks.map((c) => ({ noteId: c.noteId, title: c.title })),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error answering question" },
      { status: 500 },
    );
  }
}
