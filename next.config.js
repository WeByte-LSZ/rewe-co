const { name, description, version, dependencies } = require('./package.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    name: name,
    description: description,
    version: version,
    dependencies: dependencies
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
