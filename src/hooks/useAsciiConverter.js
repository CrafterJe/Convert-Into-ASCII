import { useState, useCallback } from 'react'
import { fileToImageData, imageDataToAscii } from '../utils/asciiEngine'
import { parseGIF, decompressFrames } from 'gifuct-js'

export function useAsciiConverter() {
  const [asciiOutput, setAsciiOutput] = useState('')
  const [frames, setFrames] = useState([]) // para GIFs
  const [isGif, setIsGif] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cols, setCols] = useState(100)

  const convertImage = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    setFrames([])
    setIsGif(false)

    try {
      const { imageData } = await fileToImageData(file, 800)
      const ascii = imageDataToAscii(imageData, cols)
      setAsciiOutput(ascii)
    } catch (e) {
      setError('Error al procesar la imagen')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [cols])

  const convertGif = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    setAsciiOutput('')
    setIsGif(true)

    try {
      const buffer = await file.arrayBuffer()
      const gif = parseGIF(buffer)
      const gifFrames = decompressFrames(gif, true)

      const canvas = document.createElement('canvas')
      canvas.width = gif.lsd.width
      canvas.height = gif.lsd.height
      const ctx = canvas.getContext('2d')

      const asciiFrames = gifFrames.map((frame) => {
        const imageData = ctx.createImageData(frame.dims.width, frame.dims.height)
        imageData.data.set(frame.patch)

        // Dibujamos frame en canvas completo
        ctx.putImageData(imageData, frame.dims.left, frame.dims.top)
        const fullFrame = ctx.getImageData(0, 0, canvas.width, canvas.height)

        return {
          ascii: imageDataToAscii(fullFrame, cols),
          delay: (frame.delay || 10) * 10, // centisegundos a ms
        }
      })

      setFrames(asciiFrames)
      setAsciiOutput(asciiFrames[0]?.ascii || '')
    } catch (e) {
      setError('Error al procesar el GIF')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [cols])

  const convert = useCallback((file) => {
    if (!file) return
    if (file.type === 'image/gif') {
      convertGif(file)
    } else {
      convertImage(file)
    }
  }, [convertImage, convertGif])

  return {
    asciiOutput,
    setAsciiOutput,
    frames,
    isGif,
    loading,
    error,
    cols,
    setCols,
    convert,
  }
}