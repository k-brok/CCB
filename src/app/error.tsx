
"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-8 text-center">
        <h1 className="text-2xl font-bold">
          Something went wrong
        </h1>

        <p className="mt-3 text-gray-400">
          An unexpected error occurred.
          Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-primary px-5 py-2 font-semibold text-white hover:bg-primary-hover"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
