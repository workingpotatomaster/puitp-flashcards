"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "day" | "night" | "illustrated";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "day",
  setTheme: () => {},
});

export function useThemeContext(): ThemeContextValue {
  return useContext(ThemeContext);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "illustrated");
  if (theme === "night") root.classList.add("dark");
  if (theme === "illustrated") root.classList.add("illustrated");
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>("day");
  const [mounted, setMounted] = useState(false);

  // Read persisted theme on mount and apply it
  useEffect(() => {
    const stored = localStorage.getItem("puitp-theme") as Theme | null;
    const initial: Theme =
      stored === "day" || stored === "night" || stored === "illustrated"
        ? stored
        : "day";
    setThemeState(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("puitp-theme", t);
    applyTheme(t);
  };

  // Suppress rendering children until mount to avoid class mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
