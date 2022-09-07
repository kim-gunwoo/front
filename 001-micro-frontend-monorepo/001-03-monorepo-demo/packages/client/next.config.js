/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   externalDir: true,
  // },
}

const withTM = require('next-transpile-modules')(['@myapp/common']);

// 기존 설정된 nextConfig를 인자로 넘겨주면 된다.
module.exports = withTM(nextConfig);
