import React from 'react';
import { BookOpen, Calendar, HelpCircle, Code2, Printer } from 'lucide-react';
import { ViewMode } from '../types/discurso';

interface Props {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onOpenEmbedModal: () => void;
  totalDiscursos: number;
}

export const EditorialHeader: React.FC<Props> = ({
  currentView,
  onViewChange,
  onOpenEmbedModal,
  totalDiscursos,
}) => {
  return (
    <header className="w-full bg-white border-b border-hairline no-print">


      {/* Main Masthead Stack */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-6 pb-5 text-center">
        <p className="text-primary font-bold text-xs uppercase tracking-label-caps mb-1.5 font-sans">
          VISITA APOSTÓLICA A LA REPÚBLICA ARGENTINA • NOVIEMBRE 2026
        </p>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#141b2b] tracking-tight mb-2">
          Discursos y Homilías de León XIV
        </h1>



        {/* Micro-rule divider per Editorial Infographics System */}
        <div className="editorial-micro-rule my-4 max-w-3xl mx-auto"></div>

        {/* Segmented Controls (View Toggles) per diseno.md */}
        <div className="inline-flex p-1 bg-[#f1f5f9] rounded max-w-full overflow-x-auto gap-1 text-xs sm:text-sm font-sans">
          <button
            onClick={() => onViewChange('explorer')}
            className={`px-3 sm:px-4 py-1.5 rounded transition-all duration-150 flex items-center gap-1.5 ${currentView === 'explorer'
              ? 'bg-white text-[#0f172a] shadow-segment font-semibold border border-slate-200/60'
              : 'text-[#64748b] hover:text-[#0f172a] font-medium'
              }`}
          >
            <BookOpen size={14} className={currentView === 'explorer' ? 'text-primary' : ''} />
            <span>Corpus de Discursos ({totalDiscursos})</span>
          </button>

          <button
            onClick={() => onViewChange('thematic-faq')}
            className={`px-3 sm:px-4 py-1.5 rounded transition-all duration-150 flex items-center gap-1.5 ${currentView === 'thematic-faq'
              ? 'bg-white text-[#0f172a] shadow-segment font-semibold border border-slate-200/60'
              : 'text-[#64748b] hover:text-[#0f172a] font-medium'
              }`}
          >
            <HelpCircle size={14} className={currentView === 'thematic-faq' ? 'text-primary' : ''} />
            <span>Preguntas clave</span>
          </button>

          <button
            onClick={() => onViewChange('timeline')}
            className={`px-3 sm:px-4 py-1.5 rounded transition-all duration-150 flex items-center gap-1.5 ${currentView === 'timeline'
              ? 'bg-white text-[#0f172a] shadow-segment font-semibold border border-slate-200/60'
              : 'text-[#64748b] hover:text-[#0f172a] font-medium'
              }`}
          >
            <Calendar size={14} className={currentView === 'timeline' ? 'text-primary' : ''} />
            <span>Itinerario cronológico</span>
          </button>
        </div>
      </div>
    </header>
  );
};
