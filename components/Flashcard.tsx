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

  const statusLabel =
    status === "know" ? "✓ Znam" : status === "repeat" ? "↺ Powtórzę" : "";

  return (
    <div className="flex flex-col items-center gap-5 w-full">

      {/* Status badge */}
      <div className="h-7 flex items-center">
        {statusLabel && (
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              status === "know" ? "badge-know" : "badge-repeat"
            }`}
          >
            {statusLabel}
          </span>
        )}
      </div>

      {/* 3D flip card wrapper */}
      <div
        className="w-full cursor-pointer perspective-1200"
        onClick={handleFlip}
        role="button"
        aria-label={flipped ? "Kliknij, aby ukryć odpowiedź" : "Kliknij, aby zobaczyć odpowiedź"}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" || e.key === " " ? handleFlip() : undefined}
      >
        <div
          className="relative w-full preserve-3d"
          style={{
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
            minHeight: "300px",
          }}
        >

          {/* ---- FRONT ---- */}
          <div className="absolute inset-0 card-surface-front backface-hidden flex flex-col overflow-hidden">
            <div className="flex flex-col flex-1 items-center justify-center p-8 text-center gap-5">

              {/* Category tag + source */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    background: "#eef2ff",
                    border: "1px solid #c7d2fe",
                    color: "#4338ca",
                  }}
                >
                  {card.category}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {card.source}
                </span>
              </div>

              {/* Question */}
              <p
                className="text-xl font-semibold leading-snug"
                style={{
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                {card.front}
              </p>

              {/* Tap hint */}
              <span
                className="text-xs flex items-center gap-1.5 mt-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                <span
                  className="inline-flex w-4 h-4 items-center justify-center rounded"
                  style={{
                    background: "#eef2ff",
                    border: "1px solid #c7d2fe",
                    fontSize: "9px",
                    color: "#4338ca",
                  }}
                >
                  ↩
                </span>
                kliknij, aby odsłonić
              </span>
            </div>
          </div>

          {/* ---- BACK ---- */}
          <div className="absolute inset-0 card-surface-back backface-hidden rotate-y-180 flex flex-col overflow-hidden">
            <div className="flex flex-col flex-1 p-8 overflow-y-auto">
              {/* Label */}
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-4 flex-shrink-0"
                style={{ color: "#4338ca" }}
              >
                Odpowiedź
              </div>

              {/* Answer — left-aligned */}
              <p
                className="text-base leading-relaxed whitespace-pre-line flex-1 text-left"
                style={{
                  color: "var(--color-text-primary)",
                  lineHeight: "1.75",
                }}
              >
                {card.back}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Flip hint */}
      {!flipped && (
        <p
          className="text-xs -mt-2"
          style={{ color: "var(--color-text-muted)" }}
        >
          Kliknij kartę, aby odsłonić odpowiedź
        </p>
      )}

      {/* Action buttons — revealed after flip */}
      {flipped && (
        <div className="flex gap-3 mt-1 w-full max-w-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
              onRepeat();
            }}
            className="btn-repeat flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm"
          >
            <span className="text-base">↺</span>
            Powtórzę
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setFlipped(false);
              onKnow();
            }}
            className="btn-know flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm"
          >
            <span className="text-base">✓</span>
            Znam
          </button>
        </div>
      )}
    </div>
  );
}
