import React from "react";
import { OLYMPIAD_CONTENT } from "../data/content";
import { Award, Trophy, Medal, Star, Scroll } from "lucide-react";

export const Awards: React.FC = () => {
  const { awards } = OLYMPIAD_CONTENT;

  const getColorStyles = (color: string) => {
    switch (color) {
      case "emerald":
        return {
          border: "border-emerald-500/40",
          bg: "bg-emerald-500/10",
          text: "text-emerald-400",
          badgeBg: "bg-emerald-500 text-navy-950",
          glow: "shadow-emerald-500/10",
        };
      case "gold":
        return {
          border: "border-amber-500/40",
          bg: "bg-amber-500/10",
          text: "text-amber-400",
          badgeBg: "bg-amber-500 text-navy-950",
          glow: "shadow-amber-500/10",
        };
      case "silver":
        return {
          border: "border-slate-400/40",
          bg: "bg-slate-400/10",
          text: "text-slate-300",
          badgeBg: "bg-slate-300 text-navy-950",
          glow: "shadow-slate-400/10",
        };
      case "bronze":
      default:
        return {
          border: "border-orange-600/40",
          bg: "bg-orange-600/10",
          text: "text-orange-400",
          badgeBg: "bg-orange-600 text-white",
          glow: "shadow-orange-600/10",
        };
    }
  };

  return (
    <section id="awards" className="py-20 md:py-28 bg-navy-900 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 text-xs font-medium uppercase tracking-wider mb-3">
            <Trophy className="w-4 h-4" />
            <span>Призовые места</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            {awards.title}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            {awards.subtitle}
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {awards.items.map((item) => {
            const styles = getColorStyles(item.color);
            return (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border ${styles.border} bg-navy-950/80 backdrop-blur-sm shadow-xl ${styles.glow} flex flex-col justify-between hover:-translate-y-1 transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles.badgeBg}`}>
                      {item.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {item.teamsCount}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl ${styles.bg} ${styles.text} flex items-center justify-center mb-4`}>
                    {item.id === "grand-prix" ? (
                      <Trophy className="w-6 h-6" />
                    ) : (
                      <Medal className="w-6 h-6" />
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <div className={`text-sm font-semibold mb-3 ${styles.text}`}>
                    {item.diploma}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Nominations & Certificates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-2xl border border-slate-800 bg-navy-950 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-base mb-1">
                Специальные номинации жюри
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {awards.specialNominations}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-navy-950 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-white text-base mb-1">
                Сертификаты финалистов
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {awards.certificates}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
