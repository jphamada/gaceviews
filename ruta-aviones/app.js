document.addEventListener('DOMContentLoaded', () => {

  const infoWidget  = document.getElementById('info-widget');
  const mapInfoBox  = document.getElementById('map-info-box');
  const mapBtns     = document.querySelectorAll('.map-btn');
  const mapNodes    = document.querySelectorAll('.map-node');

  // ──────────────────────────────────────────
  // Textos por fase
  // ──────────────────────────────────────────
  const phaseTexts = {
    '1': '<strong>Fase Aérea (Ingreso):</strong> Las aeronaves parten desde Santa Cruz (Bolivia) e ingresan a baja altura para evadir radares. Realizan descargas de cocaína mediante aterrizajes exprés o "bombardeos" en vuelo sobre campos de Salta, Tucumán, Chaco, Santiago del Estero y Catamarca.',
    '2': '<strong>Fase Terrestre (Tránsito):</strong> Tras la descarga aérea, el flujo de droga se unifica por tierra. Los cargamentos de Salta, Tucumán, Chaco y Santiago del Estero se trasladan al Puerto de Paraná. La droga de Catamarca cruza los Andes hacia la Vía del Pacífico.',
    '3': '<strong>Destino y Exportación:</strong> El Puerto de Paraná es el nodo principal de salida fluvial atlántica hacia Europa. Las terminales de la Vía del Pacífico (Chile) sirven de plataforma para enviar cargamentos a Asia y Oceanía.'
  };

  // Textos por nodo geográfico
  const nodeTexts = {
    'bolivia':  '<strong>Santa Cruz (Bolivia):</strong> Centro de operaciones aéreas. Desde aquí despegan los aviones Cessna con matrículas duplicadas hacia el NOA argentino.',
    'salta':    '<strong>Salta:</strong> Eje principal de recepción fronteriza. Extensas fincas agrícolas sirven de pista para las aeronaves procedentes de Bolivia.',
    'tucuman':  '<strong>Tucumán:</strong> Nodo neurálgico de acopio del NOA. Su densa red vial permite ocultar los cargamentos y coordinar el envío fluvial.',
    'chaco':    '<strong>Chaco:</strong> Geografía impenetrable y baja cobertura de radar, ideal para "bombardeos" aéreos de bultos sin necesidad de aterrizar.',
    'catamarca':'<strong>Catamarca:</strong> Corredor terrestre estratégico. Conecta a través de pasos andinos con los puertos de exportación en Chile.',
    'santiago': '<strong>Santiago del Estero:</strong> Zona de acopio intermedio con numerosas pistas rurales clandestinas. Enlace directo con la Ruta Nacional 34.',
    'ports':    '<strong>Puerto de Paraná:</strong> Puerto de embarque internacional. La cocaína se introduce en cargamentos de exportación legal con destino al Atlántico.',
    'pacific':  '<strong>Vía Pacífico:</strong> Puertos chilenos que actúan como trampolín comercial hacia los mercados de Asia y Oceanía.'
  };

  // ──────────────────────────────────────────
  // Estado inicial
  // ──────────────────────────────────────────
  let activePhase = '1';
  infoWidget.setAttribute('data-active-phase', activePhase);
  setInfoText(phaseTexts[activePhase]);

  // ──────────────────────────────────────────
  // Helpers
  // ──────────────────────────────────────────
  function setInfoText(html, highlight = false) {
    if (!mapInfoBox) return;
    mapInfoBox.innerHTML = html;
    mapInfoBox.style.borderColor = highlight ? 'var(--color-amber)' : '';
  }

  function resetInfoToPhase() {
    setInfoText(phaseTexts[activePhase]);
  }

  // ──────────────────────────────────────────
  // Botones de fase
  // ──────────────────────────────────────────
  mapBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mapBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePhase = btn.dataset.phase;
      infoWidget.setAttribute('data-active-phase', activePhase);
      setInfoText(phaseTexts[activePhase]);
    });
  });

  // ──────────────────────────────────────────
  // Nodos del mapa
  // Hover en desktop → muestra descripción del nodo
  // Click / tap en cualquier dispositivo → fija el texto
  // ──────────────────────────────────────────
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  mapNodes.forEach(node => {
    const key = node.dataset.node;

    // Hover (solo dispositivos con puntero fino)
    node.addEventListener('mouseenter', () => {
      if (isTouchDevice()) return;
      if (nodeTexts[key]) setInfoText(nodeTexts[key], true);
    });

    node.addEventListener('mouseleave', () => {
      if (isTouchDevice()) return;
      resetInfoToPhase();
    });

    // Click / tap (fija el texto del nodo en móvil; en desktop es opcional)
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      if (nodeTexts[key]) setInfoText(nodeTexts[key], true);
    });
  });

  // Clic fuera de nodos → restaura el texto de la fase
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.map-node')) {
      resetInfoToPhase();
    }
  });

});
