/** Local product artwork. No network lookup or runtime icon service. */
export type BrandAsset = {
  name: string
  category: 'Payments' | 'Banks' | 'Apps' | 'Crypto'
  light: string
  dark: string
  tileArtwork?: string
  tileBackground?: string
  proportion: number
  scale: number
}


/** The site ships no brand artwork; its scenes use none. */
export const brandMarks: Record<string, BrandAsset> = {}

export type BrandName = string
