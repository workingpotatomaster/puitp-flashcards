"use client";

import { useSearchParams } from "next/navigation";
import QuizClient from "./QuizClient";

export default function QuizPageWrapper() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "Wszystkie";
  return <QuizClient category={category} />;
}
