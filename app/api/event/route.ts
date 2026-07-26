import { getAuthUser } from "@/lib/auth";
import { embedItem } from "@/lib/embedItem";

import { prisma } from "@/lib/prisma";
import { eventSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
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

    const { title, description, startTime, endTime } = result.data;

    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        startTime,
        endTime,
        userId: auth.userId,
      },
    });

    embedItem("event", newEvent.id, `${title}\n${description}`).catch((err) =>
      console.error("Embedding failed for event", newEvent.id, err),
    );


    return NextResponse.json(
      {
        success: true,
        message: "event created successfully",
        event: newEvent,
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
        message: "Error in generating event",
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

    const Events = await prisma.event.findMany({
      where: {
        userId: auth.userId,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(
      {
        success: true,
        Events,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error geting events",
      },
      {
        status: 500,
      },
    );
  }
}
