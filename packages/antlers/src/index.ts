import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import assert from 'node:assert'
import { walkFiles } from 'walk-it'
import pMap from 'p-map'
import { errorBoundary, errorListBoundary } from '@stayradiated/error-boundary'
import { createKyselyDb } from '@stayradiated/antlers-db'
import type {
  KyselyDb,
  Image,
  Sojourn,
  Location,
  Map,
  Travel,
  Story,
  Page,
} from '@stayradiated/antlers-db'
import type { ParseMarkdocResult } from './markdoc-parse.js'
import { parseMarkdoc } from './markdoc-parse.js'
import { fetchImageInfo } from './fetch-image-info.js'
import type { ImaginaryConfig } from './types.js'

const filePathToId = (filePath: string): string => {
  const id = filePath.replace(/\.md$/, '')
  return id
}

type FileInfo = {
  path: string
  content: string
}

const readFileContent = async (path: string): Promise<FileInfo> => {
  const content = await fs.readFile(path, 'utf8')
  return { path, content }
}

const getMarkdocFileList = async (
  contentDirPath: string,
): Promise<ParseMarkdocResult[] | Error> => {
  const filePathStream = walkFiles(contentDirPath, {
    includeFile: ({ name }) => name.endsWith('.md'),
  })

  const markdocFileList = await errorListBoundary(async () =>
    pMap(
      filePathStream,
      async (file) => {
        const relativePath = path.relative(contentDirPath, file.path)
        const info = await readFileContent(file.path)

        const result = await parseMarkdoc({
          filePath: relativePath,
          source: info.content,
        })

        return result
      },
      { concurrency: 10 },
    ),
  )

  return markdocFileList
}

const groupBy = <T, K extends string>(
  list: T[],
  getKey: (item: T) => K,
): Record<K, T[]> => {
  const groups = {} as Record<K, T[]>
  for (const item of list) {
    const key = getKey(item)
    const array = (groups[key] ??= [])
    array.push(item)
  }

  return groups
}

const upsertSojourn = async (
  db: KyselyDb,
  file: ParseMarkdocResult,
): Promise<void | Error> => {
  const { filePath, frontmatter } = file
  assert(frontmatter.type === 'sojourn')

  console.log(filePath)

  const id = filePathToId(filePath)

  const data: Sojourn = {
    id,
    arriveAt: frontmatter.arriveAt,
    departAt: frontmatter.departAt ?? null,
    image: frontmatter.image ?? null,
    locationFile: frontmatter.locationFile
      ? filePathToId(frontmatter.locationFile)
      : null,
  }

  const upsertResult = await errorBoundary(async () =>
    db
      .insertInto('sojourn')
      .values(data)
      .onConflict((oc) => oc.column('id').doUpdateSet(data))
      .execute(),
  )
  if (upsertResult instanceof Error) {
    console.error('Could not upsert sojourn!', data, upsertResult)
    return upsertResult
  }
}

const upsertLocation = async (
  db: KyselyDb,
  file: ParseMarkdocResult,
): Promise<void | Error> => {
  const { filePath, frontmatter } = file
  assert(frontmatter.type === 'location')

  console.log(filePath)

  const id = filePathToId(filePath)

  const data: Location = {
    id,
    name: frontmatter.name,
    region: frontmatter.region ?? null,
    country: frontmatter.country,
    latitude: frontmatter.coordinates?.[0] ?? null,
    longitude: frontmatter.coordinates?.[1] ?? null,
    countryMapFile: frontmatter.countryMapFile
      ? filePathToId(frontmatter.countryMapFile)
      : null,
  }

  const upsertResult = await errorBoundary(async () =>
    db
      .insertInto('location')
      .values(data)
      .onConflict((oc) => oc.column('id').doUpdateSet(data))
      .execute(),
  )
  if (upsertResult instanceof Error) {
    console.error('Could not upsert location!', data, upsertResult)
    return upsertResult
  }
}

const upsertMap = async (
  db: KyselyDb,
  file: ParseMarkdocResult,
): Promise<void | Error> => {
  const { filePath, frontmatter } = file
  assert(frontmatter.type === 'map')

  console.log(filePath)

  const id = filePathToId(filePath)

  const data: Map = {
    id,
    name: frontmatter.name,
    image: frontmatter.image,
    source: frontmatter.source ?? null,
    coordinatesNorth: frontmatter.coordinates.north,
    coordinatesEast: frontmatter.coordinates.east,
    coordinatesSouth: frontmatter.coordinates.south,
    coordinatesWest: frontmatter.coordinates.west,
  }

  const upsertResult = await errorBoundary(async () =>
    db
      .insertInto('map')
      .values(data)
      .onConflict((oc) => oc.column('id').doUpdateSet(data))
      .execute(),
  )
  if (upsertResult instanceof Error) {
    console.error('Could not upsert map!', data, upsertResult)
    return upsertResult
  }
}

const upsertTravel = async (
  db: KyselyDb,
  file: ParseMarkdocResult,
): Promise<void | Error> => {
  const { filePath, frontmatter } = file
  assert(frontmatter.type === 'travel')

  console.log(filePath)

  const id = filePathToId(filePath)

  const data: Travel = {
    id,
    start: frontmatter.start,
    end: frontmatter.end,
    date: frontmatter.date,
    mode: frontmatter.mode,
    coordinates: JSON.stringify(frontmatter.coordinates),
  }

  const upsertResult = await errorBoundary(async () =>
    db
      .insertInto('travel')
      .values(data)
      .onConflict((oc) => oc.column('id').doUpdateSet(data))
      .execute(),
  )
  if (upsertResult instanceof Error) {
    console.error('Could not upsert travel!', data, upsertResult)
    return upsertResult
  }
}

const upsertStory = async (
  db: KyselyDb,
  file: ParseMarkdocResult,
): Promise<void | Error> => {
  const { filePath, frontmatter } = file
  assert(frontmatter.type === 'story')

  console.log(filePath)

  const id = filePathToId(filePath)

  const data: Story = {
    id,
    title: frontmatter.title,
    date: frontmatter.date,
  }

  const upsertResult = await errorBoundary(async () =>
    db
      .insertInto('story')
      .values(data)
      .onConflict((oc) => oc.column('id').doUpdateSet(data))
      .execute(),
  )
  if (upsertResult instanceof Error) {
    console.error('Could not upsert story!', data, upsertResult)
    return upsertResult
  }
}

const upsertImage = async (
  db: KyselyDb,
  source: string,
  imaginaryConfig: ImaginaryConfig,
): Promise<void | Error> => {
  const existingImage = await db
    .selectFrom('image')
    .selectAll()
    .where('id', '=', source)
    .executeTakeFirst()

  if (!existingImage) {
    const info = await fetchImageInfo(source, imaginaryConfig)
    if (info instanceof Error) {
      return info
    }

    const id = source

    const data: Image = {
      id,
      width: info.width,
      height: info.height,
      type: info.type,
      space: info.space,
      hasAlpha: info.hasAlpha ? 1 : 0,
      hasProfile: info.hasProfile ? 1 : 0,
      channels: info.channels,
      orientation: info.orientation,
      exif: info.exif ? JSON.stringify(info.exif) : null,
    }

    const result = await errorBoundary(async () =>
      db
        .insertInto('image')
        .values(data)
        .onConflict((oc) => oc.column('id').doUpdateSet(data))
        .execute(),
    )
    if (result instanceof Error) {
      console.error('Could not upsert image!', data, result)
      return result
    }
  }
}

const upsertPage = async (
  db: KyselyDb,
  file: ParseMarkdocResult,
  imaginaryConfig: ImaginaryConfig,
): Promise<void | Error> => {
  const {
    filePath,
    renderableTreeNode,
    frontmatter,
    referenceKeyList,
    summary,
  } = file

  console.log(filePath)

  const imageList = referenceKeyList
    .filter((ref) => ref.type === 'image')
    .map((ref) => ref.id)

  const imageUpsertResult = await errorListBoundary(async () =>
    pMap(
      imageList,
      async (source) => upsertImage(db, source, imaginaryConfig),
      {
        concurrency: 1,
      },
    ),
  )
  if (imageUpsertResult instanceof Error) {
    console.error(`Could not upsert images: ${filePath}`)
    console.dir(imageList, { depth: null })
    console.error(imageUpsertResult)
    return imageUpsertResult
  }

  const id = filePathToId(filePath)

  const data: Page = {
    id,
    type: frontmatter.type ?? null,
    content: JSON.stringify(renderableTreeNode),
    imageCount: summary.imageCount,
    wordCount: summary.wordCount,
  }

  const upsertResult = await errorBoundary(async () =>
    db
      .insertInto('page')
      .values(data)
      .onConflict((oc) => oc.column('id').doUpdateSet(data))
      .execute(),
  )
  if (upsertResult instanceof Error) {
    console.error(`Could not upsert page: ${filePath}`)
    console.dir(data, { depth: null })
    console.error(upsertResult)
    return upsertResult
  }

  const pageRefImageList = referenceKeyList
    .filter((ref) => ref.type === 'image')
    .map((ref) => ({
      pageId: id,
      imageId: ref.id,
    }))
  const pageRefImageListResult = await errorListBoundary(async () =>
    pMap(
      pageRefImageList,
      async (ref) => {
        db.insertInto('page_image_ref')
          .values(ref)
          .onConflict((oc) => oc.columns(['pageId', 'imageId']).doNothing())
          .execute()
      },
      { concurrency: 1 },
    ),
  )
  if (pageRefImageListResult instanceof Error) {
    console.error(`Could not upsert page image refs: ${filePath}`)
    console.dir(pageRefImageList, { depth: null })
    console.error(pageRefImageListResult)
    return pageRefImageListResult
  }

  const pageRefLocationList = referenceKeyList
    .filter((ref) => ref.type === 'location')
    .map((ref) => ({
      pageId: id,
      locationId: filePathToId(ref.id),
    }))
  const pageRefLocationListResult = await errorListBoundary(async () =>
    pMap(
      pageRefLocationList,
      async (ref) => {
        db.insertInto('page_location_ref')
          .values(ref)
          .onConflict((oc) => oc.columns(['pageId', 'locationId']).doNothing())
          .execute()
      },
      { concurrency: 1 },
    ),
  )
  if (pageRefLocationListResult instanceof Error) {
    console.error(`Could not upsert page location refs: ${filePath}`)
    console.dir(pageRefLocationList, { depth: null })
    console.error(pageRefLocationListResult)
    return pageRefLocationListResult
  }

  const pageRefMapList = referenceKeyList
    .filter((ref) => ref.type === 'map')
    .map((ref) => ({
      pageId: id,
      mapId: filePathToId(ref.id),
    }))
  const pageRefMapListResult = await errorListBoundary(async () =>
    pMap(
      pageRefMapList,
      async (ref) => {
        db.insertInto('page_map_ref')
          .values(ref)
          .onConflict((oc) => oc.columns(['pageId', 'mapId']).doNothing())
          .execute()
      },
      { concurrency: 1 },
    ),
  )
  if (pageRefMapListResult instanceof Error) {
    console.error(`Could not upsert page map refs: ${filePath}`)
    console.dir(pageRefMapList, { depth: null })
    console.error(pageRefMapListResult)
    return pageRefMapListResult
  }

  const pageRefTravelList = referenceKeyList
    .filter((ref) => ref.type === 'travel')
    .map((ref) => ({
      pageId: id,
      travelId: filePathToId(ref.id),
    }))
  const pageRefTravelListResult = await errorListBoundary(async () =>
    pMap(
      pageRefTravelList,
      async (ref) => {
        db.insertInto('page_travel_ref')
          .values(ref)
          .onConflict((oc) => oc.columns(['pageId', 'travelId']).doNothing())
          .execute()
      },
      { concurrency: 1 },
    ),
  )
  if (pageRefTravelListResult instanceof Error) {
    console.error(`Could not upsert page travel refs: ${filePath}`)
    console.dir(pageRefTravelList, { depth: null })
    console.error(pageRefTravelListResult)
    return pageRefTravelListResult
  }

  const pageRefStoryList = referenceKeyList
    .filter((ref) => ref.type === 'story')
    .map((ref) => ({
      pageId: id,
      storyId: filePathToId(ref.id),
    }))
  const pageRefStoryListResult = await errorListBoundary(async () =>
    pMap(
      pageRefStoryList,
      async (ref) => {
        db.insertInto('page_story_ref')
          .values(ref)
          .onConflict((oc) => oc.columns(['pageId', 'storyId']).doNothing())
          .execute()
      },
      { concurrency: 1 },
    ),
  )
  if (pageRefStoryListResult instanceof Error) {
    console.error(`Could not upsert page story refs: ${filePath}`)
    console.dir(pageRefStoryList, { depth: null })
    console.error(pageRefStoryListResult)
    return pageRefStoryListResult
  }
}

type BakeDataOptions = {
  contentDirPath: string
  dbPath: string
  imaginaryConfig: {
    host: string
    signatureKey: string
  }
}

const bakeData = async (options: BakeDataOptions): Promise<void | Error> => {
  const { dbPath, contentDirPath, imaginaryConfig } = options

  const db = createKyselyDb(dbPath)

  console.log('Wiping existing data from database')
  const deleteResult = await errorBoundary(async () => {
    await db.deleteFrom('page_image_ref').execute()
    await db.deleteFrom('page_location_ref').execute()
    await db.deleteFrom('page_map_ref').execute()
    await db.deleteFrom('page_travel_ref').execute()
    await db.deleteFrom('page_story_ref').execute()
    await db.deleteFrom('page_sojourn_ref').execute()
    await db.deleteFrom('page').execute()
    await db.deleteFrom('sojourn').execute()
    await db.deleteFrom('travel').execute()
    await db.deleteFrom('location').execute()
    await db.deleteFrom('map').execute()
    await db.deleteFrom('story').execute()
  })
  if (deleteResult instanceof Error) {
    return new Error('Could not wipe existing database', {
      cause: deleteResult,
    })
  }

  const markdocFileList = await getMarkdocFileList(contentDirPath)
  if (markdocFileList instanceof Error) {
    return new Error('Could not read markdoc file list', {
      cause: markdocFileList,
    })
  }

  // Break down files into types
  // and insert frontmatter

  const markdocFileListByType = groupBy(
    markdocFileList,
    (file) => file.frontmatter.type ?? 'undefined',
  )

  const upsertStoryResult = await errorListBoundary(async () =>
    pMap(markdocFileListByType.story, async (file) => upsertStory(db, file), {
      concurrency: 1,
    }),
  )
  if (upsertStoryResult instanceof Error) {
    return upsertStoryResult
  }

  const upsertMapResult = await errorListBoundary(async () =>
    pMap(markdocFileListByType.map, async (file) => upsertMap(db, file), {
      concurrency: 1,
    }),
  )
  if (upsertMapResult instanceof Error) {
    return upsertMapResult
  }

  const upsertLocationResult = await errorListBoundary(async () =>
    pMap(
      markdocFileListByType.location,
      async (file) => upsertLocation(db, file),
      { concurrency: 1 },
    ),
  )
  if (upsertLocationResult instanceof Error) {
    return upsertLocationResult
  }

  const upsertTravelResult = await errorListBoundary(async () =>
    pMap(markdocFileListByType.travel, async (file) => upsertTravel(db, file), {
      concurrency: 1,
    }),
  )
  if (upsertTravelResult instanceof Error) {
    return upsertTravelResult
  }

  const upsertSojournResult = await errorListBoundary(async () =>
    pMap(
      markdocFileListByType.sojourn,
      async (file) => upsertSojourn(db, file),
      { concurrency: 1 },
    ),
  )
  if (upsertSojournResult instanceof Error) {
    return upsertSojournResult
  }

  // Insert all pages (filePath + renderableTreeNode)
  const upsertPageResult = await errorListBoundary(async () =>
    pMap(
      markdocFileList,
      async (file) => upsertPage(db, file, imaginaryConfig),
      {
        concurrency: 1,
      },
    ),
  )
  if (upsertPageResult instanceof Error) {
    return upsertPageResult
  }
}

export { bakeData }
