
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { AppError } from "./app-error";
import { logger } from "@/lib/logger";

export function handleApiError(error: unknown) {
  // Zod validatiefout
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid request data",
          details: error.issues.map((issue) => ({
            path: issue.path.map(String),
            message: issue.message,
          })),
        },
      },
      { status: 400 }
    );
  }

  // Bekende applicatiefout
  if (error instanceof AppError) {
    if (error.statusCode >= 500) {
      logger.error({ err: error, code: error.code }, error.message);
    } else {
      logger.warn({ code: error.code }, error.message);
    }

    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
        },
      },
      { status: error.statusCode }
    );
  }

  // Onverwachte fout
  logger.error({ err: error }, "Unexpected application error");

  return NextResponse.json(
    {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    },
    { status: 500 }
  );
}
