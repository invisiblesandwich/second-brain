import { getAuthUser } from "@/lib/auth";
import { embedItem } from "@/lib/embedItem";

import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validations";
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

    const event = await prisma.event.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "event not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        event,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error geting one event",
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
    const result = eventSchema.safeParse(body);

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
    const { title, description, startTime, endTime } = result.data;

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

    const event = await prisma.event.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "event not found",
        },
        {
          status: 404,
        },
      );
    }

    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        title: title,
        description: description,
        startTime: startTime,
        endTime: endTime,
      },
    });
    embedItem(
      "event",
      updatedEvent.id,
      `${updatedEvent.title}\n${updatedEvent.description}`,
    ).catch((err) =>
      console.error("Embedding failed for event", updatedEvent.id, err),
    );

    return NextResponse.json(
      {
        success: true,
        message: "event updated successfully",
        updatedEvent,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in updating event",
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

    const event = await prisma.event.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "event not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.event.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "event deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in deleting event",
      },
      {
        status: 500,
      },
    );
  }
}
