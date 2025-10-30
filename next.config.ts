/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'pixabay.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.pixabay.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'i.pinimg.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'source.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'media.istockphoto.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.freeimages.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'tse2.mm.bing.net', port: '', pathname: '/**' },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "frame-src 'self' https://*.firebaseapp.com https://*.google.com https://*.gstatic.com https://accounts.google.com",
            "img-src * data: blob:",
            "media-src *",
            "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.gstatic.com https://accounts.google.com",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.firebaseapp.com https://accounts.google.com https://apis.google.com https://www.gstatic.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
          ].join("; "),
        },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
      ],
    },
  ],
};

module.exports = nextConfig;
