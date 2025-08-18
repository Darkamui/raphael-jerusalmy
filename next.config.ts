import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker optimization
  output: "standalone",

  // Experimental features for better performance
  experimental: {
    // Enable modern JavaScript features
    esmExternals: true,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tribunejuive.info",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "israelvalley.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.autourdunlivre.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression and optimization
  compress: true,
  poweredByHeader: false,

  // Security headers
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    
    // Content Security Policy
    const cspHeader = isDev ? 
      // Development: More permissive for Next.js hot reload and dev tools
      `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' blob: data: https://www.tribunejuive.info https://picsum.photos https://israelvalley.com https://www.autourdunlivre.com;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' ws: wss: https://vitals.vercel-analytics.com;
        media-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
      `.replace(/\s{2,}/g, ' ').trim()
      :
      // Production: Strict CSP
      `
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' blob: data: https://www.tribunejuive.info https://picsum.photos https://israelvalley.com https://www.autourdunlivre.com;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://vitals.vercel-analytics.com;
        media-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
      `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },

  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 10000,
          maxSize: 100000, // Reduced from 200000 to create smaller chunks
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework libraries - keep React separate
            react: {
              name: "react",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 50,
              enforce: true,
            },
            // Heavy animation library - separate chunk
            motion: {
              name: "motion",
              chunks: "all",
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              priority: 45,
              enforce: true,
            },
            // Text editor libraries - separate chunk
            editor: {
              name: "editor",
              chunks: "all",
              test: /[\\/]node_modules[\\/](@tiptap)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // UI Libraries
            radix: {
              name: "radix",
              chunks: "all", 
              test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
              priority: 35,
              enforce: true,
            },
            // Icons
            icons: {
              name: "icons",
              chunks: "all",
              test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
              priority: 30,
              enforce: true,
            },
            // Internationalization
            i18n: {
              name: "i18n",
              chunks: "all",
              test: /[\\/]node_modules[\\/](next-intl)[\\/]/,
              priority: 25,
              enforce: true,
            },
            // Validation libraries
            validation: {
              name: "validation",
              chunks: "all",
              test: /[\\/]node_modules[\\/](zod)[\\/]/,
              priority: 20,
              enforce: true,
            },
            // Other vendor libraries
            vendor: {
              name: "vendor",
              chunks: "all",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              minChunks: 1,
            },
            // Common application code
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              enforce: true,
              priority: 5,
            },
          },
        },
      };
    }

    // Performance budgets (prevent bundle size regressions)
    if (!dev && !isServer) {
      config.performance = {
        hints: "warning",
        maxEntrypointSize: 1200000, // 1.2MB limit for initial bundle (increased to accommodate framer-motion)
        maxAssetSize: 250000, // 250KB limit for individual assets (increased for framer-motion)
        assetFilter: (assetFilename: string) => {
          // Only check JavaScript and CSS files
          return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
        },
      };
    }

    // Bundle analyzer (optional, for debugging)
    if (process.env.ANALYZE === "true") {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
        })
      );
    }

    return config;
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
