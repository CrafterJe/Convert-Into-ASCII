export function ExportButtons({ ascii }) {
  if (!ascii) return null

  const exportTxt = () => {
    const blob = new Blob([ascii], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ascii-art.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportPng = () => {
    const lines = ascii.split('\n')
    const fontSize = 10
    const lineHeight = fontSize * 1.2
    const charWidth = fontSize * 0.6

    const width = Math.max(...lines.map((l) => l.length)) * charWidth
    const height = lines.length * lineHeight

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = '#4ade80' // green-400
    ctx.font = `${fontSize}px monospace`

    lines.forEach((line, i) => {
      ctx.fillText(line, 0, (i + 1) * lineHeight)
    })

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'ascii-art.png'
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={exportTxt}
        className="flex-1 py-2 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium transition-colors border border-gray-700 hover:border-gray-500"
      >
        Exportar .txt
      </button>
      <button
        onClick={exportPng}
        className="flex-1 py-2 px-4 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm font-medium transition-colors border border-green-500/30 hover:border-green-400/50"
      >
        Exportar .png
      </button>
    </div>
  )
}