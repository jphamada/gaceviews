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
      {/* Top Banner: Newspaper Masthead Identification */}
      <div className="bg-[#111827] text-[#f8fafc] text-xs px-4 md:px-8 py-1.5 flex justify-between items-center tracking-label-caps font-sans uppercase">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-primary-fixed flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
            ARCHIVO DOCUMENTAL LA GACETA
          </span>
          <span className="text-outline/40">|</span>
          <span className="hidden sm:inline text-slate-300">ESPECIAL PERIODÍSTICO INTERACTIVO</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-300">
          <button
            onClick={onOpenEmbedModal}
            className="flex items-center gap-1 text-xs hover:text-white transition-colors"
            title="Código de incrustación para LA GACETA"
          >
            <Code2 size={13} />
            <span className="hidden sm:inline">Incrustar</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 text-xs hover:text-white transition-colors"
            title="Imprimir o exportar a PDF"
          >
            <Printer size={13} />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>
      </div>

      {/* Main Masthead Stack */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-6 pb-5 text-center">
        <p className="text-primary font-bold text-xs uppercase tracking-label-caps mb-1.5 font-sans">
          VISITA APOSTÓLICA A LA REPÚBLICA ARGENTINA • NOVIEMBRE 2026
        </p>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#141b2b] tracking-tight mb-2">
          Discursos y Homilías de León XIV
        </h1>

        <p className="font-sans text-neutral-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Corpus integral de alocuciones oficiales pronunciadas en Buenos Aires y Córdoba. Transcripciones oficiales de la Santa Sede.
        </p>

        {/* Micro-rule divider per Editorial Infographics System */}
        <div className="editorial-micro-rule my-4 max-w-3xl mx-auto"></div>

        {/* Segmented Controls (View Toggles) per diseno.md */}
        <div className="inline-flex p-1 bg-[#f1f5f9] rounded max-w-full overflow-x-auto gap-1 text-xs sm:text-sm font-sans">
          <button
            onClick={() => onViewChange('explorer')}
            className={`px-3 sm:px-4 py-1.5 rounded transition-all duration-150 flex items-center gap-1.5 ${
              currentView === 'explorer'
                ? 'bg-white text-[#0f172a] shadow-segment font-semibold border border-slate-200/60'
                : 'text-[#64748b] hover:text-[#0f172a] font-medium'
            }`}
          >
            <BookOpen size={14} className={currentView === 'explorer' ? 'text-primary' : ''} />
            <span>Corpus de Discursos ({totalDiscursos})</span>
          </button>

          <button
            onClick={() => onViewChange('thematic-faq')}
            className={`px-3 sm:px-4 py-1.5 rounded transition-all duration-150 flex items-center gap-1.5 ${
              currentView === 'thematic-faq'
                ? 'bg-white text-[#0f172a] shadow-segment font-semibold border border-slate-200/60'
                : 'text-[#64748b] hover:text-[#0f172a] font-medium'
            }`}
          >
            <HelpCircle size={14} className={currentView === 'thematic-faq' ? 'text-primary' : ''} />
            <span>Preguntas Clave & Ejes</span>
          </button>

          <button
            onClick={() => onViewChange('timeline')}
            className={`px-3 sm:px-4 py-1.5 rounded transition-all duration-150 flex items-center gap-1.5 ${
              currentView === 'timeline'
                ? 'bg-white text-[#0f172a] shadow-segment font-semibold border border-slate-200/60'
                : 'text-[#64748b] hover:text-[#0f172a] font-medium'
            }`}
          >
            <Calendar size={14} className={currentView === 'timeline' ? 'text-primary' : ''} />
            <span>Itinerario Cronológico</span>
          </button>
        </div>
      </div>
    </header>
  );
};
