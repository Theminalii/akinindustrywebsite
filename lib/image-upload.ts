'use client'

const DEFAULT_MAX_DIMENSION = 1600
const DEFAULT_QUALITY = 0.82

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error ?? new Error('Fayl oxunmadi.'))
    reader.readAsDataURL(file)
  })
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Sekil emal olunmadi.'))
    image.src = dataUrl
  })
}

export async function optimizeImageFile(
  file: File,
  options?: {
    maxDimension?: number
    quality?: number
  }
) {
  const maxDimension = options?.maxDimension ?? DEFAULT_MAX_DIMENSION
  const quality = options?.quality ?? DEFAULT_QUALITY
  const sourceDataUrl = await readFileAsDataUrl(file)
  const image = await loadImage(sourceDataUrl)

  const longestSide = Math.max(image.width, image.height)
  const scale = longestSide > maxDimension ? maxDimension / longestSide : 1
  const width = Math.max(1, Math.round(image.width * scale))
  const height = Math.max(1, Math.round(image.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) {
    return sourceDataUrl
  }

  context.drawImage(image, 0, 0, width, height)

  const compressedDataUrl = canvas.toDataURL('image/webp', quality)

  return compressedDataUrl.length < sourceDataUrl.length ? compressedDataUrl : sourceDataUrl
}
