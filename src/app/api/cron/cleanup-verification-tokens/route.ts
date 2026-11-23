
import { NextRequest, NextResponse } from "next/server";

import { cleanupVerificationTokens } from "@/lib/auth/cleanup-verification-tokens";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (authorization !== `Bearer ${env.cron.secret}`) {
    return NextResponse.json(
      { error: "Niet geautoriseerd." },
      { status: 401 },
    );
  }

  try {
    const deletedCount = await cleanupVerificationTokens();

    return NextResponse.json({
      success: true,
      deletedCount,
    });
  } catch (error) {
    console.error("Token cleanup mislukt:", error);

    return NextResponse.json(
      { error: "Opruimen mislukt." },
      { status: 500 },
    );
  }
}
