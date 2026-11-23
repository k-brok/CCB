
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/current-user";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Niet ingelogd." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
      },
    });
  } catch (error) {
    console.error("Gebruikerscontrole mislukt:", error);

    return NextResponse.json(
      { error: "Gebruikersgegevens ophalen mislukt." },
      { status: 500 },
    );
  }
}
