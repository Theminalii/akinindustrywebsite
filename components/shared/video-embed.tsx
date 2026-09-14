'use client'

function getEmbedUrl(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : url
    }
    if (parsed.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace('/', '')}`
    }
    if (parsed.hostname.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean).at(0)
      return id ? `https://player.vimeo.com/video/${id}` : url
    }
  } catch {
    return url
  }
  return url
}

function isVideoFile(url: string) {
  return /\.(mp4|webm|ogg)(?:$|\?)/i.test(url)
}

export function VideoEmbed({ url, title }: { url: string; title: string }) {
  if (isVideoFile(url)) {
    return (
      <video className="h-full w-full bg-black object-cover" controls preload="metadata">
        <source src={url} />
      </video>
    )
  }

  return (
    <iframe
      src={getEmbedUrl(url)}
      title={title}
      className="h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
    />
  )
}
