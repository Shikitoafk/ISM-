import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "h-7 text-xs px-2 py-0.5",
    md: "h-9 text-sm px-2.5 py-1",
    lg: "h-11 text-base px-3 py-1.5",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Minimalist Monogram Badge */}
      <div className={`flex items-center justify-center font-serif font-bold tracking-wider rounded-lg border border-brand-800 bg-brand-800 text-white shadow-sm ${sizeClasses[size]}`}>
        <span>ISM</span>
      </div>
      
      <div className="flex flex-col">
        <span className="font-serif font-bold text-slate-900 tracking-tight text-sm sm:text-base leading-tight">
          ISM OLYMPIAD
        </span>
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold leading-tight">
          International Science Movement
        </span>
      </div>
    </div>
  );
};
