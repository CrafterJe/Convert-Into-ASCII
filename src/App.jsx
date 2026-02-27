import './App.css'
import { Dropzone } from './components/Dropzone'
import { AsciiPreview } from './components/AsciiPreview'
import { ExportButtons } from './components/ExportButtons'
import { useAsciiConverter } from './hooks/useAsciiConverter'

function App() {
  const {
    asciiOutput,
    frames,
    isGif,
    loading,
    error,
    cols,
    setCols,
    convert,
  } = useAsciiConverter()

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-10 gap-8">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight font-mono">
          <span className="text-green-400">ASCII</span> Converter
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Convierte imágenes y GIFs a ASCII art — todo en tu navegador
        </p>
      </div>

      {/* Controls */}
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <Dropzone onFile={convert} />

        {/* Slider de columnas */}
        <div className="flex items-center gap-4">
          <label className="text-gray-400 text-sm whitespace-nowrap">
            Columnas: <span className="text-white font-mono">{cols}</span>
          </label>
          <input
            type="range"
            min={40}
            max={200}
            step={5}
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="flex-1 accent-green-400"
          />
        </div>

        {/* Estado */}
        {loading && (
          <p className="text-green-400 text-sm text-center animate-pulse font-mono">
            Procesando...
          </p>
        )}
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {/* Export */}
        <ExportButtons ascii={asciiOutput} />
      </div>

      {/* Preview */}
      {(asciiOutput || (isGif && frames.length > 0)) && (
        <div className="w-full max-w-5xl">
          <AsciiPreview
            ascii={asciiOutput}
            frames={frames}
            isGif={isGif}
          />
        </div>
      )}

      <footer className="text-gray-700 text-xs font-mono mt-auto">
        canvas api · gifuct-js · react · vite
      </footer>
    </div>
  )
}

export default App