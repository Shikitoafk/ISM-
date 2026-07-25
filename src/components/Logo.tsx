import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  /**
   * Which surface the logo sits on. "light" is the default navy mark for
   * white backgrounds; "dark" swaps in the white mark and light text, so
   * dark sections do not need a white plate behind it.
   */
  tone?: "light" | "dark";
}

/**
 * Wordmark dimensions. These come from public/wordmark.png, which is the
 * mark cropped to its ink (2.706:1) — the square logo.png keeps a wide
 * margin for use as an app icon, and at header size that margin left the
 * mark rendering about a third of its usable height.
 */
const MARK = {
  sm: { width: 70, height: 26 },
  md: { width: 92, height: 34 },
  lg: { width: 119, height: 44 },
};

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showText = true,
  tone = "light",
}) => {
  const textSizes = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-xl",
  };

  const onDark = tone === "dark";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official ISM Logo Image */}
      <Image
        src={onDark ? "/wordmark-on-dark.png" : "/wordmark.png"}
        alt="ISM Logo"
        width={MARK[size].width}
        height={MARK[size].height}
        className="shrink-0 object-contain"
        priority
      />

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif font-bold tracking-tight leading-tight ${textSizes[size]} ${
              onDark ? "text-white" : "text-slate-900"
            }`}
          >
            ISM OLYMPIAD
          </span>
          <span
            className={`text-[10px] sm:text-[11px] uppercase tracking-widest font-bold leading-tight ${
              onDark ? "text-brand-200" : "text-slate-500"
            }`}
          >
            International Science Movement
          </span>
        </div>
      )}
    </div>
  );
};
