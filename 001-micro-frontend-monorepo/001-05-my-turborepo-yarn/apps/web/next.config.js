/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  transpilePackages: ["@repo/ui"],
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
};
