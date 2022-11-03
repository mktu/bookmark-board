const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/] // TBD need bugfix version (https://github.com/shadowwalker/next-pwa/issues/288)
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

module.exports = withBundleAnalyzer({
  ...withPWA(),
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}
)