import { getAuthUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
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
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successful",
      },
      { status: 200 },
    );

    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      expires: new Date(0), // Expire immediately
      path: "/",
    });
    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to logout",
      },
      { status: 500 },
    );
  }
}
