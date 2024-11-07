import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

export function imageUrl(source: SanityImageSource) {
  return builder.image(source)
}