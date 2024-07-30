/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  transpilePackages: ['@repo/ui', '@repo/icons'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'passorderstatic.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
