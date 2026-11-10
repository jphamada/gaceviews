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
    src="https://gaceviews.vercel.app/discursos-papa/"
    width="100%"
    style="border: none; width: 100%; min-height: 850px; overflow: hidden;"
    scrolling="no"
    loading="lazy"
    title="Discursos del Papa León XIV en Argentina - LA GACETA"
  ></iframe>
  <script>
    window.addEventListener('message', function(event) {
      if (event.data && (event.data.type === 'gaceta-embed-resize' || event.data.frameHeight)) {
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
      <div className="bg-white border border-hairline rounded max-w-2xl w-full p-6 shadow-subtle relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-neutral-core"
          aria-label="Cerrar modal"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-hairline">
          <Code2 size={18} className="text-primary" />
          <h2 className="font-display text-xl font-bold text-[#141b2b]">
            Incrustar en nota periodística (Iframe Resizer Ready)
          </h2>
        </div>

        <p className="text-sm text-neutral-secondary mb-3 leading-relaxed font-sans">
          Copie y pegue el siguiente bloque de código en el CMS de LA GACETA. Incluye el listener dinámico de altura (<code>postMessage</code>) para evitar barras de desplazamiento secundarias.
        </p>

        <div className="relative mb-4">
          <pre className="bg-[#111827] text-[#f8fafc] p-4 text-xs font-mono rounded overflow-x-auto max-h-64 leading-normal select-all">
            {embedCode}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 px-3 py-1.5 bg-primary hover:bg-[#004d97] text-white text-xs uppercase font-bold tracking-label-caps rounded flex items-center gap-1.5 transition-colors shadow-xs"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copiar código</span>
              </>
            )}
          </button>
        </div>

        <div className="p-3 bg-[#f8fafc] rounded border-l-2 border-primary text-xs text-neutral-secondary flex items-start gap-2 font-sans">
          <AlertCircle size={15} className="text-primary shrink-0 mt-0.5" />
          <span>
            <strong>Compatibilidad:</strong> Funciona con WordPress, CMS de LA GACETA y entornos embebidos responsivos.
          </span>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#d1d5db] hover:bg-slate-100 text-xs uppercase font-bold tracking-label-caps text-neutral-core rounded transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
