import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Printer,
  HelpCircle,
} from 'lucide-react';
import { Discurso } from '../types/discurso';
import { triggerHeightCheck } from '../utils/iframeBridge';

interface Props {
  discurso: Discurso;
  allDiscursos: Discurso[];
  targetParagraphIndex?: number;
  onBack: () => void;
  onSelectSpeech: (discurso: Discurso, targetParagraph?: number) => void;
}

export const DiscursoReader: React.FC<Props> = ({
  discurso,
  allDiscursos,
  targetParagraphIndex,
  onBack,
  onSelectSpeech,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedParagraph, setCopiedParagraph] = useState<number | null>(null);
  const [citationCopied, setCitationCopied] = useState<boolean>(false);
  const [highlightedParagraph, setHighlightedParagraph] = useState<number | null>(
    targetParagraphIndex ?? null
  );

  // Audio player state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const audioIntervalRef = useRef<number | null>(null);

  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Find previous and next speech
  const currentIndex = allDiscursos.findIndex((d) => d.id === discurso.id);
  const prevSpeech = currentIndex > 0 ? allDiscursos[currentIndex - 1] : null;
  const nextSpeech = currentIndex < allDiscursos.length - 1 ? allDiscursos[currentIndex + 1] : null;

  // Scroll to target paragraph if specified
  useEffect(() => {
    if (typeof targetParagraphIndex === 'number' && targetParagraphIndex >= 0) {
      setHighlightedParagraph(targetParagraphIndex);
      setTimeout(() => {
        const el = paragraphRefs.current[targetParagraphIndex];
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
    triggerHeightCheck();
  }, [targetParagraphIndex, discurso.id]);

  // Audio simulation timer
  useEffect(() => {
    if (isPlaying) {
      audioIntervalRef.current = window.setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5 * playbackSpeed;
        });
      }, 250);
    } else if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  const handleJumpToParagraph = (pIdx: number) => {
    setHighlightedParagraph(pIdx);
    const el = paragraphRefs.current[pIdx];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCopyCitation = () => {
    const citation = `Papa León XIV. "${discurso.titulo}". Pronunciado en ${discurso.lugar}, el ${discurso.fecha}. Corpus Histórico de Discursos Pontificios en Argentina, Archivo LA GACETA.`;
    navigator.clipboard.writeText(citation);
    setCitationCopied(true);
    setTimeout(() => setCitationCopied(false), 2500);
  };

  const handleCopyParagraph = (text: string, index: number) => {
    const citation = `"${text}" — Papa León XIV en "${discurso.titulo}" (${discurso.lugar}, ${discurso.fecha}), párrafo ${index + 1}. Vía Archivo LA GACETA.`;
    navigator.clipboard.writeText(citation);
    setCopiedParagraph(index);
    setTimeout(() => setCopiedParagraph(null), 2500);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg md:text-xl leading-relaxed md:leading-[2.2rem]';
      case 'xlarge':
        return 'text-xl md:text-2xl leading-loose md:leading-[2.5rem]';
      default:
        return 'text-base md:text-lg leading-relaxed md:leading-[2rem]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Top Breadcrumb & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-hairline no-print">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-label-md text-primary hover:text-[#1F1D1A] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Volver al índice general del corpus</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-sans">
          {/* Font Size controls */}
          <div className="flex items-center border border-hairline bg-surface-lowest">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1.5 font-bold transition-colors ${fontSize === 'normal' ? 'bg-primary text-white' : 'hover:bg-surface-container'
                }`}
              title="Tipografía estándar"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1.5 font-bold transition-colors ${fontSize === 'large' ? 'bg-primary text-white' : 'hover:bg-surface-container'
                }`}
              title="Tipografía mediana"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1.5 font-bold transition-colors ${fontSize === 'xlarge' ? 'bg-primary text-white' : 'hover:bg-surface-container'
                }`}
              title="Tipografía grande"
            >
              A++
            </button>
          </div>

          {/* Copy Citation */}
          <button
            onClick={handleCopyCitation}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-hairline bg-surface-lowest text-on-surface hover:border-primary transition-colors uppercase tracking-label-sm font-bold text-[11px]"
            title="Copiar cita bibliográfica y periodística"
          >
            {citationCopied ? (
              <>
                <Check size={13} className="text-tertiary" />
                <span className="text-tertiary">Cita copiada</span>
              </>
            ) : (
              <>
                <Copy size={13} className="text-primary" />
                <span>Copiar cita</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-hairline bg-surface-lowest text-on-surface hover:border-primary transition-colors uppercase tracking-label-sm font-bold text-[11px]"
            title="Imprimir discurso para archivo"
          >
            <Printer size={13} className="text-outline" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Main 12-Column Asymmetrical Grid Layout per diseno.md */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main 8-Column Editorial Article Stream */}
        <div className="lg:col-span-8 bg-surface-lowest border border-hairline p-6 md:p-10 shadow-[0_2px_12px_rgba(31,29,26,0.04)]">
          {/* Header Metadata */}
          <div className="border-b border-hairline pb-4 mb-6 font-sans">
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs uppercase tracking-label-sm text-secondary font-bold mb-2">
              <span className="flex items-center gap-1">
                <MapPin size={13} />
                {discurso.lugar}
              </span>
              <span className="text-outline/40">•</span>
              <span className="flex items-center gap-1 text-on-surface-variant font-medium">
                <Calendar size={13} className="text-primary" />
                {discurso.fecha}
              </span>
              <span className="text-outline/40">•</span>
              <span className="text-outline">Lectura estimada: {Math.ceil(discurso.parrafos.join(' ').split(' ').length / 180)} min</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#1F1D1A] leading-tight md:leading-[48px] tracking-tight mb-3">
              {discurso.titulo}
            </h1>

            <div className="flex items-center gap-2 text-sm text-on-surface-variant italic font-serif">
              <Users size={15} className="text-primary not-italic" />
              <span>Audiencia oficial: {discurso.audiencia}</span>
            </div>
          </div>




          {/* Full Paragraphs Content Stream */}
          <div className="space-y-6 text-on-surface font-sans">
            {discurso.parrafos.map((parrafo, idx) => {
              const isFirst = idx === 0;
              const isTargeted = highlightedParagraph === idx;

              return (
                <div
                  key={idx}
                  className={`relative group transition-all duration-300 p-3 -mx-3 border-l-2 ${isTargeted
                    ? 'bg-primary-fixed/20 border-primary pl-4'
                    : 'border-transparent hover:border-hairline'
                    }`}
                >


                  {/* Paragraph text */}
                  <p
                    ref={(el) => (paragraphRefs.current[idx] = el)}
                    className={`${getFontSizeClass()} ${isFirst ? 'drop-cap' : ''
                      } text-justify font-sans`}
                  >
                    {parrafo}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Literary attribution footnote per diseno.md */}
          <div className="mt-10 pt-6 border-t border-hairline font-serif italic text-xs text-on-surface-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p>
              Transcripción canónica y cotejo hemerográfico realizado por la redacción de LA GACETA.
            </p>
            <span className="not-italic text-[11px] font-sans uppercase tracking-label-sm font-bold text-primary">
              Corpus León XIV • Noviembre 2026
            </span>
          </div>
        </div>

        {/* 4-Column Chronological & Contextual Sidebar per diseno.md */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Box 1: Preguntas Frecuentes Respondidas */}
          <div className="bg-surface-lowest border border-hairline p-5">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-hairline">
              <HelpCircle size={16} className="text-primary" />
              <h3 className="font-serif text-lg font-bold text-[#1F1D1A]">
                Preguntas clave de este discurso
              </h3>
            </div>
            <p className="text-xs text-on-surface-variant mb-4">
              Haga clic sobre una pregunta para saltar y resaltar de inmediato el párrafo correspondiente en el texto:
            </p>
            <div className="space-y-2.5">
              {discurso.preguntasFrecuentes.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJumpToParagraph(faq.parrafoRef)}
                  className={`w-full text-left p-3 text-xs font-sans border transition-all ${highlightedParagraph === faq.parrafoRef
                    ? 'bg-primary-fixed/30 border-primary text-[#1F1D1A] font-bold'
                    : 'bg-surface-container-low border-hairline/60 hover:border-primary text-on-surface'
                    }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold">›</span>
                    <div className="flex-1">
                      <p className="leading-snug">{faq.pregunta}</p>
                      <span className="inline-block mt-1 text-[10px] text-primary uppercase font-bold tracking-label-sm">
                        Ver párrafo {faq.parrafoRef + 1}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Box 2: Ejes Temáticos del Discurso */}
          <div className="bg-surface-lowest border border-hairline p-5">
            <h3 className="font-serif text-base font-bold text-[#1F1D1A] pb-2 mb-3 border-b border-hairline">
              Ejes temáticos y concordancias
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {discurso.palabrasClave.map((tag) => (
                <span
                  key={tag}
                  className="text-xs uppercase font-bold tracking-label-sm px-2.5 py-1 bg-[rgba(117,170,219,0.1)] text-[#175683] border border-secondary-celesta"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Box 3: Navegación de la Visita (Anterior / Siguiente) */}
          <div className="bg-surface-container border border-hairline p-5">
            <h3 className="font-serif text-base font-bold text-[#1F1D1A] pb-2 mb-3 border-b border-hairline/80">
              Itinerario papal
            </h3>
            <div className="space-y-3">
              {prevSpeech && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-label-sm text-outline block mb-1">
                    ← Discurso anterior
                  </span>
                  <button
                    onClick={() => onSelectSpeech(prevSpeech)}
                    className="w-full text-left p-2.5 bg-surface-lowest border border-hairline hover:border-primary transition-colors text-xs font-sans group"
                  >
                    <p className="font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {prevSpeech.titulo}
                    </p>
                    <span className="text-[11px] text-on-surface-variant font-serif italic">
                      {prevSpeech.lugar}
                    </span>
                  </button>
                </div>
              )}

              {nextSpeech && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-label-sm text-outline block mb-1">
                    Discurso siguiente →
                  </span>
                  <button
                    onClick={() => onSelectSpeech(nextSpeech)}
                    className="w-full text-left p-2.5 bg-surface-lowest border border-hairline hover:border-primary transition-colors text-xs font-sans group"
                  >
                    <p className="font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {nextSpeech.titulo}
                    </p>
                    <span className="text-[11px] text-on-surface-variant font-serif italic">
                      {nextSpeech.lugar}
                    </span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onBack}
              className="w-full mt-4 py-2 px-3 bg-surface-lowest border border-hairline hover:bg-surface-dim text-xs uppercase font-bold tracking-label-md text-on-surface text-center transition-colors block"
            >
              Ver todos los discursos ({allDiscursos.length})
            </button>
          </div>
        </aside>
      </div >
    </div >
  );
};
