import { Suspense } from "react";
import QuizPageWrapper from "./QuizPageWrapper";

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-gray-400">Ładowanie...</div>}>
      <QuizPageWrapper />
    </Suspense>
  );
}
