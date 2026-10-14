import { existsSync } from 'node:fs'
import { dirname, isAbsolute, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '../../prisma/generated/client'

const defaultDatabaseUrl = 'file:./prisma/dev.db'
const moduleDirectory = dirname(fileURLToPath(import.meta.url))

function resolveProjectRoot(startDirectory: string) {
  let currentDirectory = startDirectory

  while (true) {
    if (
      existsSync(join(currentDirectory, 'package.json'))
      && existsSync(join(currentDirectory, 'prisma'))
    ) {
      return currentDirectory
    }

    const parentDirectory = dirname(currentDirectory)

    if (parentDirectory === currentDirectory) {
      return null
    }

    currentDirectory = parentDirectory
  }
}

/** Нормализует SQLite DATABASE_URL и делает относительный путь абсолютным от корня проекта. */
function resolveDatabaseUrl(databaseUrl: string) {
  if (!databaseUrl.startsWith('file:')) {
    databaseUrl = defaultDatabaseUrl
  }

  const sqlitePath = databaseUrl.slice('file:'.length)

  if (sqlitePath === ':memory:' || isAbsolute(sqlitePath)) {
    return databaseUrl
  }

  const projectRoot
    = resolveProjectRoot(process.cwd())
      ?? resolveProjectRoot(moduleDirectory)
      ?? resolve(moduleDirectory, '../..')

  return `file:${resolve(projectRoot, sqlitePath)}`
}

const databaseUrl = resolveDatabaseUrl(defaultDatabaseUrl)

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
  prismaAdapter?: PrismaBetterSqlite3
}

const adapter
  = globalForPrisma.prismaAdapter
    ?? new PrismaBetterSqlite3({
      url: databaseUrl
    })

export const prisma
  = globalForPrisma.prisma
    ?? new PrismaClient({
      adapter
    })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaAdapter = adapter
  globalForPrisma.prisma = prisma
}
