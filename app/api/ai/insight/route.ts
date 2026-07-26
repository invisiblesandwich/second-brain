import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

import { getAuthUser } from "@/lib/auth";
import { getDashboardContext } from "@/lib/dashboard";
import { prisma } from "@/lib/prisma";

const client = new HfInference(process.env.HUGGING_FACE_TOKEN);

const MODEL = "meta-llama/Llama-3.1-8B-Instruct";

export async function POST() {
  try {
    const auth = await getAuthUser();

    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { recentNotes, todayTasks, todayEvents } =
      await getDashboardContext(auth.userId);

    const prompt = `
You are the AI assistant for a Second Brain application.

Recent Notes:
${
  recentNotes.length
    ? recentNotes
        .map(
          (n) => `• ${n.title}
${n.content.slice(0, 250)}`
        )
        .join("\n\n")
    : "No recent notes."
}

Today's Tasks:
${
  todayTasks.length
    ? todayTasks
        .map(
          (t) => `• ${t.title}
Status: ${t.status}
Description: ${t.description}`
        )
        .join("\n\n")
    : "No tasks today."
}

Today's Events:
${
  todayEvents.length
    ? todayEvents
        .map(
          (e) => `• ${e.title}
${e.description}
${new Date(e.startTime).toLocaleTimeString()} - ${new Date(
            e.endTime
          ).toLocaleTimeString()}`
        )
        .join("\n\n")
    : "No events today."
}

Generate Today's Insight.

Rules:
- Maximum 120 words.
- Mention today's highest priority.
- Mention today's events.
- Mention if a note helps complete a task.
- Mention scheduling conflicts if any.
- Finish with one productivity suggestion.
`;

    const result = await client.chatCompletion({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an intelligent productivity assistant for a Second Brain application.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 220,
    });

    const insight =
      result.choices?.[0]?.message?.content ?? "No insight generated.";

    await prisma.dashboardInsight.upsert({
      where: {
        userId: auth.userId,
      },
      update: {
        insight,
      },
      create: {
        userId: auth.userId,
        insight,
      },
    });

    return NextResponse.json({
      success: true,
      insight,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate insight",
      },
      {
        status: 500,
      }
    );
  }
}


export async function GET() {
  const auth = await getAuthUser();

  if (!auth) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const insight = await prisma.dashboardInsight.findUnique({
    where: {
      userId: auth.userId,
    },
  });

  return NextResponse.json({
    success: true,
    insight: insight?.insight ?? null,
  });
}