import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "h-8 text-lg px-2.5 py-1",
    md: "h-10 text-xl px-3 py-1.5",
    lg: "h-14 text-3xl px-4 py-2",
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Monogram Badge Placeholder */}
      <div className={`relative flex items-center justify-center font-serif font-bold tracking-wider rounded-lg border border-amber-500/40 bg-gradient-to-br from-navy-900 via-navy-850 to-slate-900 text-amber-400 shadow-md shadow-amber-500/10 ${sizeClasses[size]}`}>
        {/* Subtle decorative science lattice indicator */}
        <span className="relative z-10 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">ISM</span>
        <span className="absolute inset-0 rounded-lg bg-amber-500/5 blur-[2px]" />
      </div>
      
      <div className="flex flex-col">
        <span className="font-serif font-bold text-slate-100 tracking-tight text-base leading-none">
          ISM OLYMPIAD
        </span>
        <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-medium leading-tight mt-0.5">
          International Science Movement
        </span>
      </div>
    </div>
  );
};
