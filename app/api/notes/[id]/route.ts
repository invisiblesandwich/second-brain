import { getAuthUser } from "@/lib/auth";
import { embedItem } from "@/lib/embedItem";
import { invalidateDashboardInsight } from "@/lib/invalidateDashboardInsight";
import { prisma } from "@/lib/prisma";
import { notesSchema } from "@/lib/validations";
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

    const note = await prisma.note.findUnique({
      where: {
        id,
        userId: auth?.userId,
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          message: "notes not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        note,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error geting one notes",
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
    const { title, content } = result.data;

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

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          message: "Note not found",
        },
        {
          status: 404,
        },
      );
    }

    const updatedNote = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });
    embedItem("note", updatedNote.id, content).catch((err) =>
      console.error("Embedding failed for note", updatedNote.id, err),
    );
    await invalidateDashboardInsight(auth.userId);
    return NextResponse.json(
      {
        success: true,
        message: "Note updated successfully",
        updatedNote,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in updating notes",
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

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!note) {
      return NextResponse.json(
        {
          success: false,
          message: "Note not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.note.delete({
      where: {
        id,
      },
    });

    await invalidateDashboardInsight(auth.userId);

    return NextResponse.json(
      {
        success: true,
        message: "Note deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in deleting notes",
      },
      {
        status: 500,
      },
    );
  }
}
