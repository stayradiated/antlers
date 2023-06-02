import type { Schema } from '@markdoc/markdoc'

const travel: Schema = {
  render: 'Travel',
  children: ['paragraph', 'tag'],
  attributes: {
    date: {
      type: String,
      required: true,
      matches: /^\d{4}-\d{2}-\d{2}$/,
    },
    type: {
      type: String,
      required: true,
      matches: ['plane', 'train', 'bus', 'bicycle', 'car'],
    },
    distance: { type: String },
  },
}
export { travel }
