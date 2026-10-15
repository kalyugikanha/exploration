/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/refund',
        destination: '/cancellation-and-refund-policies.html',
        permanent: true,
      },
      {
        source: '/refund-and-cancellation',
        destination: '/cancellation-and-refund-policies.html',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;