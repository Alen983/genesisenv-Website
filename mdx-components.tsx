import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as useBaseComponents } from './components/mdx-components'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return useBaseComponents(components)
}
