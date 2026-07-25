import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = registerSchema.safeParse(body);

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
    const { name, email, password } = result.data;

  

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

     
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered",
        },
        {
          status: 409,
        },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const NewUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      {
        success: false,
        message: "User registered successfully",
        user: {
          id: NewUser.id,
          name: NewUser.name,
          email: NewUser,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Register Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
