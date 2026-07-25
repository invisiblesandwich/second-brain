import { getAuthUser } from "@/lib/auth";
import { embedItem } from "@/lib/embedItem";
import { invalidateDashboardInsight } from "@/lib/invalidateDashboardInsight";
import { prisma } from "@/lib/prisma";
import { notesSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = notesSchema.safeParse(body);

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
    const { title, content } = result.data;

    const NewNotes = await prisma.note.create({
      data: {
        title,
        content,
        userId: auth.userId,
      },
    });

    embedItem("note", NewNotes.id, content).catch((err) =>
      console.error("Embedding failed for note", NewNotes.id, err),
    );

    await invalidateDashboardInsight(auth.userId);

    return NextResponse.json(
      {
        success: true,
        message: "Note created successfully",
        note: NewNotes,
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
        message: "Error while creating notes",
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

    const notes = await prisma.note.findMany({
      where: {
        userId: auth.userId,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        notes,
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
