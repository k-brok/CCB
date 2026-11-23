
import { NextRequest, NextResponse } from "next/server";
import { verifyEmail } from "@/lib/auth/verify-email";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Verificatietoken ontbreekt." },
      { status: 400 },
    );
  }

  try {
    await verifyEmail(token);

    return NextResponse.json({
      message: "Je e-mailadres is succesvol geverifieerd.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "E-mailverificatie mislukt.",
      },
      { status: 400 },
    );
  }
}
