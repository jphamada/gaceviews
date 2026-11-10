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
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="border-b border-hairline pb-4 mb-8">
        <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-label-caps text-primary mb-1">
          <Calendar size={14} />
          <span>CRONOLOGÍA</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141b2b]">
          Itinerario de León XIV
        </h2>

      </div>

      {/* Timeline Steps with 2px solid #e2e8f0 and 10px circular nodes */}
      <div className="relative border-l-2 border-[#e2e8f0] ml-3 md:ml-6 pl-5 md:pl-8 space-y-8">
        {sorted.map((speech, index) => {
          const dateInfo = formatDay(speech.fecha);
          return (
            <div key={speech.id} className="relative group">
              {/* Timeline Dot Node: 10px circle with 2px white border and #0265c2 fill per diseno.md */}
              <div className="absolute -left-[27px] md:-left-[39px] top-4 w-3.5 h-3.5 rounded-full bg-[#0265c2] border-2 border-white shadow-xs"></div>

              {/* Card Container */}
              <div className="bg-white border border-hairline rounded p-5 md:p-6 hover:border-primary/60 hover:shadow-subtle transition-all duration-150">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline/80 pb-2.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#eff6ff] text-primary border border-primary/20 text-xs font-bold font-sans px-2.5 py-0.5 rounded-full uppercase tracking-label-caps">
                      Día {index + 1}
                    </span>
                    <span className="font-sans font-bold text-sm text-[#141b2b]">
                      {dateInfo.day} de {dateInfo.month} de {dateInfo.year}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#334155] text-[11px] font-bold uppercase tracking-label-caps">
                    <MapPin size={11} className="text-primary" />
                    <span>{speech.lugar}</span>
                  </div>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-[#141b2b] mb-1.5">
                  {speech.titulo}
                </h3>

                <div className="text-xs text-neutral-secondary font-sans mb-3 flex items-center gap-1.5">
                  <Users size={13} className="text-primary shrink-0" />
                  <span>{speech.audiencia}</span>
                </div>

                <p className="text-sm text-neutral-secondary leading-relaxed mb-4 text-justify font-sans">
                  {speech.resumen}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-hairline/80">
                  <div className="flex flex-wrap gap-1.5">
                    {speech.palabrasClave.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase font-bold tracking-label-caps px-2 py-0.5 rounded-full bg-[#f1f5f9] text-[#334155] border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectSpeech(speech)}
                    className="py-1.5 px-3.5 bg-primary hover:bg-[#004d97] text-white text-xs uppercase font-bold tracking-label-caps rounded flex items-center gap-1.5 transition-colors shadow-xs"
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
