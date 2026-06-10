export default function BackgroundDecor() {
  return (
    <>
      {/* Brain — top right */}
      <svg
        style={{
          position: "fixed",
          top: "4%",
          right: "-60px",
          opacity: 0.05,
          width: "320px",
          height: "320px",
          color: "var(--accent)",
          pointerEvents: "none",
          zIndex: 0,
          transform: "rotate(12deg)",
        }}
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Simplified brain silhouette */}
        <path d="M50 10 C35 10 25 18 23 28 C18 28 12 33 13 40 C8 42 6 48 9 54 C6 57 6 63 10 66 C10 73 15 78 22 78 C25 83 30 86 36 86 L50 86 L64 86 C70 86 75 83 78 78 C85 78 90 73 90 66 C94 63 94 57 91 54 C94 48 92 42 87 40 C88 33 82 28 77 28 C75 18 65 10 50 10 Z" />
        <path
          d="M50 10 L50 86 M35 30 C38 38 36 46 30 50 M65 30 C62 38 64 46 70 50 M25 52 C32 54 40 52 44 58 M75 52 C68 54 60 52 56 58"
          fill="none"
          stroke="var(--bg)"
          strokeWidth="2.5"
        />
      </svg>

      {/* Open book — bottom left */}
      <svg
        style={{
          position: "fixed",
          bottom: "6%",
          left: "-50px",
          opacity: 0.05,
          width: "360px",
          height: "360px",
          color: "var(--accent)",
          pointerEvents: "none",
          zIndex: 0,
          transform: "rotate(-10deg)",
        }}
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Open book */}
        <path d="M50 25 C50 25 28 20 12 24 C10 24 9 26 9 28 L9 76 C9 78 11 79 13 78 C28 74 50 78 50 78 C50 78 72 74 87 78 C89 79 91 78 91 76 L91 28 C91 26 90 24 88 24 C72 20 50 25 50 25 Z" />
        <rect x="48" y="24" width="4" height="55" fill="var(--bg)" />
        <path
          d="M20 35 L44 35 M20 42 L44 42 M20 49 L44 49 M20 56 L40 56 M56 35 L80 35 M56 42 L80 42 M56 49 L80 49 M56 56 L76 56"
          fill="none"
          stroke="var(--bg)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Neural network / molecule — top left */}
      <svg
        style={{
          position: "fixed",
          top: "30%",
          left: "-40px",
          opacity: 0.04,
          width: "280px",
          height: "280px",
          color: "var(--accent)",
          pointerEvents: "none",
          zIndex: 0,
          transform: "rotate(8deg)",
        }}
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Lines connecting nodes */}
        <line x1="50" y1="50" x2="20" y2="25" stroke="currentColor" strokeWidth="2.5" />
        <line x1="50" y1="50" x2="80" y2="25" stroke="currentColor" strokeWidth="2.5" />
        <line x1="50" y1="50" x2="80" y2="75" stroke="currentColor" strokeWidth="2.5" />
        <line x1="50" y1="50" x2="20" y2="75" stroke="currentColor" strokeWidth="2.5" />
        <line x1="50" y1="50" x2="50" y2="12" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth="2" />
        <line x1="20" y1="25" x2="20" y2="75" stroke="currentColor" strokeWidth="1.5" />
        <line x1="80" y1="25" x2="80" y2="75" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="25" x2="80" y2="25" stroke="currentColor" strokeWidth="1.5" />
        {/* Nodes */}
        <circle cx="50" cy="50" r="7" />
        <circle cx="20" cy="25" r="5" />
        <circle cx="80" cy="25" r="5" />
        <circle cx="80" cy="75" r="5" />
        <circle cx="20" cy="75" r="5" />
        <circle cx="50" cy="12" r="4" />
        <circle cx="88" cy="50" r="4" />
      </svg>

      {/* Pen / quill — bottom right */}
      <svg
        style={{
          position: "fixed",
          bottom: "10%",
          right: "-30px",
          opacity: 0.05,
          width: "240px",
          height: "240px",
          color: "var(--accent)",
          pointerEvents: "none",
          zIndex: 0,
          transform: "rotate(-25deg)",
        }}
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Pen body */}
        <path d="M30 10 L65 10 C68 10 70 12 70 15 L70 72 L47.5 88 L25 72 L25 15 C25 12 27 10 30 10 Z" />
        {/* Pen clip */}
        <rect x="62" y="10" width="5" height="45" rx="2" fill="var(--bg)" opacity="0.5" />
        {/* Tip */}
        <path d="M35 72 L47.5 88 L60 72 Z" fill="var(--bg)" opacity="0.3" />
        {/* Grip lines */}
        <line x1="25" y1="60" x2="70" y2="60" stroke="var(--bg)" strokeWidth="2" />
        <line x1="25" y1="52" x2="70" y2="52" stroke="var(--bg)" strokeWidth="1.5" opacity="0.6" />
      </svg>
    </>
  );
}
