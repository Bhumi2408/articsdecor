/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "placehold.co" }],
  },

  // Admin and API responses are always dynamic (fresh DB reads/writes) —
  // explicitly tell any proxy/CDN in front (e.g. Apache reverse proxy) not
  // to cache them, since a caching layer replaying old responses is what
  // makes freshly uploaded images / saved edits look like they need a full
  // rebuild to show up.
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
        ],
      },
      {
        source: "/uploads/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
