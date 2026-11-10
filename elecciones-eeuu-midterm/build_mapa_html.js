const fs = require('fs');

const compiled = JSON.parse(fs.readFileSync('distritos_compiled.json', 'utf8'));

// Build the SVG polygons, labels, lines
let hexMarkup = '';
compiled.districts.forEach((d, idx) => {
  const isKey = d.key;
  const stroke = isKey ? '#111827' : '#ffffff';
  const strokeW = isKey ? '2.5' : '1.3';
  const strokeClass = isKey ? 'district-key' : '';

  // Calculate entrance animation delay
  const animDelay = (idx * 0.0018).toFixed(3);

  hexMarkup += `
      <polygon 
        id="district_${d.id}"
        class="district-hex party-${d.party} ${strokeClass} anim-in" 
        points="${d.points}" 
        stroke="${stroke}" 
        stroke-width="${strokeW}"
        stroke-linejoin="round"
        data-state="${d.state}" 
        data-state-code="${d.stateCode}" 
        data-id="${d.id}" 
        data-party="${d.party}" 
        data-key="${d.key ? 'true' : 'false'}"
        data-cx="${d.cx}"
        data-cy="${d.cy}"
        style="animation-delay: ${animDelay}s;"
      />`;
});

let labelMarkup = '';
compiled.labels.forEach(l => {
  labelMarkup += `
      <text 
        class="state-label" 
        x="${l.x}" 
        y="${l.y}" 
        text-anchor="${l.anchor}"
      >${l.text}</text>`;
});

let lineMarkup = '';
compiled.lines.forEach(l => {
  lineMarkup += `
      <line 
        x1="${l.x1}" y1="${l.y1}" 
        x2="${l.x2}" y2="${l.y2}" 
        class="callout-line" 
      />`;
});

const htmlContent = `<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cámara de Representantes: Resultados por Distrito - Elecciones EE.UU. 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Roboto:wght@400;500;700;900&display=swap"
    rel="stylesheet">
  <style>
    :root {
      --color-dem: #1d70b8;
      --color-dem-hover: #145ea8;
      --color-rep: #d9383a;
      --color-rep-hover: #ba2825;
      --color-yellow: #f3cc4a;
      --color-yellow-hover: #eab308;
      --color-key: #111827;
      --color-vacant: #cbd5e1;
      --color-text-main: #111827;
      --color-text-muted: #555e6d;
      --color-border: #e5e7eb;
      --color-bg: #ffffff;
      --font-base: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      --font-title: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      --font-numbers: 'Merriweather', Georgia, serif;
      --transition-speed: 0.25s;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-base);
      background-color: transparent;
      color: var(--color-text-main);
      display: flex;
      justify-content: center;
      padding: 12px;
      -webkit-font-smoothing: antialiased;
    }

    .widget-container {
      width: 100%;
      max-width: 680px;
      background: var(--color-bg);
      padding: 24px 28px 20px 28px;
      border-radius: 6px;
      position: relative;
    }

    /* Tabs Bar */
    .tabs-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 16px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 10px;
    }

    .tabs-group {
      display: inline-flex;
      background: #f1f5f9;
      padding: 3px;
      border-radius: 8px;
      gap: 3px;
    }

    .tab-btn {
      border: none;
      background: transparent;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 600;
      color: #64748b;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .tab-btn:hover {
      color: #1e293b;
    }

    .tab-btn.active {
      background: #ffffff;
      color: #0f172a;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    /* Header Section */
    .header-section {
      margin-bottom: 18px;
    }

    .title-main {
      font-family: var(--font-title);
      font-size: 23px;
      font-weight: 900;
      letter-spacing: -0.01em;
      color: var(--color-text-main);
      margin-bottom: 5px;
      line-height: 1.25;
    }

    .subtitle-main {
      font-size: 14.5px;
      color: #2b333e;
      font-weight: 400;
      line-height: 1.4;
    }

    .divider {
      height: 1px;
      background-color: var(--color-border);
      margin: 18px 0;
    }

    /* Progress Tracker Section */
    .tracker-section {
      margin-bottom: 22px;
    }

    .majority-badge {
      display: flex;
      justify-content: center;
      margin-bottom: 6px;
    }

    .majority-pill {
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      background: #f1f5f9;
      padding: 3px 10px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .bar-container {
      position: relative;
      width: 100%;
      height: 20px;
      background: #f1f5f9;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.06);
    }

    .bar-segment {
      height: 100%;
      transition: opacity var(--transition-speed) ease, width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
    }

    .bar-segment.seg-dem {
      background-color: var(--color-dem);
      width: 50.57%; /* 220 / 435 */
    }

    .bar-segment.seg-yellow {
      background-color: var(--color-yellow);
      width: 20.23%; /* 88 / 435 */
    }

    .bar-segment.seg-rep {
      background-color: var(--color-rep);
      width: 29.20%; /* 127 / 435 */
    }

    /* Dashed line marking majority (218 / 435 = 50.11%) */
    .majority-marker-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50.11%;
      width: 2px;
      background: #ffffff;
      box-shadow: 0 0 2px rgba(0,0,0,0.35);
      z-index: 5;
    }

    /* Numbers Row below bar */
    .metrics-row {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      padding: 0 4px;
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: opacity var(--transition-speed);
    }

    .metric-item.metric-dem {
      align-items: flex-start;
    }

    .metric-item.metric-yellow {
      align-items: center;
    }

    .metric-item.metric-rep {
      align-items: flex-end;
    }

    .metric-val {
      font-family: var(--font-numbers);
      font-size: 26px;
      font-weight: 700;
      line-height: 1.1;
    }

    .metric-dem .metric-val {
      color: var(--color-dem);
    }

    .metric-yellow .metric-val {
      color: #b48505;
    }

    .metric-rep .metric-val {
      color: var(--color-rep);
    }

    .metric-sub {
      font-size: 12px;
      color: var(--color-text-muted);
      font-weight: 500;
      margin-top: 2px;
    }

    /* Map Subheader */
    .map-header {
      margin-top: 24px;
      margin-bottom: 12px;
    }

    .map-title {
      font-family: var(--font-title);
      font-size: 20px;
      font-weight: 900;
      letter-spacing: -0.01em;
      color: var(--color-text-main);
      margin-bottom: 3px;
    }

    .map-desc {
      font-size: 14px;
      color: #2b333e;
      font-weight: 400;
      line-height: 1.4;
    }

    /* SVG Map Container */
    .map-wrapper {
      position: relative;
      width: 100%;
      margin: 8px 0 16px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .cartogram-svg {
      width: 100%;
      height: auto;
      overflow: visible;
      user-select: none;
    }

    /* Hexagon districts */
    .district-hex {
      cursor: pointer;
      transition: opacity var(--transition-speed) ease, transform 0.16s ease, filter 0.16s ease;
      transform-box: fill-box;
      transform-origin: center center;
    }

    .district-hex.party-dem {
      fill: var(--color-dem);
    }

    .district-hex.party-rep {
      fill: var(--color-rep);
    }

    .district-hex.party-pending {
      fill: var(--color-yellow);
    }

    .district-hex:hover {
      transform: scale(1.32);
      filter: drop-shadow(0 2px 5px rgba(0,0,0,0.28));
      z-index: 10;
    }

    /* Key district border pulse */
    .district-hex.district-key {
      stroke: var(--color-key) !important;
      stroke-width: 2.5px !important;
    }

    /* State labels */
    .state-label {
      font-family: var(--font-base);
      font-size: 10px;
      font-weight: 700;
      fill: #64748b;
      pointer-events: none;
      user-select: none;
    }

    .callout-line {
      stroke: #94a3b8;
      stroke-width: 1.2;
      stroke-dasharray: 3, 3;
      pointer-events: none;
    }

    /* Hover opacity filtering */
    .widget-container.hover-dem .district-hex:not(.party-dem),
    .widget-container.hover-dem .bar-segment:not(.seg-dem),
    .widget-container.hover-dem .metric-item:not(.metric-dem) {
      opacity: 0.18 !important;
    }

    .widget-container.hover-yellow .district-hex:not(.party-pending),
    .widget-container.hover-yellow .bar-segment:not(.seg-yellow),
    .widget-container.hover-yellow .metric-item:not(.metric-yellow) {
      opacity: 0.18 !important;
    }

    .widget-container.hover-rep .district-hex:not(.party-rep),
    .widget-container.hover-rep .bar-segment:not(.seg-rep),
    .widget-container.hover-rep .metric-item:not(.metric-rep) {
      opacity: 0.18 !important;
    }

    .widget-container.hover-key .district-hex:not(.district-key) {
      opacity: 0.18 !important;
    }

    /* Tooltip */
    .tooltip {
      position: absolute;
      background: rgba(15, 23, 42, 0.96);
      color: #ffffff;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12.5px;
      font-weight: 400;
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -100%) scale(0.95);
      transition: opacity 0.15s ease, transform 0.15s ease;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
      z-index: 100;
      white-space: nowrap;
    }

    .tooltip.visible {
      opacity: 1;
      transform: translate(-50%, -125%) scale(1);
    }

    .tooltip-title {
      font-weight: 700;
      font-size: 13px;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .tooltip-status {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      color: #cbd5e1;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
    }

    .tooltip-badge-key {
      display: inline-block;
      margin-top: 4px;
      background: #facc15;
      color: #0f172a;
      font-size: 10.5px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }

    /* Legend Section (matching AFP image) */
    .legend-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 10px;
      padding: 10px 8px;
      background: #f8fafc;
      border-radius: 6px;
    }

    .legend-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      font-weight: 600;
      color: #334155;
      cursor: pointer;
      transition: opacity var(--transition-speed) ease, color var(--transition-speed) ease;
      user-select: none;
    }

    .legend-hex-icon {
      width: 14px;
      height: 16px;
      display: inline-block;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    }

    .legend-icon-dem {
      background-color: var(--color-dem);
    }

    .legend-icon-yellow {
      background-color: var(--color-yellow);
    }

    .legend-icon-rep {
      background-color: var(--color-rep);
    }

    .legend-icon-key {
      background-color: #ffffff;
      box-shadow: inset 0 0 0 2.8px #111827;
    }

    /* Key Districts List View (Tab 2) */
    .key-districts-panel {
      display: none;
      margin-top: 14px;
      padding: 14px;
      background: #f8fafc;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }

    .key-districts-panel.active {
      display: block;
    }

    .key-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 10px;
      margin-top: 10px;
    }

    .key-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 10px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .key-card:hover {
      border-color: #0f172a;
      box-shadow: 0 2px 6px rgba(0,0,0,0.06);
      transform: translateY(-1px);
    }

    .key-card-title {
      font-size: 13px;
      font-weight: 700;
      color: #0f172a;
    }

    .key-card-subtitle {
      font-size: 11.5px;
      color: #64748b;
    }

    .key-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 10px;
    }

    .key-pill.dem { background: #dbeafe; color: #1e40af; }
    .key-pill.rep { background: #fee2e2; color: #991b1b; }
    .key-pill.pending { background: #fef3c7; color: #92400e; }

    /* Footer Section */
    .footer-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 18px;
      padding-top: 12px;
      border-top: 1px solid #f1f5f9;
      flex-wrap: wrap;
      gap: 12px;
    }

    .footer-left {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .update-time {
      font-size: 12px;
      font-style: italic;
      color: #374151;
    }

    .source-info {
      font-size: 11.5px;
      color: #6b7280;
    }

    .footer-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .footer-logo {
      height: 18px;
      width: auto;
      max-width: 140px;
      object-fit: contain;
      display: block;
      opacity: 0.95;
      transition: opacity 0.2s ease;
    }

    .footer-logo:hover {
      opacity: 1;
    }

    /* Animation */
    @keyframes dotPop {
      0% {
        opacity: 0;
        transform: scale(0.2);
      }
      70% {
        transform: scale(1.15);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    .anim-in {
      animation: dotPop 0.4s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
    }

    /* Responsive adjustments */
    @media (max-width: 520px) {
      .widget-container {
        padding: 16px 14px;
      }

      .title-main {
        font-size: 19px;
      }

      .metric-val {
        font-size: 22px;
      }

      .legend-container {
        gap: 10px;
        font-size: 11.5px;
      }

      .footer-section {
        flex-direction: column;
        align-items: flex-start;
      }

      .footer-right {
        align-self: flex-end;
      }
    }
  </style>
</head>

<body>

  <div class="widget-container" id="widgetContainer">
    <!-- Tabs Switcher -->
    <div class="tabs-wrapper">
      <div class="tabs-group" role="tablist">
        <button class="tab-btn active" id="tabGeneral" role="tab" aria-selected="true" onclick="switchTab('general')">Resultados generales</button>
        <button class="tab-btn" id="tabClaves" role="tab" aria-selected="false" onclick="switchTab('claves')">Distritos clave (9)</button>
      </div>
    </div>

    <!-- Header Section -->
    <header class="header-section">
      <h1 class="title-main" id="titleMain">Demócratas ganan la mayoría en la Cámara de Representantes de EEUU</h1>
      <p class="subtitle-main" id="subtitleMain">Resultados parciales, el 4 de noviembre 2026 a las 07H21 GMT</p>
    </header>

    <!-- Top Balance of Power Tracker -->
    <div class="tracker-section">
      <div class="majority-badge">
        <span class="majority-pill">Mayoría: 218</span>
      </div>

      <div class="bar-container" id="barContainer">
        <div class="bar-segment seg-dem" id="barDem" title="Demócratas: 220" data-party="dem"></div>
        <div class="bar-segment seg-yellow" id="barYellow" title="A la espera: 88" data-party="yellow"></div>
        <div class="bar-segment seg-rep" id="barRep" title="Republicanos: 127" data-party="rep"></div>
        <div class="majority-marker-line" title="Línea de mayoría (218 bancas)"></div>
      </div>

      <div class="metrics-row">
        <div class="metric-item metric-dem" data-party="dem">
          <span class="metric-val" id="demCount">220</span>
          <span class="metric-sub">Demócratas</span>
        </div>
        <div class="metric-item metric-yellow" data-party="yellow">
          <span class="metric-val" id="yellowCount">88</span>
          <span class="metric-sub">A la espera</span>
        </div>
        <div class="metric-item metric-rep" data-party="rep">
          <span class="metric-val" id="repCount">127</span>
          <span class="metric-sub">Republicanos</span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <!-- Map Header -->
    <div class="map-header">
      <h2 class="map-title">Por Estado y distrito</h2>
      <p class="map-desc">Los 435 escaños se someten a elección</p>
    </div>

    <!-- SVG Hex Cartogram Map -->
    <div class="map-wrapper" id="mapWrapper">
      <svg class="cartogram-svg" id="cartogramSvg" viewBox="0 0 740 500" role="img"
        aria-label="Mapa cartograma hexagonal de resultados por distrito de la Cámara de Representantes">
        ${lineMarkup}
        ${hexMarkup}
        ${labelMarkup}
      </svg>
      <div class="tooltip" id="tooltip"></div>
    </div>

    <!-- Key Districts Panel (shown in Tab 2) -->
    <div class="key-districts-panel" id="keyPanel">
      <h3 style="font-size:14px;font-weight:700;color:#0f172a;margin-bottom:4px;">9 distritos clave monitoreados por Cook Political Report</h3>
      <p style="font-size:12.5px;color:#64748b;margin-bottom:12px;">Haga clic en cualquiera para ubicarlo en el mapa:</p>
      <div class="key-grid" id="keyGrid"></div>
    </div>

    <!-- Legend matching AFP style -->
    <div class="legend-container" id="legendContainer">
      <div class="legend-item" data-party="dem">
        <span class="legend-hex-icon legend-icon-dem"></span>
        <span>Demócratas</span>
      </div>
      <div class="legend-item" data-party="yellow">
        <span class="legend-hex-icon legend-icon-yellow"></span>
        <span>A la espera de resultados</span>
      </div>
      <div class="legend-item" data-party="rep">
        <span class="legend-hex-icon legend-icon-rep"></span>
        <span>Republicanos</span>
      </div>
      <div class="legend-item" data-party="key">
        <span class="legend-hex-icon legend-icon-key"></span>
        <span>Distritos clave*</span>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="footer-section">
      <div class="footer-left">
        <div class="source-info">Fuentes: Cámara de Representantes de EEUU, medios de EEUU · *Cook Political Report</div>
        <div class="update-time" id="updateTime">Resultados parciales, el 4 de noviembre 2026 a las 07H21 GMT</div>
      </div>
      <div class="footer-right">
        <img src="https://gaceviews.vercel.app/elecciones-eeuu-midterm/logo-lg.png" alt="LA GACETA" class="footer-logo"
          id="footerLogo" onerror="this.src='logo-lg.png';">
      </div>
    </footer>
  </div>

  <script>
    const widget = document.getElementById('widgetContainer');
    const tooltip = document.getElementById('tooltip');
    const mapWrapper = document.getElementById('mapWrapper');
    const keyPanel = document.getElementById('keyPanel');
    const keyGrid = document.getElementById('keyGrid');

    const partyNames = {
      dem: "Demócrata",
      rep: "Republicano",
      pending: "A la espera de resultados"
    };

    const partyColors = {
      dem: "#1d70b8",
      rep: "#d9383a",
      pending: "#f3cc4a"
    };

    // Tooltip logic
    const hexes = document.querySelectorAll('.district-hex');
    hexes.forEach(hex => {
      hex.addEventListener('mouseenter', (e) => {
        const state = hex.getAttribute('data-state');
        const id = hex.getAttribute('data-id');
        const party = hex.getAttribute('data-party');
        const isKey = hex.getAttribute('data-key') === 'true';

        let districtNum = id.split('-')[1];
        if (districtNum === 'AL') districtNum = 'Único (At-large)';
        else districtNum = 'Distrito ' + parseInt(districtNum, 10);

        let html = \`
          <div class="tooltip-title">\${state} · \${districtNum}</div>
          <div class="tooltip-status">
            <span class="status-dot" style="background:\${partyColors[party]}"></span>
            <span>\${partyNames[party]}</span>
          </div>
        \`;

        if (isKey) {
          html += \`<div class="tooltip-badge-key">★ Distrito clave (Cook Political Report)</div>\`;
        }

        tooltip.innerHTML = html;
        tooltip.classList.add('visible');
        positionTooltip(e);
      });

      hex.addEventListener('mousemove', (e) => {
        positionTooltip(e);
      });

      hex.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });

      hex.addEventListener('click', () => {
        hex.style.transform = 'scale(1.45)';
        setTimeout(() => {
          hex.style.transform = '';
        }, 400);
      });
    });

    function positionTooltip(e) {
      const rect = mapWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      tooltip.style.left = x + 'px';
      tooltip.style.top = y + 'px';
    }

    // Interactive Hover Filter
    function setupFilter(elements, filterClass) {
      elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          widget.classList.add(filterClass);
        });
        el.addEventListener('mouseleave', () => {
          widget.classList.remove(filterClass);
        });
      });
    }

    setupFilter(document.querySelectorAll('[data-party="dem"]'), 'hover-dem');
    setupFilter(document.querySelectorAll('[data-party="yellow"]'), 'hover-yellow');
    setupFilter(document.querySelectorAll('[data-party="rep"]'), 'hover-rep');
    setupFilter(document.querySelectorAll('[data-party="key"]'), 'hover-key');

    // Build Key Districts Panel
    const keyHexes = Array.from(document.querySelectorAll('.district-hex[data-key="true"]'));
    keyGrid.innerHTML = '';
    keyHexes.forEach(hex => {
      const id = hex.getAttribute('data-id');
      const state = hex.getAttribute('data-state');
      const party = hex.getAttribute('data-party');

      const card = document.createElement('div');
      card.className = 'key-card';
      card.innerHTML = \`
        <div>
          <div class="key-card-title">\${state} (\${id})</div>
          <div class="key-card-subtitle">\${partyNames[party]}</div>
        </div>
        <span class="key-pill \${party}">\${party.toUpperCase()}</span>
      \`;

      card.addEventListener('mouseenter', () => {
        hex.style.transform = 'scale(1.45)';
        hex.style.filter = 'drop-shadow(0 0 8px rgba(0,0,0,0.4))';
      });

      card.addEventListener('mouseleave', () => {
        hex.style.transform = '';
        hex.style.filter = '';
      });

      card.addEventListener('click', () => {
        switchTab('general');
        hex.scrollIntoView({ behavior: 'smooth', block: 'center' });
        hex.style.transform = 'scale(1.5)';
        setTimeout(() => hex.style.transform = '', 1000);
      });

      keyGrid.appendChild(card);
    });

    // Tab switcher
    window.switchTab = function(mode) {
      const btnGeneral = document.getElementById('tabGeneral');
      const btnClaves = document.getElementById('tabClaves');

      if (mode === 'general') {
        btnGeneral.classList.add('active');
        btnClaves.classList.remove('active');
        keyPanel.classList.remove('active');
        widget.classList.remove('hover-key');
      } else {
        btnClaves.classList.add('active');
        btnGeneral.classList.remove('active');
        keyPanel.classList.add('active');
        widget.classList.add('hover-key');
      }
    };
  </script>
</body>

</html>
`;

fs.writeFileSync('mapa.html', htmlContent);
console.log('mapa.html written successfully! Size:', htmlContent.length);
