import React from 'react';
import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react';
import { Discurso } from '../types/discurso';

interface Props {
  discursos: Discurso[];
  onSelectSpeech: (discurso: Discurso) => void;
}

export const TimelineView: React.FC<Props> = ({ discursos, onSelectSpeech }) => {
  // Sort by date ascending
  const sorted = [...discursos].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );

  const formatDay = (dateStr: string) => {
    const parts = dateStr.split('-');
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const monthIndex = parseInt(parts[1], 10) - 1;
    return {
      day: parts[2],
      month: months[monthIndex] || parts[1],
      year: parts[0],
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="border-b border-hairline pb-4 mb-8">
        <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-label-sm text-primary mb-1">
          <Calendar size={15} />
          <span>CRONOLOGÍA OFICIAL DE LA VISITA</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1D1A]">
          Itinerario Papal
        </h2>

      </div>

      {/* Timeline Steps */}
      <div className="relative border-l-2 border-primary ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
        {sorted.map((speech, index) => {
          const dateInfo = formatDay(speech.fecha);
          return (
            <div key={speech.id} className="relative group">
              {/* Timeline marker square per diseno.md (sharp zero radius) */}
              <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 bg-primary border-2 border-white"></div>

              {/* Card Container */}
              <div className="bg-surface-lowest border border-hairline p-5 md:p-6 hover:border-primary transition-all duration-150">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline/60 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-primary text-white text-xs font-bold font-mono px-2 py-0.5">
                      DÍA {index + 1}
                    </span>
                    <span className="font-sans font-bold text-sm text-[#1F1D1A]">
                      {dateInfo.day} de {dateInfo.month} de {dateInfo.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-secondary text-xs uppercase tracking-label-sm font-bold">
                    <MapPin size={13} />
                    <span>{speech.lugar}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1D1A] mb-2">
                  {speech.titulo}
                </h3>

                <div className="text-xs text-on-surface-variant italic font-serif mb-3 flex items-center gap-1.5">
                  <Users size={13} className="text-primary not-italic" />
                  <span>{speech.audiencia}</span>
                </div>

                <p className="text-sm text-on-surface leading-relaxed mb-4 text-justify">
                  {speech.resumen}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-hairline/60">
                  <div className="flex flex-wrap gap-1.5">
                    {speech.palabrasClave.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase font-bold tracking-label-sm px-2 py-0.5 bg-[rgba(117,170,219,0.1)] text-[#175683] border border-secondary-celesta"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectSpeech(speech)}
                    className="py-2 px-4 bg-primary hover:bg-[#96723B] text-white text-xs uppercase font-bold tracking-label-md flex items-center gap-1.5 transition-colors"
                  >
                    <span>Leer discurso</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
