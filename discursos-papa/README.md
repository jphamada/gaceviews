# Corpus Interactivo de Discursos de León XIV en Argentina
### Especial Hemerográfico & Documental | LA GACETA

Single Page Application (SPA) interactiva, responsiva y de alto rendimiento diseñada para la exploración, lectura y consulta temática del corpus cerrado de 8 discursos pontificios pronunciados por el Papa León XIV durante su visita a la República Argentina.

Diseñado estrictamente bajo las pautas del sistema de diseño **Crónica & Edición Solemne** (`diseno.md`) para ser incrustado mediante `<iframe>` en notas periodísticas de [LA GACETA](https://www.lagaceta.com.ar).

---

## 🏛️ Características Principales

1. **Identidad Visual Solemne de Gran Prensa:**
   - Tipografía editorial jerárquica con **Libre Caslon Text** para titulares, cabezales y citas; y **Manrope** para cuerpo, navegación y micro-copia.
   - Estricto **radio cero (`roundedness: 0`)**: todos los botones, tarjetas, modales, etiquetas y campos mantienen esquinas vivas a 90°.
   - Doble pleca editorial clásica (filete de 1px sobre pleca sólida de 3px).
   - Paleta de color canónica: Oro Ocre institucional (`#96723B` / `#775622`), Azul Celeste heráldico (`#75AADB` / `#28628F`), Verde Menta vibrante (`#5AE386`), Negro Carbón cálido (`#1F1D1A`) y fondos en alabastro y papel periódico (`#FAF7F2` / `#FFF8F3`).

2. **Motor de Búsqueda Difusa en Cliente (MiniSearch):**
   - Búsqueda en memoria ultrarrápida que indexa tanto el corpus completo como cada párrafo individual.
   - Resaltado dinámico de términos coincidentes con indicación de § Párrafo y botón de salto directo al texto.
   - Filtros cruzados por sede geográfica (Buenos Aires, San Miguel de Tucumán, Córdoba, Rosario, Mendoza, Viedma/Patagonia) y ejes temáticos.

3. **Experiencia de Lectura Editorial Especializada:**
   - Retícula broadsheet asimétrica (8 columnas para lectura principal + 4 columnas para contexto y preguntas frecuentes).
   - **Preguntas Clave Interactivas:** Al pulsar sobre una pregunta frecuente, la app se desplaza suavemente al párrafo correspondiente y lo resalta.
   - **Reproductor de Registro Sonoro:** Banner rectilíneo en fondo ocre (`#96723B`) con controles de reproducción histórica, scrubber de tiempo y velocidad (1.0x, 1.25x, 1.5x).
   - Herramientas de citación periodística: botón para copiar la cita canónica con formato bibliográfico y copia por párrafo individual.
   - Selector de tamaño tipográfico (A, A+, A++) y estilos listos para impresión en papel (`@media print`).

4. **Concordancias Temáticas & Cronología:**
   - Módulo de preguntas transversales que congrega extractos doctrinales sobre Tucumán y el Federalismo, Trabajo y Salario Justo, Paz y Reconciliación, Ecología y Pueblos Originarios.
   - Línea de tiempo cronológica del itinerario pontificio día a día.

5. **Integración con Iframe (Iframe-Resizer & postMessage):**
   - Observador dinámico de altura (`ResizeObserver` + `MutationObserver`) que emite mensajes continuos a la ventana anfitriona para evitar barras de desplazamiento dobles:
     - `window.parent.postMessage({ type: 'gaceta-embed-resize', height: ... }, '*')`
     - Soporte para protocolo `[iFrameSizer]`.

---

## 📰 Código para Incrustar en LA GACETA

Para incrustar este especial interactivo en cualquier artículo del CMS de LA GACETA, copie y pegue el siguiente fragmento HTML:

```html
<!-- INICIO ESPECIAL DISCURSOS LEÓN XIV - LA GACETA -->
<div class="gaceta-especial-embed" style="width: 100%; max-width: 1280px; margin: 1.5rem auto;">
  <iframe
    id="gaceta-discursos-papa-frame"
    src="https://especiales.lagaceta.com.ar/discursos-papa/"
    width="100%"
    style="border: none; width: 100%; min-height: 850px; overflow: hidden;"
    scrolling="no"
    loading="lazy"
    title="Discursos del Papa León XIV en Argentina - Archivo Histórico LA GACETA"
  ></iframe>
  <script>
    (function() {
      window.addEventListener('message', function(event) {
        if (event.data && (event.data.type === 'gaceta-embed-resize' || event.data.frameHeight)) {
          var frame = document.getElementById('gaceta-discursos-papa-frame');
          var newHeight = event.data.height || event.data.frameHeight;
          if (frame && newHeight) {
            frame.style.height = newHeight + 'px';
          }
        }
      });
    })();
  </script>
</div>
<!-- FIN ESPECIAL DISCURSOS LEÓN XIV -->
```

---

## 🛠️ Tecnologías y Estructura

- **Framework:** React 18 + TypeScript + Vite
- **Estilos:** Tailwind CSS 3 (configurado con variables y tokens de `diseno.md`)
- **Búsqueda:** MiniSearch (búsqueda difusa en memoria, tolerante a prefijos y acentos)
- **Iconografía:** Lucide React (geometría limpia y sobria)
- **Datos:** `public/data/discursos.json` (8 discursos completos tipados con preguntas frecuentes y párrafos indexados)

### Estructura de Archivos
```
discursos-papa/
├── public/
│   └── data/
│       └── discursos.json          # Base de datos histórica (8 discursos completos)
├── src/
│   ├── components/
│   │   ├── DiscursoCard.tsx         # Tarjeta de discurso con extractos de búsqueda
│   │   ├── DiscursoReader.tsx       # Lector broadsheet con reproductor y preguntas
│   │   ├── EditorialFooter.tsx     # Pie de imprenta hemerográfico
│   │   ├── EditorialHeader.tsx     # Cabecera periodística y selector de vistas
│   │   ├── EditorialSearchBar.tsx  # Barra de búsqueda difusa y filtros por ciudad
│   │   ├── EmbedInfoModal.tsx      # Modal con código de incrustación para editores
│   │   ├── ThematicQuestionsView.tsx # Consulta transversal de preguntas clave
│   │   └── TimelineView.tsx        # Itinerario cronológico de la visita
│   ├── types/
│   │   └── discurso.ts             # Tipos TypeScript para el corpus
│   ├── utils/
│   │   ├── iframeBridge.ts         # Script emisor de altura dinámica (postMessage)
│   │   └── searchEngine.ts         # Motor de indexación y búsqueda MiniSearch
│   ├── App.tsx                     # Orquestador del estado y vistas
│   ├── index.css                   # Estilos globales y reglas de diseno.md
│   └── main.tsx                    # Punto de entrada React
├── diseno.md                       # Especificación de diseño "Crónica & Edición Solemne"
├── tailwind.config.js              # Configuración de tokens y cero redondez
├── vite.config.ts                  # Configuración de empaquetado (base relativa)
└── package.json
```

---

## 🚀 Comandos de Desarrollo

- **Instalar dependencias:** `npm install`
- **Servidor de desarrollo:** `npm run dev`
- **Compilación de producción:** `npm run build` (genera los activos listos en la carpeta `dist/`)
- **Previsualizar compilación:** `npm run preview`
