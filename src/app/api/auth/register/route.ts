import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/auth/register";

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
    typeof data.password !== "string" ||
    typeof data.displayName !== "string"
  ) {
    return NextResponse.json(
      { error: "Vul alle verplichte velden in." },
      { status: 400 },
    );
  }

  try {
    await registerUser({
      email: data.email,
      password: data.password,
      displayName: data.displayName,
    });

    return NextResponse.json(
      {
        message:
          "Registratie ontvangen. Controleer je e-mail om je account te activeren.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      [
        "Ongeldig e-mailadres.",
        "Het wachtwoord moet minimaal 12 tekens bevatten.",
        "De spelersnaam moet tussen 1 en 50 tekens bevatten.",
        "Dit e-mailadres is al geregistreerd.",
      ].includes(error.message)
    ) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 },
      );
    }

    console.error("Registratiefout:", error);

    return NextResponse.json(
      { error: "Registreren is momenteel niet mogelijk." },
      { status: 500 },
    );
  }
}