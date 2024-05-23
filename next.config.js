/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    dangerouslyAllowSVG: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "d2pur3iezf4d1j.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "d35aaqx5ub95lt.cloudfront.net",
      },

      {
        protocol: "https",
        hostname: "qpaaeeduxpckpcjvcygl.supabase.co",
      },
    ],
  },
};

export default config;
