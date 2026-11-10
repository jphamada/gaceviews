import React from 'react';
import { BookOpen, Calendar, HelpCircle, Printer, Code2 } from 'lucide-react';
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
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="w-full bg-surface-lowest border-b border-hairline no-print">

      {/* Main Broadside Masthead */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-5 text-center">
        <p className="text-primary font-bold tracking-label-md text-xs md:text-sm uppercase mb-1 font-sans">
          VISITA A LA REPÚBLICA ARGENTINA
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F1D1A] font-bold tracking-tight mb-2">
          Discursos y homilias de León XIV
        </h1>



        {/* Double-rule divider per diseno.md */}
        <div className="masthead-double-rule my-4 max-w-4xl mx-auto"></div>

        {/* Navigation View Switcher */}
        <div className="flex flex-wrap justify-center items-center gap-1 md:gap-3 text-xs md:text-sm font-sans">
          <button
            onClick={() => onViewChange('explorer')}
            className={`px-3 md:px-4 py-2 uppercase font-bold tracking-label-md transition-colors border ${currentView === 'explorer'
              ? 'bg-primary text-white border-primary'
              : 'bg-transparent text-on-surface border-transparent hover:border-hairline hover:bg-surface-container'
              }`}
          >
            <span className="flex items-center gap-1.5">
              <BookOpen size={15} />
              Corpus de Discursos ({totalDiscursos})
            </span>
          </button>

          <button
            onClick={() => onViewChange('thematic-faq')}
            className={`px-3 md:px-4 py-2 uppercase font-bold tracking-label-md transition-colors border ${currentView === 'thematic-faq'
              ? 'bg-primary text-white border-primary'
              : 'bg-transparent text-on-surface border-transparent hover:border-hairline hover:bg-surface-container'
              }`}
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle size={15} />
              Preguntas Clave & Ejes Temáticos
            </span>
          </button>

          <button
            onClick={() => onViewChange('timeline')}
            className={`px-3 md:px-4 py-2 uppercase font-bold tracking-label-md transition-colors border ${currentView === 'timeline'
              ? 'bg-primary text-white border-primary'
              : 'bg-transparent text-on-surface border-transparent hover:border-hairline hover:bg-surface-container'
              }`}
          >
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              Itinerario Cronológico
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
