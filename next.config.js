/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "i.scdn.co",
      "t.scdn.co",
      "newjams-images.scdn.co",
      "dailymix-images.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "wrapped-images.spotifycdn.com",
      "charts-images.scdn.co",
      "daily-mix.scdn.co",
      "blend-playlist-covers.spotifycdn.com",
      "mosaic.scdn.co",
      "mixed-media-images.spotifycdn.com",
      "lineup-images.scdn.co",
      "thisis-images.scdn.co",
    ],
  },
};

module.exports = nextConfig;
