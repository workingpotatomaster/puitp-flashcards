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
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
        Ładowanie...
      </div>
    );
  }

  const isLast = index === cards.length - 1;
  const allDone = known === cards.length;

  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-sm text-indigo-500 hover:text-indigo-700 font-medium">
            ← Powrót
          </Link>
          <span className="text-sm font-medium text-gray-600 truncate max-w-[60%] text-right">
            {category}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <ProgressBar current={index + 1} total={cards.length} known={known} />
        </div>

        {/* All done screen */}
        {allDone ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="text-5xl">🎉</div>
            <h2 className="text-2xl font-bold text-gray-800">Brawo!</h2>
            <p className="text-gray-500">Znasz wszystkie {cards.length} fiszki z tej kategorii.</p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
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

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                disabled={index === 0}
                className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
              >
                ← Poprzednia
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleShuffle}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors font-medium text-sm"
                  title="Losowa kolejność"
                >
                  {shuffled ? "🔀 Tasuj ponownie" : "🔀 Tasuj"}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors font-medium text-sm"
                  title="Resetuj postęp"
                >
                  ↺ Reset
                </button>
              </div>

              <button
                onClick={() => setIndex((i) => Math.min(cards.length - 1, i + 1))}
                disabled={isLast}
                className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Następna →
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
