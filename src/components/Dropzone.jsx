import { useRef, useState } from 'react'

const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

export function Dropzone({ onFile }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file) => {
    if (!file) return
    if (!ACCEPTED.includes(file.type)) return
    onFile(file)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const onDragLeave = () => setDragging(false)

  const onClick = () => inputRef.current?.click()

  const onInputChange = (e) => {
    const file = e.target.files[0]
    handleFile(file)
    e.target.value = ''
  }

  return (
    <div
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className={`
        relative cursor-pointer border-2 border-dashed rounded-xl p-10
        flex flex-col items-center justify-center gap-3 transition-all duration-200
        ${dragging
          ? 'border-green-400 bg-green-400/10 scale-[1.02]'
          : 'border-gray-600 hover:border-gray-400 bg-gray-900/50 hover:bg-gray-800/50'
        }
      `}
    >
      <div className="text-4xl select-none"></div>
      <p className="text-gray-300 font-medium text-sm">
        Arrastra una imagen o GIF aquí
      </p>
      <p className="text-gray-500 text-xs">PNG, JPG, WEBP, GIF</p>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  )
}