
import { NextRequest, NextResponse } from "next/server";

import { loginUser } from "@/lib/auth/login";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ongeldige aanvraag." },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Ongeldige aanvraag." },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;

  if (
    typeof data.email !== "string" ||
    typeof data.password !== "string"
  ) {
    return NextResponse.json(
      { error: "Vul je e-mailadres en wachtwoord in." },
      { status: 400 },
    );
  }

  try {
    const result = await loginUser({
      email: data.email,
      password: data.password,
    });

    const response = NextResponse.json({
      message: "Je bent succesvol ingelogd.",
      userId: result.userId,
    });

    response.cookies.set("ccb_session", result.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: result.expiresAt,
      path: "/",
    });

    return response;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "E-mailadres of wachtwoord is onjuist."
    ) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 },
      );
    }

    console.error("Loginfout:", error);

    return NextResponse.json(
      { error: "Inloggen is momenteel niet mogelijk." },
      { status: 500 },
    );
  }
}
