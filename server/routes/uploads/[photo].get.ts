import { sendStream } from 'h3'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.resolve(path.dirname(__filename), '../../')

export default defineEventHandler((event: any) => {
  const uploadDir
    = process.env.NODE_ENV === 'development' ? './uploads' : path.join(__dirname, './uploads')

  try {
    const photo = getRouterParam(event, 'photo')
    if (!photo) {
      return null
    }

    return sendStream(event, fs.createReadStream(path.join(uploadDir, photo)))
  } catch (e) {
    return null
  }
})
