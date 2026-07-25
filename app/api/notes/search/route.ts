import { getAuthUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    const page = Number(searchParams.get("page")) || 1;

    const limit = Number(searchParams.get("limit")) || 10;

    const sort = searchParams.get("sort") || "updatedAt";

    const order = searchParams.get("order") === "asc" ? "asc" : "desc";

    const allowedSortFields = ["title", "createdAt", "updatedAt"] as const;

    const sortField = allowedSortFields.includes(sort as any)
      ? sort
      : "updatedAt";

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

    if (!q || q.trim() === "") {
      const searchResults = await prisma.note.findMany({
        where: {
          userId: auth.userId,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          [sortField]: order,
        },
      });

      return NextResponse.json(
        {
          success: true,
          searchResults,
        },
        {
          status: 200,
        },
      );
    }

    const searchResults = await prisma.note.findMany({
      where: {
        userId: auth?.userId,
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortField]: order,
      },
    });

    return NextResponse.json(
      {
        success: true,
        searchResults,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error while serching notes",
      },
      {
        status: 500,
      },
    );
  }
}
