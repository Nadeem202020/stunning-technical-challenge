import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Section = {
  title: string;
  content: string;
};

type IdeaData = {
  id: string;
  idea: string;
  sections: Section[];
  createdAt: string;
};

export default function Preview() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<IdeaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:3001/ideas/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 sm:p-12">
        <div className="text-center text-lg font-semibold text-purple-700 bg-white/80 rounded-2xl shadow-lg px-8 py-12">
          Loading preview...
        </div>
      </main>
    );
  if (error)
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 sm:p-12">
        <div className="text-center text-red-600 font-semibold bg-white/80 rounded-2xl shadow-lg px-8 py-12">
          Error: {error}
        </div>
      </main>
    );
  if (!data)
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 sm:p-12">
        <div className="text-center text-gray-700 font-semibold bg-white/80 rounded-2xl shadow-lg px-8 py-12">
          No data found.
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 sm:p-12">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-3xl p-10 sm:p-14 space-y-10 border border-purple-100">
        <h2 className="text-5xl font-black text-purple-700 text-center select-none tracking-tight drop-shadow-lg">
          {data.idea}
        </h2>
        <div className="space-y-8">
          {data.sections.map((s, i) => (
            <section
              key={i}
              className="bg-purple-50/50 border border-purple-200 rounded-2xl shadow-md p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold text-purple-700 mb-3">
                {s.title}
              </h3>
              <p className="text-gray-700 text-lg">{s.content}</p>
            </section>
          ))}
        </div>
        <div className="text-center text-xs text-gray-400 pt-2">
          Powered by Next.js & Tailwind CSS
        </div>
      </div>
    </main>
  );
}
