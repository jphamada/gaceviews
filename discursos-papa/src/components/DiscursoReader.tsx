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
    const citation = `Papa León XIV. "${discurso.titulo}". Pronunciado en ${discurso.lugar}, el ${discurso.fecha}. Archivo LA GACETA.`;
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
        return 'text-lg md:text-xl leading-relaxed md:leading-[2.1rem]';
      case 'xlarge':
        return 'text-xl md:text-2xl leading-loose md:leading-[2.4rem]';
      default:
        return 'text-base md:text-lg leading-relaxed md:leading-[1.9rem]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Top Breadcrumb & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-hairline no-print">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-label-caps text-primary hover:text-primary-container transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Volver al índice de discursos</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-sans">
          {/* Font Size controls */}
          <div className="flex items-center border border-hairline bg-white rounded overflow-hidden">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                fontSize === 'normal' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Tipografía estándar"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                fontSize === 'large' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Tipografía mediana"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 text-xs font-bold transition-colors ${
                fontSize === 'xlarge' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Tipografía grande"
            >
              A++
            </button>
          </div>

          {/* Copy Citation */}
          <button
            onClick={handleCopyCitation}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-hairline bg-white rounded text-neutral-core hover:border-primary transition-colors uppercase tracking-label-caps font-bold text-[11px]"
            title="Copiar cita periodística"
          >
            {citationCopied ? (
              <>
                <Check size={13} className="text-tertiary" />
                <span className="text-tertiary">Copiado</span>
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
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-hairline bg-white rounded text-neutral-core hover:border-primary transition-colors uppercase tracking-label-caps font-bold text-[11px]"
            title="Imprimir discurso"
          >
            <Printer size={13} className="text-slate-500" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Main 12-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main 8-Column Editorial Article Stream */}
        <div className="lg:col-span-8 bg-white border border-hairline rounded p-6 md:p-10 shadow-subtle">
          {/* Header Metadata */}
          <div className="border-b border-hairline pb-4 mb-6 font-sans">
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs uppercase tracking-label-caps font-bold mb-2.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-primary border border-primary/20">
                <MapPin size={11} />
                {discurso.lugar}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-neutral-secondary font-medium">
                <Calendar size={13} className="text-primary" />
                {discurso.fecha}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-neutral-caption font-normal">
                Lectura estimada: {Math.ceil(discurso.parrafos.join(' ').split(' ').length / 180)} min
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#141b2b] leading-tight tracking-tight mb-3">
              {discurso.titulo}
            </h1>

            <div className="flex items-center gap-2 text-sm text-neutral-secondary font-sans">
              <Users size={15} className="text-primary shrink-0" />
              <span>Audiencia oficial: {discurso.audiencia}</span>
            </div>
          </div>

          {/* Audio Player Banner per Editorial Infographics System */}
          <div className="w-full bg-[#0265c2] text-white rounded p-4 mb-8 shadow-sm no-print">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-9 h-9 rounded-full bg-white text-[#0265c2] flex items-center justify-center hover:bg-slate-100 transition-colors focus:outline-none shadow-xs"
                  aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <div>
                  <p className="text-xs uppercase tracking-label-caps font-bold text-white/95">
                    Registro Fonográfico de la Visita Pastoral
                  </p>
                  <p className="text-xs text-white/80 font-sans">
                    Grabación oficial de archivo sonoro • Radio Vaticana &amp; Transmisión Oficial
                  </p>
                </div>
              </div>

              {/* Speed toggle */}
              <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
                <button
                  onClick={() => {
                    const speeds = [1.0, 1.25, 1.5];
                    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                    setPlaybackSpeed(next);
                  }}
                  className="px-2 py-0.5 bg-white/20 hover:bg-white/30 text-white font-mono text-[11px] rounded"
                >
                  {playbackSpeed}x
                </button>
                <button
                  onClick={() => setAudioProgress(0)}
                  className="p-1 hover:bg-white/20 text-white rounded"
                  title="Reiniciar"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Scrubber Progress bar */}
            <div className="mt-3">
              <div
                className="w-full bg-white/30 h-1.5 rounded-full cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  setAudioProgress(Math.min(100, Math.max(0, pos * 100)));
                }}
              >
                <div
                  className="bg-white h-full rounded-full transition-all duration-150"
                  style={{ width: `${audioProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-white/85 mt-1">
                <span>0{Math.floor((audioProgress * 4.5) / 60)}:{String(Math.floor((audioProgress * 4.5) % 60)).padStart(2, '0')}</span>
                <span>04:30</span>
              </div>
            </div>
          </div>

          {/* Executive Summary Lead Callout Box */}
          <div className="bg-[#f1f5f9] border-l-4 border-primary rounded-r p-4 md:p-5 mb-8">
            <p className="text-xs uppercase font-bold tracking-label-caps text-primary mb-1 font-sans">
              Síntesis Doctrinal &amp; Resumen Editorial
            </p>
            <p className="font-sans text-base md:text-lg text-neutral-core leading-relaxed font-normal">
              "{discurso.resumen}"
            </p>
          </div>

          {/* Full Paragraphs Content Stream */}
          <div className="space-y-6 text-neutral-core font-sans">
            {discurso.parrafos.map((parrafo, idx) => {
              const isFirst = idx === 0;
              const isTargeted = highlightedParagraph === idx;

              return (
                <div
                  key={idx}
                  className={`relative group transition-all duration-200 p-3 -mx-3 rounded border-l-2 ${
                    isTargeted
                      ? 'bg-primary-fixed/30 border-primary pl-4'
                      : 'border-transparent hover:border-hairline'
                  }`}
                >
                  {/* Paragraph anchor & number tag */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-caption uppercase tracking-label-caps mb-1.5 select-none">
                    <span className="font-bold text-primary">
                      § PÁRRAFO {idx + 1}
                    </span>
                    <button
                      onClick={() => handleCopyParagraph(parrafo, idx)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-neutral-core text-slate-500"
                      title="Copiar este párrafo con cita"
                    >
                      {copiedParagraph === idx ? (
                        <>
                          <Check size={11} className="text-tertiary" />
                          <span className="text-tertiary font-bold">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy size={11} />
                          <span>Copiar párrafo</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Paragraph text */}
                  <p
                    ref={(el) => (paragraphRefs.current[idx] = el)}
                    className={`${getFontSizeClass()} ${
                      isFirst ? 'drop-cap' : ''
                    } text-justify font-sans`}
                  >
                    {parrafo}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footnote */}
          <div className="mt-10 pt-6 border-t border-hairline font-sans text-xs text-neutral-caption flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p>
              Transcripción canónica oficial de la Sala de Prensa de la Santa Sede.
            </p>
            <span className="text-[11px] uppercase tracking-label-caps font-bold text-primary">
              Corpus León XIV • Noviembre 2026
            </span>
          </div>
        </div>

        {/* 4-Column Contextual Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Box 1: Preguntas Frecuentes Respondidas */}
          <div className="bg-white border border-hairline rounded p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-hairline">
              <HelpCircle size={16} className="text-primary" />
              <h3 className="font-display text-lg font-bold text-[#141b2b]">
                Preguntas clave de este discurso
              </h3>
            </div>
            <p className="text-xs text-neutral-secondary mb-3 font-sans">
              Haga clic sobre una pregunta para saltar y resaltar el párrafo correspondiente:
            </p>
            <div className="space-y-2">
              {discurso.preguntasFrecuentes.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleJumpToParagraph(faq.parrafoRef)}
                  className={`w-full text-left p-2.5 text-xs font-sans rounded border transition-all ${
                    highlightedParagraph === faq.parrafoRef
                      ? 'bg-primary-fixed/40 border-primary text-[#141b2b] font-semibold'
                      : 'bg-[#f8fafc] border-hairline hover:border-primary/50 text-neutral-core'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-primary font-bold">›</span>
                    <div className="flex-1">
                      <p className="leading-snug">{faq.pregunta}</p>
                      <span className="inline-block mt-1 text-[10px] text-primary uppercase font-bold tracking-label-caps">
                        Ver párrafo {faq.parrafoRef + 1}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Box 2: Ejes Temáticos */}
          <div className="bg-white border border-hairline rounded p-5 shadow-xs">
            <h3 className="font-display text-base font-bold text-[#141b2b] pb-2 mb-3 border-b border-hairline">
              Ejes temáticos y concordancias
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {discurso.palabrasClave.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] uppercase font-bold tracking-label-caps px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#334155] border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Box 3: Navegación de la Visita */}
          <div className="bg-[#f8fafc] border border-hairline rounded p-5">
            <h3 className="font-display text-base font-bold text-[#141b2b] pb-2 mb-3 border-b border-hairline">
              Itinerario de discursos
            </h3>
            <div className="space-y-3">
              {prevSpeech && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-label-caps text-neutral-caption block mb-1">
                    ← Discurso anterior
                  </span>
                  <button
                    onClick={() => onSelectSpeech(prevSpeech)}
                    className="w-full text-left p-2.5 bg-white border border-hairline rounded hover:border-primary transition-colors text-xs font-sans group"
                  >
                    <p className="font-bold text-neutral-core group-hover:text-primary transition-colors line-clamp-1">
                      {prevSpeech.titulo}
                    </p>
                    <span className="text-[11px] text-neutral-caption">
                      {prevSpeech.lugar}
                    </span>
                  </button>
                </div>
              )}

              {nextSpeech && (
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-label-caps text-neutral-caption block mb-1">
                    Discurso siguiente →
                  </span>
                  <button
                    onClick={() => onSelectSpeech(nextSpeech)}
                    className="w-full text-left p-2.5 bg-white border border-hairline rounded hover:border-primary transition-colors text-xs font-sans group"
                  >
                    <p className="font-bold text-neutral-core group-hover:text-primary transition-colors line-clamp-1">
                      {nextSpeech.titulo}
                    </p>
                    <span className="text-[11px] text-neutral-caption">
                      {nextSpeech.lugar}
                    </span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={onBack}
              className="w-full mt-4 py-2 px-3 bg-white border border-hairline rounded hover:bg-slate-100 text-xs uppercase font-bold tracking-label-caps text-neutral-core text-center transition-colors block"
            >
              Ver todos los discursos ({allDiscursos.length})
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
