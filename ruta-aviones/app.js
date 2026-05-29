document.addEventListener('DOMContentLoaded', () => {
  
  // Elementos DOM Globales
  const infoWidget = document.getElementById('info-widget');

  /* ==========================================
     1. PANTALLA 1 — INTERACTIVIDAD DEL MAPA
     ========================================== */
  const mapInfoBox = document.getElementById('map-info-box');
  const mapBtns = document.querySelectorAll('.map-btn');
  const mapNodes = document.querySelectorAll('.map-node');

  // Textos descriptivos por fase de ruta - Modificados en base a la nueva traza
  const phaseDescriptions = {
    "1": "<strong>Fase Aérea (Ingreso):</strong> Las aeronaves parten desde Santa Cruz (Bolivia) e ingresan de forma clandestina a baja altura para evadir radares. Realizan descargas de cocaína mediante aterrizajes exprés o 'bombardeos' en vuelo sobre campos de Salta, Tucumán, Chaco, Santiago del Estero y Catamarca.",
    "2": "<strong>Fase Terrestre (Tránsito):</strong> Tras la descarga aérea, el flujo de droga se unifica por tierra. Los cargamentos acopiados en Salta, Tucumán, Chaco y Santiago del Estero se trasladan hacia el Puerto de Paraná. Por su parte, la droga de Catamarca se transporta hacia el oeste para cruzar a la Vía del Pacífico.",
    "3": "<strong>Destino y Exportación:</strong> El Puerto de Paraná funciona como el nodo principal de salida fluvial atlántica hacia Europa. Hacia el oeste, las terminales marítimas de la Vía del Pacífico (Chile) sirven de plataforma comercial para enviar los cargamentos a mercados de Asia y Oceanía."
  };

  // Textos detallados para nodos geográficos específicos
  const nodeDescriptions = {
    "bolivia": "<strong>Santa Cruz (Bolivia):</strong> Centro de operaciones aéreas. Desde aquí despegan los aviones Cessna con matrículas duplicadas para transportar la droga hacia el NOA argentino.",
    "salta": "<strong>Salta:</strong> Eje principal de recepción fronteriza en el norte del país. Dispone de extensas fincas agrícolas donde aterrizan las aeronaves procedentes de Bolivia.",
    "tucuman": "<strong>Tucumán:</strong> Nodo neurálgico de acopio del NOA. Su densa red vial permite ocultar los cargamentos terrestres y coordinar el envío fluvial.",
    "chaco": "<strong>Chaco:</strong> Área silvestre de geografía impenetrable y baja cobertura de radar, ideal para realizar 'bombardeos' de bultos aéreos de forma segura sin aterrizar.",
    "catamarca": "<strong>Catamarca:</strong> Corredor terrestre estratégico. Conecta directamente a través de pasos cordilleranos andinos hacia los puertos de exportación en Chile.",
    "santiago": "<strong>Santiago del Estero:</strong> Zona de acopio intermedio con numerosas pistas rurales clandestinas. Sirve de enlace directo con el eje vial de la Ruta Nacional 34.",
    "ports": "<strong>Puerto de Paraná:</strong> Puerto de embarque internacional. Aquí se introduce la cocaína en cargamentos de exportación legal con destino al Atlántico.",
    "pacific": "<strong>Vía Pacífico:</strong> Puertos de la costa de Chile que actúan como trampolín comercial de la cocaína hacia los de alta demanda en Asia y Oceanía."
  };

  // Configuración de Fase inicial en el widget
  infoWidget.setAttribute('data-active-phase', '1');
  mapInfoBox.innerHTML = phaseDescriptions["1"];

  // Click en botones de control de fase
  mapBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Cambiar botones activos
      mapBtns.forEach(b => b.classList.remove('active'));
      const clickedBtn = e.currentTarget;
      clickedBtn.classList.add('active');

      const phase = clickedBtn.dataset.phase;
      infoWidget.setAttribute('data-active-phase', phase);
      mapInfoBox.innerHTML = phaseDescriptions[phase];
    });
  });

  // Interacción al pasar el cursor o hacer click en nodos del mapa
  mapNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const nodeKey = node.dataset.node;
      if (nodeDescriptions[nodeKey]) {
        mapInfoBox.innerHTML = nodeDescriptions[nodeKey];
        mapInfoBox.style.borderColor = "var(--color-amber)";
      }
    });

    node.addEventListener('mouseleave', () => {
      // Retornar al texto de la fase activa seleccionada
      const activeBtn = document.querySelector('.map-btn.active');
      const currentPhase = activeBtn ? activeBtn.dataset.phase : '1';
      mapInfoBox.innerHTML = phaseDescriptions[currentPhase];
      mapInfoBox.style.borderColor = "var(--color-border)";
    });

    // Para dispositivos móviles (click fija el texto)
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      const nodeKey = node.dataset.node;
      if (nodeDescriptions[nodeKey]) {
        mapInfoBox.innerHTML = nodeDescriptions[nodeKey];
        mapInfoBox.style.borderColor = "var(--color-amber)";
      }
    });
  });

  // Reset de caja del mapa al pulsar en vacío
  document.addEventListener('click', () => {
    const activeBtn = document.querySelector('.map-btn.active');
    if (activeBtn) {
      const currentPhase = activeBtn.dataset.phase;
      mapInfoBox.innerHTML = phaseDescriptions[currentPhase];
      mapInfoBox.style.borderColor = "var(--color-border)";
    }
  });

});
