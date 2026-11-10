# Gráficos Interactivos: Elecciones EE.UU. (Cámara, Senado y Mapa de Distritos)

Recreación interactiva y responsive de los gráficos parlamentarios y cartográficos para las elecciones de medio término de los Estados Unidos:
1. **Cámara de Representantes** (`camara.html`): 435 escaños en 11 filas concéntricas.
2. **Senado** (`senado.html`): 100 escaños en 6 filas concéntricas (35 escaños en juego).
3. **Mapa Interactivo por Distritos** (`mapa.html`): Cartograma hexagonal de los 435 distritos electorales por estado, con tracker de mayoría, resultados por partido y distritos clave de *Cook Political Report*.

---

## 📁 Archivos del proyecto

- **`mapa.html`**: Mapa cartograma hexagonal interactivo con los resultados por distrito de la Cámara de Representantes.
- **`camara.html`**: Gráfico interactivo de la Cámara de Representantes (hemiciclo parlamentario).
- **`senado.html`**: Gráfico interactivo del Senado de los Estados Unidos (hemiciclo parlamentario).
- **`distritos_compiled.json`**: Datos geométricos y de resultados de los 435 distritos electorales.
- **`datos.json`**: Archivo de configuración central donde se actualizan los datos de ambas cámaras (escaños en juego, demócratas, republicanos, fecha y hora de actualización, etc.).
- **`logo-lg.png`**: Logo de **LA GACETA** visible en el pie de los gráficos.
- **`ejemplo_embed.html`**: Página de demostración que permite alternar y probar el embebido de los gráficos mediante `<iframe>`.
- **`index.html`**: Archivo de la Cámara de Representantes con las modificaciones personalizadas.

---

## ✨ Características del Mapa por Distritos (`mapa.html`)

1. **Cartograma hexagonal completo**:
   - 435 hexágonos geométricos que representan cada uno de los distritos congresionales de los 50 estados.
   - Posiciones geográficas relativas de cada estado con etiquetas de abreviatura postal (`WA`, `CA`, `TX`, `NY`, etc.).
   - Líneas punteadas de llamada para Alaska (`AK`) y Hawái (`HI`).
2. **Resultados electorales y tracker de mayoría**:
   - Barra superior con línea divisoria de **Mayoría en 218 bancas**.
   - Conteo en tiempo real: **220 Demócratas**, **88 A la espera de resultados**, **127 Republicanos**.
3. **Distritos clave (*Cook Political Report*)**:
   - Resaltados con borde negro grueso los 9 distritos clave más competitivos.
   - Pestaña interactiva para explorar y ubicar directamente los 9 distritos clave.
4. **Interactividad avanzada**:
   - Tooltips enriquecidos al pasar el cursor sobre cualquier hexágono (Estado, número de distrito, partido y etiqueta de distrito clave).
   - Efecto hover que atenúa a los demás partidos al pasar el mouse por la leyenda o las métricas.
   - Animación de entrada fluida y diseño adaptado a móviles y pantallas de escritorio.
5. **Estilo visual unificado**:
   - Mismo sistema de fuentes tipográficas (*Roboto* y *Merriweather*), paleta cromática, espaciados y logo de **LA GACETA**.

---

## 💻 Códigos para embeber en CMS o notas

### Para el Mapa por Distritos:
```html
<iframe 
  src="mapa.html" 
  width="100%" 
  height="720" 
  frameborder="0" 
  scrolling="no" 
  style="max-width: 720px; width: 100%; border: none;"
  title="Mapa Interactivo de Distritos - Elecciones EE.UU.">
</iframe>
```

### Para la Cámara de Representantes (Hemiciclo):
```html
<iframe 
  src="camara.html" 
  width="100%" 
  height="680" 
  frameborder="0" 
  scrolling="no" 
  style="max-width: 680px; width: 100%; border: none;"
  title="Cámara de Representantes - Elecciones EE.UU.">
</iframe>
```

### Para el Senado:
```html
<iframe 
  src="senado.html" 
  width="100%" 
  height="680" 
  frameborder="0" 
  scrolling="no" 
  style="max-width: 680px; width: 100%; border: none;"
  title="Senado en Cifras - Elecciones EE.UU.">
</iframe>
```
