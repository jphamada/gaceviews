import React, { useState } from 'react';
import { HelpCircle, ArrowRight, BookOpen, Quote } from 'lucide-react';
import { Discurso } from '../types/discurso';

interface Props {
  discursos: Discurso[];
  onSelectSpeech: (discurso: Discurso, targetParagraph?: number) => void;
}

export const ThematicQuestionsView: React.FC<Props> = ({ discursos, onSelectSpeech }) => {
  // Aggregate all FAQs from all 8 speeches
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
      {/* Section Header */}
      <div className="border-b border-hairline pb-4 mb-6">
        <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-label-sm text-primary mb-1">
          <HelpCircle size={15} />
          <span>CONSULTA TEMÁTICA</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1D1A]">
          Preguntas Clave
        </h2>
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-hairline/60">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-label-sm border transition-colors ${selectedTopic === t.id
                ? 'bg-primary text-white border-primary'
                : 'bg-surface-lowest text-on-surface border-hairline hover:border-primary'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of QA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFaqs.map((faqItem, idx) => (
          <div
            key={idx}
            className="bg-surface-lowest border border-hairline p-5 flex flex-col justify-between hover:border-primary transition-all duration-150"
          >
            <div>
              {/* Question Header */}
              <div className="flex items-start gap-2.5 mb-3">
                <span className="w-6 h-6 bg-primary text-white flex items-center justify-center font-serif text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1F1D1A] leading-snug">
                  {faqItem.pregunta}
                </h3>
              </div>

              {/* Speech Origin Tag */}
              <div className="text-xs uppercase tracking-label-sm text-secondary font-bold mb-3 flex items-center gap-1.5">
                <BookOpen size={13} />
                <span>{faqItem.discurso.titulo}</span>
                <span className="text-outline/50">•</span>
                <span className="text-on-surface-variant font-normal font-sans">{faqItem.discurso.lugar}</span>
              </div>

              {/* Excerpt Box */}
              <div className="bg-[#FAF7F2] p-4 border-l-2 border-primary mb-4">
                <Quote size={16} className="text-primary/40 mb-1" />
                <p className="font-serif italic text-sm text-on-surface leading-relaxed line-clamp-4">
                  "{faqItem.paragraphText}"
                </p>
                <span className="block mt-2 text-[10px] uppercase font-bold tracking-label-sm text-outline font-sans">
                  Referencia: Párrafo {faqItem.parrafoRef + 1}
                </span>
              </div>
            </div>

            {/* Jump Button */}
            <button
              onClick={() => onSelectSpeech(faqItem.discurso, faqItem.parrafoRef)}
              className="w-full py-2 px-3 bg-surface-container hover:bg-primary hover:text-white text-on-surface text-xs uppercase font-bold tracking-label-md flex items-center justify-center gap-2 border border-hairline transition-colors"
            >
              <span>Leer en el texto íntegro</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
