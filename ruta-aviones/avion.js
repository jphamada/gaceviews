document.addEventListener('DOMContentLoaded', () => {
  
  // Elementos DOM Globales para la Avioneta Standalone
  const infoWidget = document.getElementById('info-widget');
  const toggleDestNoa = document.getElementById('sim-dest-noa');
  const toggleDestPorts = document.getElementById('sim-dest-ports');
  const weightDisplay = document.getElementById('weight-display');
  const weightGaugeBar = document.getElementById('weight-gauge-bar');
  const cargoExtraPackages = document.getElementById('cargo-extra-packages');
  const cargoDrums = document.getElementById('cargo-drums');
  const simDetailsBox = document.getElementById('sim-details-box');
  const aircraftInfoOverlay = document.getElementById('aircraft-info-overlay');
  const hotspots = document.querySelectorAll('.hotspot-node');

  // Datos dinámicos del simulador de carga
  const simulatorConfigs = {
    "noa": {
      weight: "550 kg",
      percent: "100%",
      color: "var(--color-amber)",
      text: "<strong>Ruta Corta (Destino NOA):</strong> Vuelo directo desde Bolivia al sur de Salta, Tucumán o Santiago del Estero. Al ser menor trayecto, no requiere tanques ni bidones de combustible auxiliares. La cabina se optimiza para llevar la máxima carga útil de cocaína: <strong>550 kg (+150 kg extras libres de combustible)</strong>."
    },
    "ports": {
      weight: "400 kg",
      percent: "72.7%",
      color: "var(--color-red)",
      text: "<strong>Ruta Larga (Destino Central):</strong> Vuelo de largo alcance hasta campos de Santa Fe o Buenos Aires (1.600 km). Obliga a llevar bidones de combustible extra en cabina y un copiloto/asistente para reabastecer en vuelo de forma manual. Este peso muerto resta espacio y peso de carga neta de estupefaciente: <strong>Carga neta 400 kg</strong>."
    }
  };

  // Textos explicativos de los hotspots del fuselaje
  const hotspotTexts = {
    "gear": "<strong>Tren retráctil Centurion:</strong> A diferencia del Cessna 206, las ruedas se guardan en el fuselaje tras despegar. Reduce el rozamiento aerodinámico un 15%, aumentando velocidad y autonomía para escapar rápido de patrullas.",
    "range": "<strong>1.600 km de autonomía:</strong> El tanque alar maximizado permite al avión narco cruzar desde Bolivia a las provincias del litoral argentino, realizar bombardeos y volver a su pista de despegue inicial sin necesidad de aterrizar.",
    "runway": "<strong>Aterrizaje corto (STOL - 400m):</strong> Modificación extrema en las alas y flaps. Permite al Cessna 210 aterrizar y despegar a plena carga en caminos rurales precarios, huellas de tierra, ripio consolidado o rutas secundarias desiertas."
  };

  // Configuración de destino inicial
  infoWidget.setAttribute('data-active-dest', 'noa');
  simDetailsBox.innerHTML = simulatorConfigs["noa"].text;

  // Toggle Destino NOA (Corto Alcance)
  toggleDestNoa.addEventListener('click', () => {
    toggleDestNoa.classList.add('active');
    toggleDestPorts.classList.remove('active');
    infoWidget.setAttribute('data-active-dest', 'noa');

    // Cambios visuales dinámicos
    weightDisplay.innerText = simulatorConfigs["noa"].weight;
    weightDisplay.style.color = simulatorConfigs["noa"].color;
    weightGaugeBar.style.width = simulatorConfigs["noa"].percent;
    weightGaugeBar.style.backgroundColor = simulatorConfigs["noa"].color;
    simDetailsBox.innerHTML = simulatorConfigs["noa"].text;

    // Elementos del SVG Cessna
    if (cargoExtraPackages) cargoExtraPackages.classList.remove('hidden');
    if (cargoDrums) cargoDrums.classList.add('hidden');
  });

  // Toggle Destino Central/Puertos (Largo Alcance)
  toggleDestPorts.addEventListener('click', () => {
    toggleDestPorts.classList.add('active');
    toggleDestNoa.classList.remove('active');
    infoWidget.setAttribute('data-active-dest', 'ports');

    // Cambios visuales dinámicos
    weightDisplay.innerText = simulatorConfigs["ports"].weight;
    weightDisplay.style.color = simulatorConfigs["ports"].color;
    weightGaugeBar.style.width = simulatorConfigs["ports"].percent;
    weightGaugeBar.style.backgroundColor = simulatorConfigs["ports"].color;
    simDetailsBox.innerHTML = simulatorConfigs["ports"].text;

    // Elementos del SVG Cessna (Esconde extra, muestra bidones)
    if (cargoExtraPackages) cargoExtraPackages.classList.add('hidden');
    if (cargoDrums) cargoDrums.classList.remove('hidden');
  });

  // Interacción con los hotspots en el SVG de la avioneta
  hotspots.forEach(spot => {
    const triggerEvent = (e) => {
      e.stopPropagation();
      
      // Remover clase activo de otros hotspots
      hotspots.forEach(s => s.classList.remove('active'));
      spot.classList.add('active');

      const spotType = spot.dataset.spot;
      if (hotspotTexts[spotType]) {
        aircraftInfoOverlay.innerHTML = hotspotTexts[spotType];
        aircraftInfoOverlay.style.borderColor = "var(--color-cyan)";
      }
    };

    spot.addEventListener('mouseenter', triggerEvent);
    spot.addEventListener('click', triggerEvent);

    spot.addEventListener('mouseleave', () => {
      spot.classList.remove('active');
      aircraftInfoOverlay.innerHTML = `Pasa el cursor (o presiona) las zonas destacadas (<span class="pulse-spot-inline"></span>) de la aeronave para ver sus ventajas tácticas.`;
      aircraftInfoOverlay.style.borderColor = "var(--color-border)";
    });
  });

});
