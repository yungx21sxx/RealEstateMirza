declare module '*.css'

declare module 'heic-convert' {
  interface HeicConvertOptions {
    buffer: Buffer
    format: 'JPEG' | 'PNG'
  }

  export default function heicConvert(options: HeicConvertOptions): Promise<Buffer>
}
