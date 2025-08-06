import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'paarshinfotech.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
