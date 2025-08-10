import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!idea.trim()) return setError("Enter an idea");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Server error");
      }
      const data = await res.json();
      if (data && data.id) {
        router.push(`/preview/${data.id}`);
      } else {
        setError("Invalid response from server");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Unknown error");
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 sm:p-12">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-xl p-10 sm:p-14 space-y-10 border border-purple-100">
        <h1 className="text-5xl font-black text-purple-700 text-center select-none tracking-tight drop-shadow-lg">
          💡 Website Idea Generator
        </h1>
        <form onSubmit={submit} className="space-y-8">
          <div>
            <label
              htmlFor="idea"
              className="block text-base font-bold text-purple-700 mb-3"
            >
              Your Website Idea
            </label>
            <input
              id="idea"
              type="text"
              value={idea}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIdea(e.target.value)
              }
              placeholder="e.g. Landing page for a bakery"
              className="
                w-full
                border border-purple-300
                rounded-2xl
                px-6 py-5
                text-gray-900
                placeholder-purple-300
                shadow-md
                bg-purple-50/50
                transition
                focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400
                hover:border-purple-400
                text-lg
              "
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500
              hover:from-purple-600 hover:via-blue-600 hover:to-pink-600
              active:from-purple-700 active:via-blue-700 active:to-pink-700
              disabled:opacity-50 disabled:cursor-not-allowed
              text-white
              font-bold
              rounded-2xl
              py-4
              flex justify-center items-center
              gap-3
              transition
              shadow-lg
              focus:ring-4 focus:ring-purple-300
              text-lg
            "
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Generating..." : "Generate Idea"}
          </button>
          {error && (
            <p className="text-red-600 text-center font-semibold select-none bg-red-50 rounded-xl py-2 px-4 shadow">
              {error}
            </p>
          )}
        </form>
        <div className="text-center text-xs text-gray-400 pt-2">
          Powered by Next.js & Tailwind CSS
        </div>
      </div>
    </main>
  );
}
