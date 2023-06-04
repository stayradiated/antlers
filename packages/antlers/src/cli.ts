import meow from 'meow'
import z from 'zod'
import { bakeData } from './index.js'

const cli = meow(
  `
	Usage
	  $ antlers <src> <db>

	Options
	  --img-host    Imaginary host URL
	  --img-key     Imaginary secret key

	Examples
	  $ antlers ./src ./dist/content.db --img-host $IMG_HOST --img-key $IMG_KEY
`,
  {
    importMeta: import.meta,
    flags: {
      imgHost: {
        type: 'string',
        isRequired: true,
      },
      imgKey: {
        type: 'string',
        isRequired: true,
      },
    },
  },
)

const $Config = z.object({
  contentDirPath: z.string().nonempty(),
  dbPath: z.string().nonempty(),
  imaginaryConfig: z.object({
    host: z.string().nonempty(),
    signatureKey: z.string().nonempty(),
  }),
})

const result = $Config.safeParse({
  contentDirPath: cli.input.at(0),
  dbPath: cli.input.at(1),
  imaginaryConfig: {
    host: cli.flags.imgHost,
    signatureKey: cli.flags.imgKey,
  },
})

if (!result.success) {
  throw new Error(JSON.stringify(result.error.format(), null, 2))
}

const bakeDataResult = await bakeData(result.data)
if (bakeDataResult instanceof Error) {
  throw bakeDataResult
}
