import data from "@/data/flashcards.json";

export interface Flashcard {
  id: number;
  category: string;
  source: string;
  front: string;
  back: string;
}

export const allFlashcards: Flashcard[] = data as Flashcard[];

export const categories = ["Wszystkie", ...Array.from(new Set(allFlashcards.map((f) => f.category)))];

export function getFlashcards(category: string): Flashcard[] {
  if (category === "Wszystkie") return allFlashcards;
  return allFlashcards.filter((f) => f.category === category);
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
