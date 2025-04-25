/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'rexsports.vn',
      },
      {
        protocol: "https",
        hostname: "img.vietqr.io", 
      },
    ],
  },
};

export default nextConfig;
