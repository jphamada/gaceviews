import React from 'react';
import { MapPin, Calendar, Users, ArrowRight, HelpCircle, FileText } from 'lucide-react';
import { Discurso } from '../types/discurso';

interface Props {
  discurso: Discurso;
  matchingParagraphs?: Array<{ paragraphIndex: number; text: string }>;
  searchQuery?: string;
  onSelect: (discurso: Discurso, targetParagraph?: number) => void;
  onTagClick?: (tag: string) => void;
}

export const DiscursoCard: React.FC<Props> = ({
  discurso,
  matchingParagraphs = [],
  searchQuery = '',
  onSelect,
}) => {
  // Format date to Spanish editorial format (e.g. 10 de Noviembre de 2026)
  const formatEditorialDate = (isoDate: string) => {
    try {
      const [year, month, day] = isoDate.split('-');
      const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
    } catch {
      return isoDate;
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query || !query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-primary-fixed text-on-primary-fixed px-0.5 font-bold rounded-sm">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <article className="bg-white border border-hairline rounded flex flex-col justify-between hover:border-primary/60 hover:shadow-subtle transition-all duration-150 p-5 md:p-6">
      <div>
        {/* Top Metadata Line */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-hairline/80 text-xs font-sans">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#334155] font-bold text-[11px] uppercase tracking-label-caps">
            <MapPin size={11} className="text-primary" />
            <span>{discurso.lugar}</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-caption font-medium">
            <Calendar size={13} className="text-primary" />
            <time dateTime={discurso.fecha}>{formatEditorialDate(discurso.fecha)}</time>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-xl sm:text-2xl font-bold text-[#141b2b] leading-snug mb-2.5">
          <button
            onClick={() => onSelect(discurso)}
            className="text-left hover:text-primary transition-colors focus:outline-none"
          >
            {highlightMatch(discurso.titulo, searchQuery)}
          </button>
        </h2>

        {/* Audience */}
        <div className="flex items-center gap-2 text-xs text-neutral-secondary mb-3">
          <Users size={13} className="text-slate-400 shrink-0" />
          <span className="font-sans line-clamp-1">Audiencia: {discurso.audiencia}</span>
        </div>

        {/* Summary */}
        <p className="text-neutral-secondary text-sm leading-relaxed mb-4 font-sans text-justify">
          {highlightMatch(discurso.resumen, searchQuery)}
        </p>

        {/* Specific Search Hits preview if user searched */}
        {matchingParagraphs.length > 0 && searchQuery && (
          <div className="mb-4 p-3 bg-[#f8fafc] rounded border-l-2 border-primary text-xs font-sans">
            <p className="font-bold text-primary mb-1 uppercase tracking-label-caps flex items-center gap-1">
              <FileText size={12} />
              Coincidencia en el texto del discurso:
            </p>
            {matchingParagraphs.slice(0, 2).map((m) => (
              <div key={m.paragraphIndex} className="mt-1.5">
                <p className="text-neutral-core line-clamp-2">
                  <span className="font-semibold text-primary mr-1">§ Párrafo {m.paragraphIndex + 1}:</span>
                  "{highlightMatch(m.text, searchQuery)}"
                </p>
                <button
                  onClick={() => onSelect(discurso, m.paragraphIndex)}
                  className="mt-1 text-primary hover:underline font-bold text-[11px] inline-flex items-center gap-1"
                >
                  Ir directo a este párrafo &rarr;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Key questions in this speech */}
        {discurso.preguntasFrecuentes.length > 0 && (
          <div className="pt-3 border-t border-hairline/80 mb-4">
            <span className="text-[11px] uppercase font-bold tracking-label-caps text-neutral-caption flex items-center gap-1 mb-2">
              <HelpCircle size={12} className="text-primary" />
              Preguntas clave que responde:
            </span>
            <ul className="space-y-1.5 text-xs text-neutral-core font-sans">
              {discurso.preguntasFrecuentes.map((faq, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onSelect(discurso, faq.parrafoRef)}
                    className="text-left hover:text-primary transition-colors flex items-start gap-1 group"
                  >
                    <span className="text-primary font-bold">›</span>
                    <span className="group-hover:underline">{faq.pregunta}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Actions Footer */}
      <div className="pt-4 border-t border-hairline mt-2 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onSelect(discurso)}
          className="flex-1 py-2 px-4 bg-primary hover:bg-[#004d97] text-white text-xs uppercase font-bold tracking-label-caps rounded flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <span>Leer discurso completo</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
};
