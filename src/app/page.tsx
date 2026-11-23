
export default function Home() {
  return (
    <main className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-4xl rounded-xl border border-border bg-surface p-8">
        <h1 className="text-3xl font-bold text-primary">
          Chunkk City Builder
        </h1>

        <p className="mt-4 text-gray-400">
          Welcome to CCB.
        </p>

        <button className="mt-6 rounded-lg bg-primary px-5 py-2 font-semibold text-white hover:bg-primary-hover">
          Start building
        </button>
      </div>
    </main>
  );
}
