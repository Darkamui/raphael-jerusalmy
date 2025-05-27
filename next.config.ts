import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://www.tribunejuive.info/**"),
      new URL("https://israelvalley.com/**"),
      new URL("https://www.autourdunlivre.com/**"),
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
