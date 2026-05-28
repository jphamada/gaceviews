# Crisis del Empleo: Radiografía de los Ingresos y el Pluriempleo

Una infografía interactiva con un diseño editorial, premium y responsivo, pensada como widget embebible para medios de comunicación y portales periodísticos. Presenta datos estadísticos sobre los salarios, costo de vida, capacidad de ahorro y el fenómeno del pluriempleo en Tucumán y a nivel nacional en la Argentina.

## 🚀 Características principales
- **Diseño Editorial Premium**: Tipografías modernas (`Outfit` e `Inter`), transiciones fluidas de diaporamas y efectos de cristal/glassmorphic.
- **Gráficos e Indicadores Dinámicos**:
  - Animación de conteo ascendente en porcentaje de ingresos y sostenibilidad.
  - Indicador circular (Donut Chart) animado para capacidad de ahorro.
  - Gráfico de barras interactivo con información colapsable y detallada para el presupuesto de gastos.
  - Toggles interactivos para comparar datos regionales (Gran Tucumán) vs. nacionales.
  - Pestañas internas para analizar el perfil demográfico (género, edad y rol en el hogar) del pluriempleado.
- **Widget Embebible (Embed)**: Incluye un botón para generar automáticamente un código `<iframe>` adaptado y listo para copiar e incrustar en notas periodísticas de manera responsiva.
- **Accesibilidad y Navegación**: Soporta navegación fluida por teclado mediante flechas de dirección (izquierda/derecha) y compatibilidad con lectores de pantalla.

---

## 🛠️ Tecnologías utilizadas
- **HTML5**: Estructura semántica, uso estratégico de atributos `aria` para accesibilidad.
- **CSS3 (Vanilla)**: Variables de diseño en `:root`, diseño responsivo avanzado con `CSS Grid` y `Flexbox`, y animaciones nativas.
- **JavaScript (Vanilla)**: Lógica interactiva nativa (sin frameworks pesados), Easing cúbicos para transiciones y copiado al portapapeles.

---

## 📂 Estructura del Proyecto
```text
crisis-empleo/
├── index.html     # Estructura principal y contenido editorial
├── styles.css     # Estilos responsivos y animaciones
├── app.js         # Lógica interactiva y sistema de embeds
├── vercel.json    # Configuración de despliegue en Vercel
└── .gitignore     # Exclusión de archivos locales/temporales
```

---

## 📦 Instrucciones para subir a GitHub y desplegar en Vercel

Este proyecto está completamente listo y optimizado para ser convertido en un repositorio independiente y desplegado a producción. Sigue estos pasos detallados para subirlo a GitHub y desplegarlo de forma gratuita en Vercel.

### Paso 1: Inicializar el repositorio Git local
Abre la terminal en la carpeta `crisis-empleo` y ejecuta los siguientes comandos:

```bash
# 1. Inicializar el repositorio local
git init

# 2. Agregar todos los archivos preparados (respetando el archivo .gitignore)
git add .

# 3. Realizar el primer commit
git commit -m "feat: inicializar infografia interactiva de crisis de empleo"

# 4. Cambiar el nombre de la rama por defecto a 'main'
git branch -M main
```

---

### Paso 2: Crear el repositorio en GitHub y subir los archivos
1. Ve a [GitHub](https://github.com/) e inicia sesión.
2. Haz clic en **New** (Nuevo repositorio).
3. Escribe un nombre para el repositorio (por ejemplo: `crisis-empleo-infografia`).
4. **No** selecciones "Add a README file", "Add .gitignore", ni licencias, ya que estos archivos ya están configurados en esta carpeta local.
5. Haz clic en **Create repository**.
6. GitHub te mostrará los comandos para subir tu código. Copia las dos líneas que enlazan tu remoto y suben la rama:

```bash
# 1. Enlazar el repositorio local con el remoto de GitHub
# (Reemplaza con la URL real de tu repositorio)
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# 2. Subir tus archivos a la rama principal
git push -u origin main
```

---

### Paso 3: Desplegar en Vercel
Vercel detecta automáticamente que es un proyecto de HTML/JS estático y no requiere configuraciones de build complejas.

#### Opción A: Despliegue automático conectando GitHub (Recomendado 🌟)
1. Inicia sesión en [Vercel](https://vercel.com/).
2. Haz clic en **Add New...** y luego en **Project**.
3. Conecta tu cuenta de GitHub si aún no lo has hecho.
4. Busca tu repositorio recién subido (`crisis-empleo-infografia`) y haz clic en **Import**.
5. Vercel leerá el archivo `vercel.json` ya incorporado y configurará todo de manera automática.
6. Haz clic en **Deploy**.
7. En menos de un minuto, tendrás tu sitio web corriendo en una URL de producción pública de Vercel. Cada cambio que subas (`git push`) a GitHub se actualizará automáticamente en producción.

#### Opción B: Despliegue rápido con Vercel CLI (Línea de comandos)
Si prefieres no conectar GitHub directamente a Vercel, puedes desplegarlo desde tu computadora en un segundo:
1. Instala el CLI de Vercel (si no lo tienes): `npm install -g vercel`
2. Corre el comando en la carpeta `crisis-empleo`:
   ```bash
   vercel
   ```
3. Sigue las breves preguntas interactivas de la terminal para enlazar el proyecto y confirmar el despliegue.
4. Para pasar a producción definitiva, ejecuta:
   ```bash
   vercel --prod
   ```

---

## ⚡ Correcciones y Mejoras de Producción Recientes
Hemos preparado los archivos aplicando las siguientes optimizaciones de calidad y producción:
1. **Solución a error crítico de JavaScript**: Añadimos el botón `btn-embed` y la estructura del modal del código de inserción (`embed-modal`) que estaban ausentes en el HTML original. Esto provocaba un error de tipo `null` (`TypeError`) en `app.js` e impedía que todo el código JS de navegación se ejecutara. Ahora funciona de manera completamente correcta y fluida.
2. **Archivo `.gitignore` configurado**: Evita subir basura de sistema operativo (`.DS_Store`, `Thumbs.db`) o carpetas de configuración de IDEs al repositorio público de GitHub.
3. **Archivo `vercel.json` optimizado**: Configura Vercel para identificar correctamente la raíz de despliegue y habilita "Clean URLs" para ofrecer direcciones limpias y profesionales a los visitantes e integradores de la infografía.
