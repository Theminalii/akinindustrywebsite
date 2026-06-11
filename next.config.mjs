/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/admin/page.tsx',
        destination: '/admin',
        permanent: false,
      },
      {
        source: '/admin/:path*/page.tsx',
        destination: '/admin/:path*',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
