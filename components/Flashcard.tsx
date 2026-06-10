"use client";

import { useState } from "react";
import type { Flashcard as FlashcardType } from "@/lib/flashcards";

interface Props {
  card: FlashcardType;
  onKnow: () => void;
  onRepeat: () => void;
  status: "unknown" | "know" | "repeat";
}

export default function Flashcard({ card, onKnow, onRepeat, status }: Props) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((f) => !f);

  const statusColor =
    status === "know"
      ? "bg-green-100 text-green-700 border-green-200"
      : status === "repeat"
      ? "bg-orange-100 text-orange-700 border-orange-200"
      : "bg-gray-100 text-gray-500 border-gray-200";

  const statusLabel =
    status === "know" ? "✓ Znam" : status === "repeat" ? "↺ Powtórzę" : "";

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Status badge */}
      <div className="h-7 flex items-center">
        {statusLabel && (
          <span className={`text-sm font-medium px-3 py-1 rounded-full border ${statusColor}`}>
            {statusLabel}
          </span>
        )}
      </div>

      {/* Card */}
      <div
        className="w-full cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={handleFlip}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "280px",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl bg-white shadow-lg border border-gray-100 flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider mb-4">
              {card.category} · {card.source}
            </span>
            <p className="text-xl font-semibold text-gray-800 leading-snug">{card.front}</p>
            <p className="text-sm text-gray-400 mt-6">Kliknij, aby zobaczyć odpowiedź</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl bg-indigo-50 shadow-lg border border-indigo-100 flex flex-col items-center justify-center p-8 text-center overflow-y-auto"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">{card.back}</p>
          </div>
        </div>
      </div>

      {/* Hint when not flipped */}
      {!flipped && (
        <p className="text-sm text-gray-400 -mt-1">Kliknij kartę, aby odsłonić</p>
      )}

      {/* Action buttons — visible after flip */}
      {flipped && (
        <div className="flex gap-3 mt-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
              onRepeat();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-100 text-orange-700 font-medium hover:bg-orange-200 transition-colors"
          >
            ↺ Powtórzę
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
              onKnow();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-100 text-green-700 font-medium hover:bg-green-200 transition-colors"
          >
            ✓ Znam
          </button>
        </div>
      )}
    </div>
  );
}
