# 🖼️ ASCII Converter

> Convert images and animated GIFs to ASCII art — all in the browser, no backend needed.

<details>
<summary>🇲🇽 Leer en Español</summary>

<br>

> Convierte imágenes y GIFs animados a ASCII art — todo en el navegador, sin backend.

## Características

- Sube imágenes (PNG, JPG, WEBP) o GIFs animados con drag & drop
- Vista previa en tiempo real del ASCII generado
- GIFs se reproducen frame a frame en ASCII
- Control de columnas para ajustar el nivel de detalle
- Exporta el resultado como `.txt` o `.png`

## Instalación

```bash
git clone https://github.com/tu-usuario/ascii-converter.git
cd ascii-converter
npm install
npm run dev
```

## Estructura

```
src/
├── components/
│   ├── Dropzone.jsx       # Zona de drag & drop
│   ├── AsciiPreview.jsx   # Vista previa animada del ASCII
│   └── ExportButtons.jsx  # Exportar como .txt o .png
├── hooks/
│   └── useAsciiConverter.js  # Lógica de conversión
└── utils/
    └── asciiEngine.js     # Motor: pixels → caracteres ASCII
```

## ¿Cómo funciona?

1. La imagen se dibuja en un `<canvas>` oculto
2. Se leen los píxeles con `getImageData()`
3. Cada píxel se convierte a brillo usando luminancia perceptual (`0.299R + 0.587G + 0.114B`)
4. El brillo se mapea a un caracter del set `@#S%?*+;:,. `
5. Para GIFs, se procesan los frames individualmente con `gifuct-js` y se animan con `setTimeout`

## Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [gifuct-js](https://github.com/matt-way/gifuct-js)
- Canvas API nativa

## Licencia

MIT

</details>

---

## Features

- Drag & drop images (PNG, JPG, WEBP) or animated GIFs
- Real-time ASCII preview
- Animated GIFs play frame by frame in ASCII
- Column slider to control detail level
- Export result as `.txt` or `.png`

## Getting Started

```bash
git clone https://github.com/your-username/ascii-converter.git
cd ascii-converter
npm install
npm run dev
```

## Structure

```
src/
├── components/
│   ├── Dropzone.jsx       # Drag & drop upload zone
│   ├── AsciiPreview.jsx   # Animated ASCII preview
│   └── ExportButtons.jsx  # Export as .txt or .png
├── hooks/
│   └── useAsciiConverter.js  # Conversion logic
└── utils/
    └── asciiEngine.js     # Core engine: pixels → ASCII chars
```

## How it works

1. The image is drawn onto a hidden `<canvas>`
2. Pixels are read via `getImageData()`
3. Each pixel is converted to brightness using perceptual luminance (`0.299R + 0.587G + 0.114B`)
4. Brightness maps to a character from the set `@#S%?*+;:,. `
5. For GIFs, frames are extracted with `gifuct-js` and animated using `setTimeout`

## Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [gifuct-js](https://github.com/matt-way/gifuct-js)
- Native Canvas API

## License

MIT