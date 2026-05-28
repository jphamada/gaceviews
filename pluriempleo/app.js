/* ==========================================================================
   JAVASCRIPT PRINCIPAL - INFOGRAFÍA INTERACTIVA (CRISIS DEL EMPLEO)
   Manejo de navegación, animaciones de datos, toggles e incrustación.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- ELEMENTOS DE NAVEGACIÓN ---
  const navSteps = document.querySelectorAll(".nav-step");
  const slides = document.querySelectorAll(".info-slide");

  // --- VARIABLES DE ANIMACIÓN ---
  let animatedSlides = new Set(); // Registra qué diapositivas ya se animaron

  // ==========================================================================
  // 1. SISTEMA DE NAVEGACIÓN ENTRE DIAPOSITIVAS
  // ==========================================================================
  
  function goToSlide(slideIndex) {
    // 1. Desactivar todos los pasos de navegación y diapositivas
    navSteps.forEach(btn => btn.classList.remove("active"));
    slides.forEach(slide => {
      slide.classList.remove("active");
      slide.setAttribute("aria-hidden", "true");
    });

    // 2. Activar la diapositiva y el paso correspondiente
    const activeStep = document.getElementById(`step-${slideIndex}`);
    const activeSlide = slides[slideIndex];

    if (activeStep && activeSlide) {
      activeStep.classList.add("active");
      activeSlide.classList.add("active");
      activeSlide.setAttribute("aria-hidden", "false");

      // 3. Disparar animaciones específicas de la diapositiva seleccionada
      triggerSlideAnimations(slideIndex);
    }
  }

  // Asignar eventos de click a los pasos de navegación
  navSteps.forEach((stepBtn, index) => {
    stepBtn.addEventListener("click", () => goToSlide(index));
  });

  // ==========================================================================
  // 2. DISPARADOR DE ANIMACIONES DENTRO DE DIAPOSITIVAS
  // ==========================================================================

  function triggerSlideAnimations(index) {
    // Diapositiva 1: Radiografía del Bolsillo
    if (index === 0) {
      animatePocketNumbers();
    }
    // Diapositiva 2: Costo de Vida
    else if (index === 1) {
      animateExpenseBars();
    }
    // Diapositiva 3: El Pluriempleo
    else if (index === 2) {
      // Si está activa la vista nacional, animar su historial
      const nacionView = document.getElementById("data-nacion");
      if (nacionView && nacionView.classList.contains("active")) {
        animateNationalHistoryLines();
      }
    }
    // Diapositiva 4: Perfil del Pluriempleado
    else if (index === 3) {
      // Activar por defecto el gráfico de la pestaña que esté seleccionada
      const activeTabId = document.querySelector(".profile-tab.active").id;
      triggerProfileTabAnimation(activeTabId);
    }
  }

  // ==========================================================================
  // ANIMACIONES ESPECÍFICAS: DIAPOSITIVA 1 (INGRESOS)
  // ==========================================================================

  function animatePocketNumbers() {
    if (animatedSlides.has("pocket")) return; // Evitar re-animar innecesariamente
    animatedSlides.add("pocket");

    const numbersToAnimate = document.querySelectorAll("#slide-pocket .stat-number");
    
    numbersToAnimate.forEach(numElement => {
      const targetVal = parseInt(numElement.getAttribute("data-target"), 10);
      animateCountUp(numElement, 0, targetVal, 1200, "%");
    });
  }

  // Función genérica de conteo ascendente
  function animateCountUp(element, start, end, duration, suffix = "") {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing cúbico hacia afuera para un movimiento más natural y premium
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * (end - start) + start);
      
      element.textContent = `${currentVal}${suffix}`;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = `${end}${suffix}`;
      }
    };
    window.requestAnimationFrame(step);
  }

  // ==========================================================================
  // ANIMACIONES ESPECÍFICAS: DIAPOSITIVA 2 (COSTO DE VIDA)
  // ==========================================================================

  function animateExpenseBars() {
    const bars = document.querySelectorAll("#slide-expenses .progress-bar-fill");
    
    // Asignar el ancho real a cada barra para activar la transición CSS
    setTimeout(() => {
      bars[0].style.width = "44%"; // Alquiler
      bars[1].style.width = "27%"; // Alimentación
      bars[2].style.width = "16%"; // Pago de deudas
      bars[3].style.width = "13%"; // Otros gastos
    }, 100);

    // Agregar interactividad extra por teclado para accesibilidad
    const rows = document.querySelectorAll("#slide-expenses .expense-row");
    rows.forEach(row => {
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          rows.forEach(r => r.classList.remove("active"));
          row.classList.add("active");
        }
      });
    });
  }

  // ==========================================================================
  // ANIMACIONES ESPECÍFICAS: DIAPOSITIVA 3 (PLURIEMPLEO TOGGLES)
  // ==========================================================================

  const btnTucuman = document.getElementById("toggle-tucuman");
  const btnNacion = document.getElementById("toggle-nacion");
  const dataTucuman = document.getElementById("data-tucuman");
  const dataNacion = document.getElementById("data-nacion");

  btnTucuman.addEventListener("click", () => {
    btnNacion.classList.remove("active");
    btnTucuman.classList.add("active");
    
    dataNacion.classList.remove("active");
    dataTucuman.classList.add("active");
  });

  btnNacion.addEventListener("click", () => {
    btnTucuman.classList.remove("active");
    btnNacion.classList.add("active");
    
    dataTucuman.classList.remove("active");
    dataNacion.classList.add("active");
    
    // Animar las barras de comparación histórica al activar la vista
    animateNationalHistoryLines();
  });

  function animateNationalHistoryLines() {
    const lines = document.querySelectorAll(".history-line-fill");
    setTimeout(() => {
      if (lines[0]) lines[0].style.width = "72%"; // 8.8%
      if (lines[1]) lines[1].style.width = "100%"; // 12.2%
    }, 50);
  }

  // ==========================================================================
  // ANIMACIONES ESPECÍFICAS: DIAPOSITIVA 4 (PERFIL TABS INTERNAS)
  // ==========================================================================

  const profileTabs = document.querySelectorAll(".profile-tab");
  const profilePanels = document.querySelectorAll(".profile-panel");

  profileTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // 1. Desactivar pestañas y paneles
      profileTabs.forEach(t => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      profilePanels.forEach(p => p.classList.remove("active"));

      // 2. Activar la pestaña cliqueada y su respectivo panel
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      
      const targetPanelId = tab.getAttribute("aria-controls");
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add("active");
        triggerProfileTabAnimation(tab.id);
      }
    });
  });

  function triggerProfileTabAnimation(tabId) {
    if (tabId === "tab-gender") {
      const bars = document.querySelectorAll(".gender-bar");
      setTimeout(() => {
        if (bars[0]) bars[0].style.width = "100%"; // Mujeres (15.5%)
        if (bars[1]) bars[1].style.width = "61%";  // Varones (9.5% -> 9.5 / 15.5 = 61%)
      }, 50);
    } 
    else if (tabId === "tab-age") {
      const bars = document.querySelectorAll(".age-bar-fill");
      setTimeout(() => {
        if (bars[0]) bars[0].style.width = "100%"; // 45-65 años (14.6%)
        if (bars[1]) bars[1].style.width = "92%";  // 30-44 años (13.4% -> 13.4 / 14.6 = 92%)
        if (bars[2]) bars[2].style.width = "50%";  // 14-29 años (7.3% -> 7.3 / 14.6 = 50%)
      }, 50);
    }
  }

  // ==========================================================================
  // 3. CONTROL DEL MODAL DE CÓDIGO EMBED
  // ==========================================================================

  const btnEmbed = document.getElementById("btn-embed");
  const embedModal = document.getElementById("embed-modal");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnCopyCode = document.getElementById("btn-copy-code");
  const embedCodeTextarea = document.getElementById("embed-code-textarea");
  const copySuccess = document.getElementById("copy-success-message");

  // Generar código dinámico basado en la URL actual de despliegue
  function generateEmbedCode() {
    const currentUrl = window.location.href;
    // Código de iframe limpio y altamente responsivo para periodistas
    return `<iframe src="${currentUrl}" width="100%" height="600" style="border:none; aspect-ratio:4/3; max-width:900px; width:100%; border-radius:16px; box-shadow:0 8px 30px rgba(0,0,0,0.06);" title="Infografía Interactiva: Crisis del Empleo"></iframe>`;
  }

  btnEmbed.addEventListener("click", () => {
    embedCodeTextarea.value = generateEmbedCode();
    embedModal.classList.add("active");
    embedModal.setAttribute("aria-hidden", "false");
  });

  function closeModal() {
    embedModal.classList.remove("active");
    embedModal.setAttribute("aria-hidden", "true");
    copySuccess.classList.remove("show");
  }

  btnCloseModal.addEventListener("click", closeModal);

  // Cerrar modal al hacer click fuera del contenido
  embedModal.addEventListener("click", (e) => {
    if (e.target === embedModal) {
      closeModal();
    }
  });

  // Copiar código al portapapeles
  btnCopyCode.addEventListener("click", () => {
    embedCodeTextarea.select();
    embedCodeTextarea.setSelectionRange(0, 99999); // Para móviles

    try {
      navigator.clipboard.writeText(embedCodeTextarea.value)
        .then(() => showCopySuccess())
        .catch(() => fallbackCopyText());
    } catch (err) {
      fallbackCopyText();
    }
  });

  function fallbackCopyText() {
    // Método fallback tradicional
    document.execCommand("copy");
    showCopySuccess();
  }

  function showCopySuccess() {
    copySuccess.classList.add("show");
    
    // Cambiar estado visual del botón
    const originalText = btnCopyCode.textContent;
    btnCopyCode.textContent = "¡Copiado!";
    btnCopyCode.style.backgroundColor = "#27AE60";
    
    setTimeout(() => {
      btnCopyCode.textContent = originalText;
      btnCopyCode.style.backgroundColor = "var(--color-primary)";
    }, 2000);
  }

  // ==========================================================================
  // 4. INICIALIZACIÓN
  // ==========================================================================
  // Iniciar en la diapositiva 1
  goToSlide(0);

  // Agregar soporte para navegación por teclado (Flechas izq/der)
  document.addEventListener("keydown", (e) => {
    // Si el modal está activo, no interceptar teclas excepto Esc para cerrar
    if (embedModal.classList.contains("active")) {
      if (e.key === "Escape") closeModal();
      return;
    }

    let activeIndex = -1;
    navSteps.forEach((btn, i) => {
      if (btn.classList.contains("active")) activeIndex = i;
    });

    if (e.key === "ArrowRight") {
      if (activeIndex < navSteps.length - 1) {
        goToSlide(activeIndex + 1);
      }
    } else if (e.key === "ArrowLeft") {
      if (activeIndex > 0) {
        goToSlide(activeIndex - 1);
      }
    }
  });

});
