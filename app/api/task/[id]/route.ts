import { getAuthUser } from "@/lib/auth";
import { embedItem } from "@/lib/embedItem";

import { prisma } from "@/lib/prisma";

import { taskSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

type RouterContext = {
  params: Promise<{ id: string }>;
};
export async function GET(req: NextRequest, { params }: RouterContext) {
  try {
    const { id } = await params;
    const auth = await getAuthUser();

    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "task not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        task,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error geting one task",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouterContext) {
  try {
    const { id } = await params;
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
    const { title, description, dueDate, status } = result.data;

    const auth = await getAuthUser();

    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "task not found",
        },
        {
          status: 404,
        },
      );
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title: title,
        description: description,
        dueDate: dueDate ?? task.dueDate,
        status: status ?? task.status,
      },
    });
    embedItem(
      "task",
      updatedTask.id,
      `${updatedTask.title}\n${updatedTask.description}`,
    ).catch((err) =>
      console.error("Embedding failed for task", updatedTask.id, err),
    );

    return NextResponse.json(
      {
        success: true,
        message: "task updated successfully",
        updatedTask,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in updating task",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouterContext) {
  try {
    const { id } = await params;

    const auth = await getAuthUser();

    if (!auth) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          message: "task not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "task deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in deleting task",
      },
      {
        status: 500,
      },
    );
  }
}
