import React from "react";
import { Logo } from "./Logo";
import { OLYMPIAD_CONTENT } from "../data/content";
import { FileText, Mail, MapPin, Shield } from "lucide-react";

export const Footer: React.FC = () => {
  const { meta, organizers } = OLYMPIAD_CONTENT;

  return (
    <footer className="bg-navy-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mt-4">
              {meta.fullName}
            </p>
            <div className="text-xs text-slate-400">
              Командная олимпиада по лабораторным исследованиям и научным кейсам для школьников 9–11 классов.
            </div>
          </div>

          {/* Col 2: Quick Links & Documents */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base">Документы и ссылки</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href={meta.regulationsPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 inline-flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Положение ISM (PDF)</span>
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">Об олимпиаде</a>
              </li>
              <li>
                <a href="#format" className="hover:text-amber-400 transition-colors">Этапы и формат</a>
              </li>
              <li>
                <a href="#integrity" className="hover:text-amber-400 transition-colors">Академическая честность</a>
              </li>
              <li>
                <a href="#awards" className="hover:text-amber-400 transition-colors">Награды</a>
              </li>
              <li>
                <a href="#registration" className="hover:text-amber-400 transition-colors">Подать заявку</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts & Co-chairs */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-base">Контакты оргкомитета</h4>
            <div className="text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@ism-olympiad.org</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{meta.location}</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Сопредседатели:</span>
              <ul className="mt-1 space-y-1">
                {organizers.coChairs.map((c, i) => (
                  <li key={i}>• {c.name}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-slate-400 max-w-2xl">
            <Shield className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Институциональная поддержка: {organizers.institutionalSupport.name}. {organizers.institutionalSupport.disclaimer}
            </span>
          </div>

          <div className="text-slate-400 shrink-0">
            © {new Date().getFullYear()} International Science Movement (ISM). Все права защищены.
          </div>
        </div>

      </div>
    </footer>
  );
};
