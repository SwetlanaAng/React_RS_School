/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.68.106'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
};

export default nextConfig;
