/** @type {import('next').NextConfig} */
// const withTM = require("next-transpile-modules")([
//   "demo-next-client",
// ]) // pass the modules you would like to see transpiled

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
}

module.exports = nextConfig
// module.exports = withTM
