import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md", showText = true }) => {
  const badgeSizes = {
    sm: "h-8 w-14",
    md: "h-10 w-20",
    lg: "h-14 w-28",
  };

  const textSizes = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-xl",
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official ISM Logo Badge */}
      <div className={`relative flex items-center justify-center rounded-xl bg-[#1b365d] p-1.5 shadow-sm border border-slate-900 shrink-0 ${badgeSizes[size]}`}>
        <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Flask 'I' Body */}
          <path
            d="M 30 22 H 60 M 40 22 V 42 L 20 86 C 17 93 21 98 28 98 H 62 C 69 98 73 93 70 86 L 50 42 V 22"
            stroke="#ffffff"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 17 98 H 73" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" />

          {/* Molecule (3 connected nodes on left inside flask) */}
          <line x1="32" y1="78" x2="44" y2="68" stroke="#1b365d" strokeWidth="4" strokeLinecap="round" />
          <line x1="32" y1="78" x2="36" y2="88" stroke="#1b365d" strokeWidth="4" strokeLinecap="round" />
          <line x1="44" y1="68" x2="36" y2="88" stroke="#1b365d" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="78" r="5.5" fill="#1b365d" />
          <circle cx="44" cy="68" r="5.5" fill="#1b365d" />
          <circle cx="36" cy="88" r="5.5" fill="#1b365d" />

          {/* DNA Strand (on right inside flask) */}
          <path d="M 48 88 Q 54 78 62 88" stroke="#1b365d" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 48 78 Q 54 88 62 78" stroke="#1b365d" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Letter 'S' */}
          <path
            d="M 122 38 C 102 32 86 46 86 60 C 86 82 122 78 122 92 C 122 102 106 106 88 100"
            stroke="#ffffff"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
          />

          {/* Letter 'M' */}
          <path
            d="M 136 98 V 32 L 163 76 L 190 32 V 98"
            stroke="#ffffff"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-extrabold text-slate-900 tracking-tight leading-tight ${textSizes[size]}`}>
            ISM OLYMPIAD
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-slate-500 font-bold leading-tight">
            International Science Movement
          </span>
        </div>
      )}
    </div>
  );
};
