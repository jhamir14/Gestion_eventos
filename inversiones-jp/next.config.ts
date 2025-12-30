import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fdn2.gsmarena.com',
      },
      {
        protocol: 'https',
        hostname: 'images.samsung.com',
      },
      {
        protocol: 'https',
        hostname: 'carsaperupoc.vtexassets.com',
      },
      {
        protocol: 'https',
        hostname: 'media.falabella.com',
      },
      {
        protocol: 'https',
        hostname: 'tse4.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'oechsle.vteximg.com.br',
      },
      {
        protocol: 'https',
        hostname: 'coolboxpe.vtexassets.com',
      },
      {
        protocol: 'https',
        hostname: 'promart.vteximg.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.lacuracao.pe',
      },
      {
        protocol: 'https',
        hostname: 'plazavea.vteximg.com.br',
      },
      {
        protocol: 'https',
        hostname: 'rimage.ripley.com.pe',
      },
      {
        protocol: 'https',
        hostname: 'estilospe.vtexassets.com',
      },
      {
        protocol: 'https',
        hostname: 'www.infiniti.com.pe',
      },
      {
        protocol: 'https',
        hostname: 'novoxperu.com',
      }
    ],
  },
};

export default nextConfig;
