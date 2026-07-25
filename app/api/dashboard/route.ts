import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { getDashboardContext } from "@/lib/dashboard";

export async function GET() {
  try {
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

    const dashboard = await getDashboardContext(auth.userId);

    return NextResponse.json({
      success: true,
      ...dashboard,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching dashboard",
      },
      {
        status: 500,
      },
    );
  }
}