import * as fs from 'node:fs'
import * as path from 'node:path'
import createSqliteDb from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import type { DB } from './db/types.js'

type KyselyDb = Kysely<DB>

const createKyselyDb = (databaseUrl: string): KyselyDb => {
  fs.mkdirSync(path.dirname(databaseUrl), { recursive: true })

  const sqliteDb = createSqliteDb(databaseUrl)
  sqliteDb.pragma('journal_mode = WAL')

  const db = new Kysely<DB>({
    dialect: new SqliteDialect({
      database: sqliteDb,
    }),
  })

  return db
}

export { createKyselyDb }
export type { KyselyDb }

export {
  type Image,
  type Sojourn,
  type Travel,
  type Map,
  type Location,
  type Story,
  type Page,
} from './db/types.js'
