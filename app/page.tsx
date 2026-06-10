import Link from "next/link";
import { categories, getFlashcards, allFlashcards } from "@/lib/flashcards";

const categoryColors: Record<string, string> = {
  "Aktywne słuchanie": "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
  "Regulacja emocji": "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100",
  "CBT – podstawy": "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100",
  "ACT": "bg-teal-50 text-teal-700 border-teal-100 hover:bg-teal-100",
  "Cele terapii": "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100",
  "Konceptualizacja": "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100",
  "Techniki behawioralne": "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100",
};

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Fiszki PUiTP</h1>
          <p className="text-gray-500">
            Podstawowe Umiejętności i Techniki Psychoterapeutyczne
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {allFlashcards.length} fiszek · Uniwersytet VIZJA
          </p>
        </div>

        <Link
          href="/quiz?category=Wszystkie"
          className="block w-full text-center py-4 rounded-2xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-sm mb-8"
        >
          Ucz się wszystkich fiszek →
        </Link>

        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          lub wybierz temat
        </h2>
        <div className="flex flex-col gap-3">
          {categories.filter((c) => c !== "Wszystkie").map((cat) => {
            const count = getFlashcards(cat).length;
            const colorClass =
              categoryColors[cat] ??
              "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100";
            return (
              <Link
                key={cat}
                href={`/quiz?category=${encodeURIComponent(cat)}`}
                className={`flex items-center justify-between px-5 py-4 rounded-xl border font-medium transition-colors ${colorClass}`}
              >
                <span>{cat}</span>
                <span className="text-sm opacity-70">{count} fiszek</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
