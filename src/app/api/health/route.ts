
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { handleApiError } from "@/lib/errors/error-handler";

export async function GET() {
  try {
    logger.info("Health check requested");

    return NextResponse.json({
      status: "ok",
      application: "CCB",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
