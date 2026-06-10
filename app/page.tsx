import Link from "next/link";
import { categories, getFlashcards, allFlashcards } from "@/lib/flashcards";

const categoryMeta: Record<string, { icon: string; accent: string }> = {
  "Aktywne słuchanie":    { icon: "👂", accent: "#60a5fa" },
  "Regulacja emocji":     { icon: "🧠", accent: "#a78bfa" },
  "CBT – podstawy":       { icon: "🔍", accent: "#34d399" },
  "ACT":                  { icon: "🌿", accent: "#2dd4bf" },
  "Cele terapii":         { icon: "🎯", accent: "#fbbf24" },
  "Konceptualizacja":     { icon: "🗺️", accent: "#fb7185" },
  "Techniki behawioralne":{ icon: "⚙️", accent: "#818cf8" },
};

const fallbackMeta = { icon: "📚", accent: "#4f46e5" };

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-14">
      <div className="w-full max-w-xl">

        {/* Hero section */}
        <div className="text-center mb-12">
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 text-2xl"
            style={{
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
            }}
          >
            🧠
          </div>

          <h1
            className="text-4xl font-bold mb-3"
            style={{ color: "#111827", letterSpacing: "-0.02em", lineHeight: 1.15 }}
          >
            Fiszki PUiTP
          </h1>

          <p
            className="text-sm mb-4"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Podstawowe Umiejętności i Techniki Psychoterapeutyczne
          </p>

          <div className="flex items-center justify-center gap-2.5">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: "#eef2ff",
                border: "1px solid #c7d2fe",
                color: "#4338ca",
              }}
            >
              <span style={{ color: "#16a34a" }}>●</span>
              {allFlashcards.length} fiszek
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
              }}
            >
              Uniwersytet VIZJA
            </span>
          </div>
        </div>

        {/* Primary CTA */}
        <Link
          href="/quiz?category=Wszystkie"
          className="btn-primary flex items-center justify-between w-full px-6 py-5 mb-4 text-left"
          style={{ textDecoration: "none" }}
        >
          <div>
            <div className="text-base font-semibold text-white">Ucz się wszystkich fiszek</div>
            <div className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
              {allFlashcards.length} pytań · tryb losowy dostępny
            </div>
          </div>
          <span
            className="flex items-center justify-center w-9 h-9 rounded-xl text-white font-bold text-lg flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            →
          </span>
        </Link>

        {/* Section label */}
        <div className="flex items-center gap-3 mt-8 mb-3">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            Wybierz temat
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: "var(--color-border)" }}
          />
        </div>

        {/* Category list */}
        <div className="flex flex-col gap-2">
          {categories.filter((c) => c !== "Wszystkie").map((cat) => {
            const count = getFlashcards(cat).length;
            const meta = categoryMeta[cat] ?? fallbackMeta;

            return (
              <Link
                key={cat}
                href={`/quiz?category=${encodeURIComponent(cat)}`}
                className="category-card flex items-center gap-4 px-5 py-4"
                style={{
                  textDecoration: "none",
                  borderLeft: `3px solid ${meta.accent}`,
                }}
              >
                {/* Icon */}
                <span className="text-lg flex-shrink-0">{meta.icon}</span>

                {/* Label */}
                <span
                  className="flex-1 text-sm font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {cat}
                </span>

                {/* Count badge */}
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: "var(--color-surface-raised)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {count} fiszek
                </span>

                {/* Arrow */}
                <span
                  className="text-sm flex-shrink-0"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>

        {/* Footer hint */}
        <p
          className="text-center text-xs mt-10"
          style={{ color: "var(--color-text-muted)" }}
        >
          Kliknij kartę, aby odsłonić odpowiedź · Oceniaj swoją wiedzę po każdej fiszce
        </p>
      </div>
    </main>
  );
}
