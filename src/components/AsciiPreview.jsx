import { useEffect, useRef, useState } from 'react'

export function AsciiPreview({ ascii, frames, isGif, fontSize = 6 }) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!isGif || frames.length === 0) return

    const tick = () => {
      setCurrentFrame((prev) => {
        const next = (prev + 1) % frames.length
        timerRef.current = setTimeout(tick, frames[next]?.delay || 100)
        return next
      })
    }

    timerRef.current = setTimeout(tick, frames[0]?.delay || 100)

    return () => clearTimeout(timerRef.current)
  }, [isGif, frames])

  const displayText = isGif && frames.length > 0
    ? frames[currentFrame]?.ascii
    : ascii

  if (!displayText) return null

  return (
    <div className="w-full overflow-auto rounded-xl bg-black border border-gray-800 p-4">
      <pre
        className="text-green-400 leading-none select-all"
        style={{ fontSize: `${fontSize}px`, fontFamily: 'monospace' }}
      >
        {displayText}
      </pre>
    </div>
  )
}