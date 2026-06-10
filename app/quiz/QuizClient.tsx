"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Flashcard from "@/components/Flashcard";
import ProgressBar from "@/components/ProgressBar";
import ThemeToggle from "@/components/ThemeToggle";
import { getFlashcards, shuffleArray } from "@/lib/flashcards";
import type { Flashcard as FlashcardType } from "@/lib/flashcards";

type Status = "unknown" | "know" | "repeat";

const STORAGE_KEY = "puitp_flashcard_status";

function loadStatuses(): Record<number, Status> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveStatuses(s: Record<number, Status>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

export default function QuizClient({ category }: { category: string }) {
  const [cards, setCards] = useState<FlashcardType[]>([]);
  const [index, setIndex] = useState(0);
  const [statuses, setStatuses] = useState<Record<number, Status>>({});
  const [shuffled, setShuffled] = useState(false);

  useEffect(() => {
    const loaded = getFlashcards(category);
    setCards(loaded);
    setIndex(0);
    setStatuses(loadStatuses());
  }, [category]);

  const handleKnow = useCallback(() => {
    if (!cards[index]) return;
    const updated = { ...statuses, [cards[index].id]: "know" as Status };
    setStatuses(updated);
    saveStatuses(updated);
    if (index < cards.length - 1) setIndex((i) => i + 1);
  }, [cards, index, statuses]);

  const handleRepeat = useCallback(() => {
    if (!cards[index]) return;
    const updated = { ...statuses, [cards[index].id]: "repeat" as Status };
    setStatuses(updated);
    saveStatuses(updated);
    if (index < cards.length - 1) setIndex((i) => i + 1);
  }, [cards, index, statuses]);

  const handleShuffle = () => {
    setCards((c) => shuffleArray(c));
    setIndex(0);
    setShuffled(true);
  };

  const handleReset = () => {
    const cleared = { ...statuses };
    cards.forEach((c) => {
      delete cleared[c.id];
    });
    setStatuses(cleared);
    saveStatuses(cleared);
    setCards(getFlashcards(category));
    setIndex(0);
    setShuffled(false);
  };

  const known = cards.filter((c) => statuses[c.id] === "know").length;
  const card = cards[index];

  if (cards.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen gap-3"
        style={{ color: "var(--text-muted)" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "var(--border)", borderTopColor: "var(--accent)" }}
        />
        <span className="text-sm">Ładowanie...</span>
      </div>
    );
  }

  const isLast = index === cards.length - 1;
  const allDone = known === cards.length;

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--bg)", position: "relative", zIndex: 1 }}
    >
      {/* ── Top navigation bar ── */}
      <div
        className="sticky top-0 z-10 px-4 py-3"
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium flex-shrink-0"
            style={{ color: "var(--text-secondary)", textDecoration: "none" }}
          >
            <span
              className="inline-flex w-6 h-6 items-center justify-center rounded-lg text-xs"
              style={{
                background: "var(--surface-subtle)",
                border: "1px solid var(--border)",
              }}
            >
              ←
            </span>
            Powrót
          </Link>

          {/* Category chip */}
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full truncate"
            style={{
              background: "var(--accent-bg)",
              border: "1px solid var(--border)",
              color: "var(--accent)",
              maxWidth: "200px",
            }}
          >
            {category}
          </span>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* ── Main content — centered single column ── */}
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* Progress bar */}
        <div
          className="rounded-xl px-5 py-4"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow)",
          }}
        >
          <ProgressBar current={index + 1} total={cards.length} known={known} />
        </div>

        {/* Flashcard area */}
        <div className="max-w-lg mx-auto w-full">
          {allDone ? (
            /* Completion screen */
            <div
              className="flex flex-col items-center gap-5 py-16 text-center rounded-[16px] px-8"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow)",
              }}
            >
              <div className="animate-bounce-in text-6xl">🎉</div>

              <div className="animate-fade-up-delay-1">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
                >
                  Brawo!
                </h2>
                <p className="text-base" style={{ color: "var(--text-secondary)" }}>
                  Znasz wszystkie{" "}
                  <span className="font-semibold" style={{ color: "var(--btn-know-text)" }}>
                    {cards.length}
                  </span>{" "}
                  fiszki z tej kategorii.
                </p>
              </div>

              <div
                className="animate-fade-up-delay-1 flex items-center gap-3 px-5 py-3 rounded-xl w-full justify-center"
                style={{
                  background: "var(--btn-know-bg)",
                  border: "1px solid var(--btn-know-border)",
                }}
              >
                <span className="text-xl" style={{ color: "var(--btn-know-text)" }}>✓</span>
                <span className="text-sm font-semibold" style={{ color: "var(--btn-know-text)" }}>
                  100% ukończone
                </span>
              </div>

              <button
                onClick={handleReset}
                className="btn-primary animate-fade-up-delay-2 w-full py-4 text-base mt-2"
              >
                Zacznij od nowa
              </button>
            </div>
          ) : (
            <>
              {card && (
                <Flashcard
                  key={card.id}
                  card={card}
                  onKnow={handleKnow}
                  onRepeat={handleRepeat}
                  status={statuses[card.id] ?? "unknown"}
                />
              )}
            </>
          )}
        </div>

        {/* Bottom navigation row */}
        {!allDone && (
          <div
            className="flex items-center justify-between pt-4 max-w-lg mx-auto w-full"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="btn-ghost flex items-center gap-1.5 px-3 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>←</span>
              <span>Poprzednia</span>
            </button>

            <div className="flex gap-1.5">
              <button
                onClick={handleShuffle}
                className="btn-ghost flex items-center gap-1.5 px-3 py-2 text-xs"
              >
                <span>🔀</span>
                <span>{shuffled ? "Tasuj ponownie" : "Tasuj"}</span>
              </button>
              <button
                onClick={handleReset}
                className="btn-ghost flex items-center gap-1.5 px-3 py-2 text-xs"
              >
                <span>↺</span>
                <span>Reset</span>
              </button>
            </div>

            <button
              onClick={() => setIndex((i) => Math.min(cards.length - 1, i + 1))}
              disabled={isLast}
              className="btn-ghost flex items-center gap-1.5 px-3 py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>Następna</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
