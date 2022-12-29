import type { Schema } from '@markdoc/markdoc'

const strava: Schema = {
  render: 'Strava',
  children: [],
  attributes: {
    embedUrl: { type: String, required: true },
  },
}
export { strava }
