import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md", showText = true }) => {
  const imgSizes = {
    sm: { width: 32, height: 32 },
    md: { width: 42, height: 42 },
    lg: { width: 56, height: 56 },
  };

  const textSizes = {
    sm: "text-xs sm:text-sm",
    md: "text-sm sm:text-base",
    lg: "text-lg sm:text-xl",
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official ISM Logo Image */}
      <Image
        src="/logo.png"
        alt="ISM Logo"
        width={imgSizes[size].width}
        height={imgSizes[size].height}
        className="rounded-lg shadow-sm shrink-0 object-contain"
        priority
      />

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
