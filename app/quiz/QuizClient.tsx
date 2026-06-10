"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Flashcard from "@/components/Flashcard";
import ProgressBar from "@/components/ProgressBar";
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
        style={{ color: "var(--color-text-muted)" }}
      >
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "#c7d2fe", borderTopColor: "#4f46e5" }}
        />
        <span className="text-sm">Ładowanie...</span>
      </div>
    );
  }

  const isLast = index === cards.length - 1;
  const allDone = known === cards.length;

  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* ── Mobile header (progress strip) — visible below md ── */}
      <div
        className="md:hidden px-4 pt-5 pb-4 sticky top-0 z-10"
        style={{
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Back + category */}
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}
          >
            <span
              className="inline-flex w-6 h-6 items-center justify-center rounded-lg text-xs"
              style={{
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              ←
            </span>
            Powrót
          </Link>
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full truncate max-w-[180px]"
            style={{
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              color: "#4338ca",
            }}
          >
            {category}
          </span>
        </div>

        {/* Progress bar */}
        <ProgressBar current={index + 1} total={cards.length} known={known} />
      </div>

      {/* ── Two-column desktop layout ── */}
      <div className="flex md:items-start max-w-5xl mx-auto md:gap-8 md:px-8 md:py-10">

        {/* ── LEFT SIDEBAR (desktop only) ── */}
        <aside
          className="hidden md:flex flex-col gap-5 w-64 flex-shrink-0 sticky top-10 self-start"
        >
          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium w-fit"
            style={{ color: "var(--color-text-secondary)", textDecoration: "none" }}
          >
            <span
              className="inline-flex w-6 h-6 items-center justify-center rounded-lg text-xs"
              style={{
                background: "var(--color-surface-raised)",
                border: "1px solid var(--color-border)",
              }}
            >
              ←
            </span>
            Powrót
          </Link>

          {/* Category chip */}
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full w-fit"
            style={{
              background: "#eef2ff",
              border: "1px solid #c7d2fe",
              color: "#4338ca",
            }}
          >
            {category}
          </span>

          {/* Progress section */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <ProgressBar current={index + 1} total={cards.length} known={known} />
          </div>

          {/* Navigation buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="btn-ghost flex items-center gap-2 px-3 py-2.5 text-sm w-full text-left disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>←</span>
              <span>Poprzednia</span>
            </button>
            <button
              onClick={() => setIndex((i) => Math.min(cards.length - 1, i + 1))}
              disabled={isLast}
              className="btn-ghost flex items-center gap-2 px-3 py-2.5 text-sm w-full text-left disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>Następna</span>
              <span>→</span>
            </button>
          </div>

          {/* Utility buttons */}
          <div
            className="flex flex-col gap-1 pt-2"
            style={{ borderTop: "1px solid var(--color-border)" }}
          >
            <button
              onClick={handleShuffle}
              className="btn-ghost flex items-center gap-2 px-3 py-2 text-xs w-full text-left"
            >
              <span>🔀</span>
              <span>{shuffled ? "Tasuj ponownie" : "Tasuj"}</span>
            </button>
            <button
              onClick={handleReset}
              className="btn-ghost flex items-center gap-2 px-3 py-2 text-xs w-full text-left"
            >
              <span>↺</span>
              <span>Reset</span>
            </button>
          </div>
        </aside>

        {/* ── RIGHT COLUMN — card area ── */}
        <div className="flex-1 flex flex-col px-4 py-6 md:px-0 md:py-0">
          {allDone ? (
            /* Completion screen */
            <div
              className="flex flex-col items-center gap-5 py-16 text-center rounded-[16px] px-8"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div className="animate-bounce-in text-6xl">🎉</div>

              <div className="animate-fade-up-delay-1">
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}
                >
                  Brawo!
                </h2>
                <p className="text-base" style={{ color: "var(--color-text-secondary)" }}>
                  Znasz wszystkie{" "}
                  <span className="font-semibold" style={{ color: "#16a34a" }}>
                    {cards.length}
                  </span>{" "}
                  fiszki z tej kategorii.
                </p>
              </div>

              <div
                className="animate-fade-up-delay-1 flex items-center gap-3 px-5 py-3 rounded-xl w-full justify-center"
                style={{
                  background: "#dcfce7",
                  border: "1px solid #bbf7d0",
                }}
              >
                <span className="text-xl" style={{ color: "#16a34a" }}>✓</span>
                <span className="text-sm font-semibold" style={{ color: "#15803d" }}>
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
              {/* Flashcard */}
              {card && (
                <Flashcard
                  key={card.id}
                  card={card}
                  onKnow={handleKnow}
                  onRepeat={handleRepeat}
                  status={statuses[card.id] ?? "unknown"}
                />
              )}

              {/* Mobile bottom navigation */}
              <div
                className="md:hidden flex items-center justify-between mt-8 pt-5"
                style={{ borderTop: "1px solid var(--color-border)" }}
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}
