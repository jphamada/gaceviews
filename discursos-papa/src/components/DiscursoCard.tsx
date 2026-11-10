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
  onTagClick,
}) => {
  // Format date to solemn Spanish editorial format (e.g. 11 de Abril de 1987)
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
        <mark key={i} className="bg-primary-fixed text-on-primary-fixed px-0.5 font-bold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <article className="bg-surface-lowest border border-hairline flex flex-col justify-between hover:border-primary transition-all duration-150 p-5 md:p-6 shadow-[0_2px_8px_rgba(31,29,26,0.03)]">
      <div>
        {/* Top Metadata Line */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-hairline/60 text-xs font-sans">
          <div className="flex items-center gap-1.5 text-secondary font-bold uppercase tracking-label-sm">
            <MapPin size={13} />
            <span>{discurso.lugar}</span>
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant font-medium">
            <Calendar size={13} className="text-primary" />
            <time dateTime={discurso.fecha}>{formatEditorialDate(discurso.fecha)}</time>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F1D1A] leading-snug mb-2.5">
          <button
            onClick={() => onSelect(discurso)}
            className="text-left hover:text-primary transition-colors focus:outline-none"
          >
            {highlightMatch(discurso.titulo, searchQuery)}
          </button>
        </h2>

        {/* Audience */}
        <div className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
          <Users size={13} className="text-outline" />
          <span className="italic font-serif">Audiencia: {discurso.audiencia}</span>
        </div>

        {/* Summary */}
        <p className="text-on-surface text-sm leading-relaxed mb-4 font-sans text-justify">
          {highlightMatch(discurso.resumen, searchQuery)}
        </p>

        {/* Specific Search Hits preview if user searched */}
        {matchingParagraphs.length > 0 && searchQuery && (
          <div className="mb-4 p-3 bg-surface-container border-l-2 border-primary text-xs font-sans">
            <p className="font-bold text-primary mb-1 uppercase tracking-label-sm flex items-center gap-1">
              <FileText size={12} />
              Coincidencia en el texto del discurso:
            </p>
            {matchingParagraphs.slice(0, 2).map((m) => (
              <div key={m.paragraphIndex} className="mt-1.5">
                <p className="text-on-surface line-clamp-2">
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

        {/* Thematic Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {discurso.palabrasClave.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick && onTagClick(tag)}
              className="text-[11px] uppercase font-bold tracking-label-sm px-2 py-0.5 bg-[rgba(117,170,219,0.1)] text-[#175683] border border-secondary-celesta hover:bg-secondary-celesta/25 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Key questions in this speech */}
        {discurso.preguntasFrecuentes.length > 0 && (
          <div className="pt-3 border-t border-hairline/60 mb-4">
            <span className="text-[11px] uppercase font-bold tracking-label-sm text-outline flex items-center gap-1 mb-2">
              <HelpCircle size={12} className="text-primary" />
              Preguntas clave que responde:
            </span>
            <ul className="space-y-1.5 text-xs text-on-surface font-sans">
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
          className="flex-1 py-2.5 px-4 bg-primary hover:bg-[#96723B] text-white text-xs uppercase font-bold tracking-label-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span>Leer discurso completo</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={() => onSelect(discurso, discurso.preguntasFrecuentes[0]?.parrafoRef ?? 0)}
          className="py-2.5 px-3 bg-transparent border border-primary text-primary hover:bg-surface-container text-xs uppercase font-bold tracking-label-md transition-colors"
          title="Ver análisis y puntos clave"
        >
          Ver puntos clave
        </button>
      </div>
    </article>
  );
};
