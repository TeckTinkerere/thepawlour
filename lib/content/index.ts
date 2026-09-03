import { cache } from 'react'
import defaults from '@/content/site.json'
import { mergeContent } from './normalize'
import { fetchRemoteContent, revalidateSeconds } from './remote'
import type { SiteContent } from './types'

export * from './types'
export { revalidateSeconds }

const DEFAULT_CONTENT = defaults as unknown as SiteContent

/**
 * The single source of truth for every word, price and detail on the site.
 *
 * Falls back to the committed defaults whenever no remote source is configured
 * or the remote source cannot be read, so the site is never blocked on it.
 * `cache` keeps one render from fetching the sheet once per section.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const remote = await fetchRemoteContent()
  return mergeContent(DEFAULT_CONTENT, remote)
})

/** Synchronous access to the committed defaults, for tests and static metadata. */
export function getDefaultContent(): SiteContent {
  return DEFAULT_CONTENT
}
