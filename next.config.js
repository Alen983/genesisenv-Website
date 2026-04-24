const remarkGfm = require('remark-gfm').default

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // GFM tables, strikethrough, task lists, autolink literals (fixes pipe tables in docs)
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/genesisenv-Website' : '',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = withMDX(nextConfig)
