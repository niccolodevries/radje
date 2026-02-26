"use client";

interface NoMatchToastProps {
  letter: string | null;
  exhausted: boolean;
}

export default function NoMatchToast({ letter, exhausted }: NoMatchToastProps) {
  if (!letter && !exhausted) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-[fade-in_0.15s_ease-out]">
      <div className="bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-lg text-sm font-medium text-center max-w-[90vw]">
        {exhausted
          ? "Geen matches gevonden — voeg meer opties toe!"
          : `Geen match voor ${letter} — draait opnieuw!`}
      </div>
    </div>
  );
}
