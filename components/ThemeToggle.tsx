"use client";

import { useEffect, useState } from "react";
import { useThemeContext } from "./ThemeProvider";
import type { Theme } from "./ThemeProvider";

const CYCLE: Theme[] = ["day", "night", "illustrated"];

const LABELS: Record<Theme, string> = {
  day: "Przełącz na tryb nocny",
  night: "Przełącz na tryb ilustrowany",
  illustrated: "Przełącz na tryb dzienny",
};

function nextTheme(current: Theme): Theme {
  const idx = CYCLE.indexOf(current);
  return CYCLE[(idx + 1) % CYCLE.length];
}

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 1 4.32C4.32 18.6 7.54 20 12 20c1.1 0 2-.9 2-2 0-.53-.19-1.02-.5-1.4-.3-.37-.5-.87-.5-1.4 0-1.1.9-2 2-2h2.5C20.43 13.17 22 10.78 22 8c0-3.31-4.48-6-10-6z" />
    </svg>
  );
}

const ICONS: Record<Theme, React.ReactNode> = {
  day: <SunIcon />,
  night: <MoonIcon />,
  illustrated: <PaletteIcon />,
};

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: "var(--surface-subtle)",
          border: "1px solid var(--border)",
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <button
      onClick={() => setTheme(nextTheme(theme))}
      aria-label={LABELS[theme]}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        background: "var(--surface-subtle)",
        border: "1px solid var(--border)",
        color: "var(--text-secondary)",
        cursor: "pointer",
        transition: "background 0.15s ease, color 0.15s ease, border-color 0.15s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.background = "var(--accent-bg)";
        btn.style.color = "var(--accent)";
        btn.style.borderColor = "var(--accent)";
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.background = "var(--surface-subtle)";
        btn.style.color = "var(--text-secondary)";
        btn.style.borderColor = "var(--border)";
      }}
    >
      {ICONS[theme]}
    </button>
  );
}
