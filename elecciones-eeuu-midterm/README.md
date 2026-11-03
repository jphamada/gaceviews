# Gráficos Interactivos: Elecciones EE.UU. (Cámara y Senado)

Recreación interactiva y responsive de los gráficos parlamentarios para las elecciones de medio término de los Estados Unidos:
1. **Cámara de Representantes** (`camara.html`): 435 escaños en 11 filas concéntricas.
2. **Senado** (`senado.html`): 100 escaños en 6 filas concéntricas (35 escaños en juego).

---

## 📁 Archivos del proyecto

- **`camara.html`**: Gráfico interactivo de la Cámara de Representantes.
- **`senado.html`**: Gráfico interactivo del Senado de los Estados Unidos.
- **`datos.json`**: Archivo de configuración central donde se actualizan los datos de ambas cámaras (escaños en juego, demócratas, republicanos, fecha y hora de actualización, etc.).
- **`logo-lg.png`**: Logo de **LA GACETA** visible en el pie de ambos gráficos.
- **`ejemplo_embed.html`**: Página de demostración que permite alternar y probar el embebido de ambos gráficos mediante `<iframe>`.
- **`index.html`**: Archivo de la Cámara de Representantes con las modificaciones personalizadas.

---

## ✨ Características en ambos gráficos

1. **Geometría adaptada**:
   - **Cámara**: 435 bancas organizadas en 11 arcos concéntricos con escaños de radio 4.3px. Mayoría en 218.
   - **Senado**: 100 bancas organizadas en 6 arcos concéntricos con escaños destacados de radio 8.5px. Mayoría en 51.
2. **Animación inicial**:
   - Efecto en cascada (*stagger*) para la aparición de cada banca.
   - Conteo progresivo suave de números (0 al valor objetivo).
   - Animación de la barra inferior.
3. **Efecto de transparencia al pasar el mouse (hover)**:
   - Al posar el mouse sobre los Demócratas, los Republicanos pasan a transparencia (`opacity: 0.18`).
   - Al posar el mouse sobre los Republicanos, los Demócratas pasan a transparencia (`opacity: 0.18`).
   - Tooltips interactivos con el nombre del partido y número de bancas.
4. **Pestañas**:
   - Pestaña **"Composición actual"**.
   - Pestaña **"Antes de las elecciones"**, para comparar el estado previo de las cámaras con transición fluida.
5. **Logo integrado**:
   - Logo `logo-lg.png` en el pie de página a la derecha.

---

## 🛠️ Cómo actualizar los datos en `datos.json`

El archivo `datos.json` está dividido en dos secciones principales: `"camara"` y `"senado"`, cada una con su pestaña `"actual"` y `"previa"`:

```json
{
  "camara": {
    "actual": {
      "titulo": "Cámara de Representantes",
      "escanos_totales": 435,
      "escanos_juego": 435,
      "escanos_juego_texto": "escaños en juego",
      "democratas": 214,
      "republicanos": 219,
      "vacantes": 2,
      "fecha_actualizacion": "3 de noviembre de 2026",
      "hora_actualizacion": "20:00 hs",
      "fuente": "congress-legislators"
    },
    "previa": { ... }
  },
  "senado": {
    "actual": {
      "titulo": "Senado en cifras",
      "subtitulo": "35 escaños se renuevan; hoy los republicanos tienen la mayoría.",
      "escanos_totales": 100,
      "escanos_juego": 35,
      "escanos_juego_texto": "escaños en juego",
      "democratas": 47,
      "republicanos": 53,
      "vacantes": 0,
      "fecha_actualizacion": "3 de noviembre de 2026",
      "hora_actualizacion": "20:00 hs",
      "fuente": "congress-legislators · 27toWin"
    },
    "previa": { ... }
  }
}
```

---

## 💻 Códigos para embeber en CMS o notas

### Para la Cámara de Representantes:
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
