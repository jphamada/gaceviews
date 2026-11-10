import React, { useState } from 'react';
import { X, Copy, Check, Code2, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EmbedInfoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const embedCode = `<!-- EMBED ESPECIAL LA GACETA: DISCURSOS PAPA LEÓN XIV -->
<div class="gaceta-embed-container" style="width: 100%; max-width: 1280px; margin: 0 auto;">
  <iframe
    id="iframe-discursos-papa"
    src="https://especiales.lagaceta.com.ar/discursos-papa/"
    width="100%"
    style="border: none; width: 100%; min-height: 850px; overflow: hidden;"
    scrolling="no"
    loading="lazy"
    title="Discursos del Papa León XIV en Argentina - LA GACETA"
  ></iframe>
  <script>
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'gaceta-embed-resize') {
        var el = document.getElementById('iframe-discursos-papa');
        if (el && event.data.height) {
          el.style.height = event.data.height + 'px';
        }
      }
    });
  </script>
</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-lowest border border-hairline max-w-2xl w-full p-6 shadow-subtle relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-outline hover:text-on-surface"
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-hairline">
          <Code2 size={20} className="text-primary" />
          <h2 className="font-serif text-xl font-bold text-[#1F1D1A]">
            Incrustar en nota periodística (Iframe Resizer Ready)
          </h2>
        </div>

        <p className="text-sm text-on-surface mb-3 leading-relaxed">
          Copie y pegue el siguiente bloque de código en el CMS de LA GACETA. Incluye el listener dinámico de altura (<code>postMessage</code>) para evitar barras de desplazamiento secundarias.
        </p>

        <div className="relative mb-4">
          <pre className="bg-[#1F1D1A] text-[#FAF7F2] p-4 text-xs font-mono overflow-x-auto max-h-64 leading-normal select-all">
            {embedCode}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1.5 bg-primary hover:bg-[#96723B] text-white text-xs uppercase font-bold tracking-label-sm flex items-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} className="text-tertiary-mint" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copiar código</span>
              </>
            )}
          </button>
        </div>

        <div className="p-3 bg-surface-container border-l-2 border-primary text-xs text-on-surface-variant flex items-start gap-2">
          <AlertCircle size={15} className="text-primary shrink-0 mt-0.5" />
          <span>
            <strong>Compatibilidad:</strong> Funciona con WordPress, CMS propietario de LA GACETA, Google AMP (vía amp-iframe) y frameworks frontend estándar.
          </span>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-surface-lowest border border-hairline hover:bg-surface-container text-xs uppercase font-bold tracking-label-md text-on-surface transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
