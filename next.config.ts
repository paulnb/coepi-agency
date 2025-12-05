import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // <--- This is the only line you really need to add
};

export default nextConfig;