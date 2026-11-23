
import { NextRequest, NextResponse } from "next/server";

import { logoutUser } from "@/lib/auth/logout";

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("ccb_session")?.value;

    await logoutUser(sessionToken);

    const response = NextResponse.json({
      message: "Je bent succesvol uitgelogd.",
    });

    response.cookies.set("ccb_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logoutfout:", error);

    return NextResponse.json(
      { error: "Uitloggen is momenteel niet mogelijk." },
      { status: 500 },
    );
  }
}
