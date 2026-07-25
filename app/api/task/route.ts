import { getAuthUser } from "@/lib/auth";
import { embedItem } from "@/lib/embedItem";
import { invalidateDashboardInsight } from "@/lib/invalidateDashboardInsight";
import { prisma } from "@/lib/prisma";
import { taskSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = taskSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }
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

    const { title, description, dueDate } = result.data;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: dueDate ?? null,
        userId: auth.userId,
      },
    });

    embedItem("task", newTask.id, `${title}\n${description}`).catch((err) =>
      console.error("Embedding failed for task", newTask.id, err),
    );

    await invalidateDashboardInsight(auth.userId);
    return NextResponse.json(
      {
        success: true,
        message: "task created successfully",
        task: newTask,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in generating task",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req: NextRequest) {
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

    const tasks = await prisma.task.findMany({
      where: {
        userId: auth.userId,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(
      {
        success: true,
        tasks,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error geting notes",
      },
      {
        status: 500,
      },
    );
  }
}
