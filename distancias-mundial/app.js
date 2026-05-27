/* 
  =========================================
  LÓGICA DEL WIDGET - ESTILO MINIMALISTA
  Controlador dinámico e interacción
  =========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const chartRowsContainer = document.getElementById("chart-rows");
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search");
  const noResultsEl = document.getElementById("no-results");
  
  // Botones de Ordenamiento
  const sortDescBtn = document.getElementById("sort-desc");
  const sortAscBtn = document.getElementById("sort-asc");
  const sortAlphaBtn = document.getElementById("sort-alpha");
  
  // KPIs
  const maxTravelerName = document.getElementById("max-traveler-name");
  const maxTravelerValue = document.getElementById("max-traveler-value");
  const minTravelerName = document.getElementById("min-traveler-name");
  const minTravelerValue = document.getElementById("min-traveler-value");
  const avgTravelValue = document.getElementById("avg-travel-value");
  const totalTravelValue = document.getElementById("total-travel-value");

  // Estado de la aplicación
  let currentData = [...window.worldCupData];
  let searchQuery = "";

  // 1. Inicializar Estadísticas Globales (KPIs)
  function initKPIs() {
    const rawData = window.worldCupData;
    
    // Total de km recorridos
    const totalKm = rawData.reduce((sum, item) => sum + item.totalDistance, 0);
    
    // Promedio por selección
    const avgKm = Math.round(totalKm / rawData.length);
    
    // Más viajero
    const sortedByDistance = [...rawData].sort((a, b) => b.totalDistance - a.totalDistance);
    const maxTeam = sortedByDistance[0];
    const minTeam = sortedByDistance[sortedByDistance.length - 1];

    // Formatear número con punto decimal en español (ej: 236164 -> 236.164)
    const formatNumber = (num) => new Intl.NumberFormat('de-DE').format(num);

    maxTravelerName.textContent = maxTeam.country;
    maxTravelerValue.textContent = `${formatNumber(maxTeam.totalDistance)} km`;
    
    minTravelerName.textContent = minTeam.country;
    minTravelerValue.textContent = `${formatNumber(minTeam.totalDistance)} km`;
    
    avgTravelValue.textContent = `${formatNumber(avgKm)} km`;
    totalTravelValue.textContent = `${formatNumber(totalKm)} km`;
  }

  // 2. Formatear números
  const formatKm = (num) => new Intl.NumberFormat('de-DE').format(num);

  // 3. Determinar color sólido minimalista según la distancia
  function getColorStyle(distance) {
    if (distance > 7000) {
      return "var(--color-high)";
    } else if (distance >= 3500) {
      return "var(--color-med)";
    } else {
      return "var(--color-low)";
    }
  }

  // 4. Renderizar el Gráfico
  function renderChart() {
    // Limpiar contenedor
    chartRowsContainer.innerHTML = "";

    // Filtrar datos según búsqueda
    let filteredData = currentData.filter(item => {
      const nameMatch = item.country.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Buscar también por nombres de ciudades sede
      const cityMatch = item.trips.some(trip => 
        trip.from.toLowerCase().includes(searchQuery.toLowerCase()) || 
        trip.to.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return nameMatch || cityMatch;
    });

    // Validar si hay resultados
    if (filteredData.length === 0) {
      noResultsEl.classList.remove("hidden");
      return;
    } else {
      noResultsEl.classList.add("hidden");
    }

    // Distancia máxima de referencia (Curazao: 9.870) para porcentaje de barra
    const maxRefDistance = 9870;

    // Crear y añadir filas
    filteredData.forEach((item) => {
      // Calcular porcentaje de barra
      const barPercentage = Math.min((item.totalDistance / maxRefDistance) * 100, 100);
      const barColor = getColorStyle(item.totalDistance);

      // Crear contenedor de fila
      const rowWrapper = document.createElement("div");
      rowWrapper.className = "chart-row-wrapper";
      rowWrapper.setAttribute("data-country", item.country);

      // Generar HTML de desgloses de viajes
      const tripsHTML = item.trips.map((trip, idx) => {
        const isZero = trip.distance === 0;
        const distBadge = isZero 
          ? `<span class="flight-distance zero">Sede Local</span>`
          : `<span class="flight-distance">${formatKm(trip.distance)} km</span>`;

        return `
          <div class="itinerary-item">
            <div class="flight-route">
              <span class="city-pill base">${trip.from}</span>
              <span class="flight-arrow">➔</span>
              <span class="city-pill">${trip.to}</span>
            </div>
            ${distBadge}
          </div>
        `;
      }).join("");

      // Obtener URL de bandera (FlagCDN)
      const flagUrl = `https://flagcdn.com/w40/${item.flagCode.toLowerCase()}.png`;

      rowWrapper.innerHTML = `
        <div class="chart-row-header">
          <div class="row-rank">${item.rank}°</div>
          <div class="row-country-box">
            <img class="country-flag" src="${flagUrl}" alt="Bandera de ${item.country}" onerror="this.src='https://flagcdn.com/w40/un.png'">
            <span class="country-name">${item.country}</span>
          </div>
          <div class="row-bar-container">
            <div class="bar-track">
              <div class="bar-fill" style="width: 0%; background-color: ${barColor};"></div>
            </div>
          </div>
          <div class="row-distance">${formatKm(item.totalDistance)}<span>km</span></div>
        </div>
        <div class="trip-details-panel">
          <div class="trip-details-content">
            <div class="trip-details-title">Itinerario de traslados (fase de grupos)</div>
            <div class="itinerary-list">
              ${tripsHTML}
            </div>
          </div>
        </div>
      `;

      // Evento para colapsar/desplegar detalles (Acordeón)
      const rowHeader = rowWrapper.querySelector(".chart-row-header");
      rowHeader.addEventListener("click", () => {
        const isCurrentlyExpanded = rowWrapper.classList.contains("expanded");
        
        // Cerrar todos los demás primero para mantener limpio el listado
        document.querySelectorAll(".chart-row-wrapper").forEach((el) => {
          el.classList.remove("expanded");
        });

        // Si no estaba expandido, lo abrimos
        if (!isCurrentlyExpanded) {
          rowWrapper.classList.add("expanded");
          
          // Centrar suavemente en pantalla
          setTimeout(() => {
            rowWrapper.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }, 250);
        }
      });

      chartRowsContainer.appendChild(rowWrapper);

      // Activar animación de llenado de la barra tras añadir al DOM
      requestAnimationFrame(() => {
        setTimeout(() => {
          const fillBar = rowWrapper.querySelector(".bar-fill");
          if (fillBar) fillBar.style.width = `${barPercentage}%`;
        }, 50);
      });
    });
  }

  // 5. Función de búsqueda
  function handleSearch(e) {
    searchQuery = e.target.value;
    
    // Mostrar/ocultar botón de borrar
    if (searchQuery.length > 0) {
      clearSearchBtn.style.display = "flex";
    } else {
      clearSearchBtn.style.display = "none";
    }
    
    renderChart();
  }

  // Borrar texto de búsqueda
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    clearSearchBtn.style.display = "none";
    searchInput.focus();
    renderChart();
  });

  searchInput.addEventListener("input", handleSearch);

  // 6. Funciones de Ordenamiento
  function updateSortActiveButton(activeBtn) {
    [sortDescBtn, sortAscBtn, sortAlphaBtn].forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
  }

  sortDescBtn.addEventListener("click", () => {
    updateSortActiveButton(sortDescBtn);
    currentData.sort((a, b) => b.totalDistance - a.totalDistance);
    renderChart();
  });

  sortAscBtn.addEventListener("click", () => {
    updateSortActiveButton(sortAscBtn);
    currentData.sort((a, b) => a.totalDistance - b.totalDistance);
    renderChart();
  });

  sortAlphaBtn.addEventListener("click", () => {
    updateSortActiveButton(sortAlphaBtn);
    currentData.sort((a, b) => a.country.localeCompare(b.country, 'es', { sensitivity: 'base' }));
    renderChart();
  });

  // 7. Inicialización de la Aplicación
  initKPIs();
  renderChart();
});
