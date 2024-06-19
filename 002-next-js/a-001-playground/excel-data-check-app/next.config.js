/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
		return [
			{
				source: "/:path*",
				destination: "https://release.passorder.me:9999/:path*",
			},
		];
	},
}

module.exports = nextConfig
