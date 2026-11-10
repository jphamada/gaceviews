import React, { useState } from 'react';
import { HelpCircle, ArrowRight, BookOpen, Quote } from 'lucide-react';
import { Discurso } from '../types/discurso';

interface Props {
  discursos: Discurso[];
  onSelectSpeech: (discurso: Discurso, targetParagraph?: number) => void;
}

export const ThematicQuestionsView: React.FC<Props> = ({ discursos, onSelectSpeech }) => {
  // Aggregate all FAQs from all speeches
  const allFaqsWithSpeech = discursos.flatMap((d) =>
    d.preguntasFrecuentes.map((faq) => ({
      ...faq,
      discurso: d,
      paragraphText: d.parrafos[faq.parrafoRef] || '',
    }))
  );

  const [selectedTopic, setSelectedTopic] = useState<string>('todos');

  const topics = [
    { id: 'todos', label: 'Todas las preguntas' },
    { id: 'santidad', label: 'Santidad, Brochero & Mama Antula' },
    { id: 'democracia', label: 'Democracia & Bien Común' },
    { id: 'trabajo', label: 'Trabajo, IA & Sindicatos' },
    { id: 'caridad', label: 'Caridad & Don Orione' },
    { id: 'familia', label: 'Familias & Evangelización' },
    { id: 'religioso', label: 'Diálogo Interreligioso & Paz' },
    { id: 'sinodalidad', label: 'Sinodalidad & Iglesia' },
  ];

  const filteredFaqs = allFaqsWithSpeech.filter((item) => {
    if (selectedTopic === 'todos') return true;
    const lowerTopic = selectedTopic.toLowerCase();
    const matchSpeech = item.discurso.palabrasClave.some((k) =>
      k.toLowerCase().includes(lowerTopic)
    );
    const matchQuestion = item.pregunta.toLowerCase().includes(lowerTopic);
    const matchText = item.paragraphText.toLowerCase().includes(lowerTopic);
    return matchSpeech || matchQuestion || matchText;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
      {/* Section Header */}
      <div className="border-b border-hairline pb-4 mb-6">
        <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-label-caps text-primary mb-1">
          <HelpCircle size={14} />
          <span>CONSULTA TEMÁTICA DEL CORPUS PONTIFICIO</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141b2b]">
          Preguntas Clave &amp; Concordancias Doctrinales
        </h2>
        <p className="font-sans text-neutral-secondary text-sm mt-1 max-w-2xl">
          Seleccione una interrogante para examinar la respuesta textual del Santo Padre con indicación del discurso y párrafo correspondiente.
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-hairline">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`px-3 py-1 text-xs font-semibold rounded uppercase tracking-label-caps border transition-colors ${
                selectedTopic === t.id
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white text-neutral-secondary border-[#d1d5db] hover:border-primary/50 hover:bg-slate-50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of QA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFaqs.map((faqItem, idx) => (
          <div
            key={idx}
            className="bg-white border border-hairline rounded p-5 flex flex-col justify-between hover:border-primary/60 hover:shadow-subtle transition-all duration-150"
          >
            <div>
              {/* Question Header */}
              <div className="flex items-start gap-2.5 mb-2.5">
                <span className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center font-display text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-[#141b2b] leading-snug">
                  {faqItem.pregunta}
                </h3>
              </div>

              {/* Speech Origin Tag */}
              <div className="text-[11px] uppercase tracking-label-caps text-primary font-bold mb-3 flex items-center gap-1.5">
                <BookOpen size={12} />
                <span className="line-clamp-1">{faqItem.discurso.titulo}</span>
              </div>

              {/* Excerpt Box */}
              <div className="bg-[#f8fafc] p-3.5 rounded border-l-2 border-primary mb-4">
                <Quote size={14} className="text-primary/40 mb-1" />
                <p className="font-sans text-xs text-neutral-core leading-relaxed line-clamp-4">
                  "{faqItem.paragraphText}"
                </p>
                <span className="block mt-2 text-[10px] uppercase font-bold tracking-label-caps text-neutral-caption">
                  Referencia: Párrafo {faqItem.parrafoRef + 1} • {faqItem.discurso.lugar}
                </span>
              </div>
            </div>

            {/* Jump Button */}
            <button
              onClick={() => onSelectSpeech(faqItem.discurso, faqItem.parrafoRef)}
              className="w-full py-1.5 px-3 bg-[#f1f5f9] hover:bg-primary hover:text-white text-neutral-core text-xs uppercase font-bold tracking-label-caps rounded flex items-center justify-center gap-2 border border-slate-200 transition-colors"
            >
              <span>Leer en el texto íntegro</span>
              <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
