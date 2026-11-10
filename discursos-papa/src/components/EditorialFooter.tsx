import React from 'react';

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-hairline mt-16 pt-8 pb-10 px-4 md:px-8 text-neutral-secondary font-sans no-print">
      <div className="max-w-5xl mx-auto">
        <div className="editorial-micro-rule mb-6 max-w-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs mb-8">
          <div>
            <p className="font-bold uppercase tracking-label-caps text-[#141b2b] mb-1.5 font-display text-sm">
              LA GACETA • Archivo Histórico
            </p>
            <p className="leading-relaxed text-neutral-caption">
              Plataforma interactiva diseñada para la consulta pública, académica y periodística del corpus de discursos pontificios de León XIV.
            </p>
          </div>

          <div>
            <p className="font-bold uppercase tracking-label-caps text-[#141b2b] mb-1.5 font-display text-sm">
              Rigor Documental
            </p>
            <p className="leading-relaxed text-neutral-caption">
              Todos los textos han sido cotejados con las publicaciones oficiales de la Sala de Prensa de la Santa Sede.
            </p>
          </div>

          <div>
            <p className="font-bold uppercase tracking-label-caps text-[#141b2b] mb-1.5 font-display text-sm">
              Sistema Visual
            </p>
            <p className="leading-relaxed text-neutral-caption">
              Diseño estructurado bajo el sistema <em>Editorial Infographics System</em> con tipografía Work Sans y Public Sans.
            </p>
          </div>
        </div>

        {/* Footer baseline per diseno.md: italic timestamp on left, editorial branding accent on right */}
        <div className="pt-4 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span className="italic font-sans text-neutral-caption">
            Actualizado: Noviembre de 2026 • Visita a la República Argentina
          </span>
          <span className="font-bold uppercase tracking-label-caps text-primary">
            LA GACETA S.A.
          </span>
        </div>
      </div>
    </footer>
  );
};
