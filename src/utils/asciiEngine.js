// Caracteres ordenados de más denso a más claro
const ASCII_CHARS = '@#S%?*+;:,. '

/**
 * Convierte el valor de brillo (0-255) a un caracter ASCII
 */
export function brightnessToChar(brightness) {
  const index = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1))
  return ASCII_CHARS[index]
}

/**
 * Procesa un ImageData y devuelve un string ASCII
 * @param {ImageData} imageData
 * @param {number} cols - número de columnas (ancho en caracteres)
 */
export function imageDataToAscii(imageData, cols = 100) {
  const { width, height, data } = imageData

  const cellW = width / cols
  const rows = Math.floor(height / (cellW * 2)) // *2 porque los chars son más altos que anchos

  let result = ''

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = Math.floor(col * cellW)
      const y = Math.floor(row * cellW * 2)

      const i = (y * width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      // Luminancia perceptual
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b

      result += brightnessToChar(brightness)
    }
    result += '\n'
  }

  return result
}

/**
 * Carga una imagen desde un File y devuelve su ImageData
 * @param {File} file
 * @param {number} maxWidth - ancho máximo del canvas
 * @returns {Promise<{imageData: ImageData, width: number, height: number}>}
 */
export function fileToImageData(file, maxWidth = 800) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width)
      const w = Math.floor(img.width * scale)
      const h = Math.floor(img.height * scale)

      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, w, h)

      const imageData = ctx.getImageData(0, 0, w, h)
      URL.revokeObjectURL(url)
      resolve({ imageData, width: w, height: h })
    }

    img.onerror = reject
    img.src = url
  })
}