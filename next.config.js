/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // NOTE: https://github.com/tailwindlabs/headlessui/issues/681#issuecomment-1086162507
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: false,
      },
    ];
  },
  experimental: {
    outputStandalone: true,
  },
};

module.exports = nextConfig;
